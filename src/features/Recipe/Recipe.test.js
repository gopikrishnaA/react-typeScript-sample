import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Spinner } from "reactstrap";
import * as ReactReduxHooks from "../../hooks/react-redux";

import { Recipe } from "./Recipe";
import Ingredients from "./Ingredients/Ingredients";
import { recipies } from "../../service/data";

describe("Recipe", () => {
  let wrapper;
  let useEffect;
  let store;
  const recipeId = 601651;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  let props = { match: { params: { recipe_id: recipeId } } };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();
    mockUseEffect();


    store = configureStore()({
      data: recipies[recipeId],
      isLoading: false,
      error: null
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<Recipe store={store} {...props} />);
  });

  describe("on start", () => {
    it(" dispatch action getRecipe ", () => {
      const actions = store.getActions();
      expect(actions).toEqual([{ type: "GET_RECIPE", id: recipeId }]);
    });
  });

  it("should render Ingredients component if recipe is loaded", () => {
    expect(wrapper.find(Ingredients)).toHaveLength(1);
  });

  it("should render when on loading", () => {
    props = { match: { params: { recipe_id: undefined } } };
    store = configureStore()({
      data: recipies[559251],
      isLoading: true,
      error: null
    });
    
    wrapper = shallow(<Recipe store={store} {...props} />);
    expect(wrapper.find(Spinner).props().children).toEqual("Loading...")
  });
 
  it("should render when error triggers", () => {
    store = configureStore()({
      data: null,
      isLoading: false,
      error: { message: "error" }
    });
    
    wrapper = shallow(<Recipe store={store} {...props} />);
    expect(wrapper.find(".recipe").props().children).toEqual("error")
  });
 
  it("should not render when data not exist", () => {
    store = configureStore()({
      data: null,
      isLoading: false,
      error: null
    });
    
    wrapper = shallow(<Recipe store={store} {...props} />);
    expect(wrapper.instance()).toBeNull();
  });
});
