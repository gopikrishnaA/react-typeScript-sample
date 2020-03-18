import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import * as ReactReduxHooks from "../../../hooks/react-redux";
import Ingredient from "./Ingredient";


import Ingredients from "./Ingredients";

describe("Ingredients", () => {
  let wrapper;
  let store;

  let props = {
    ingredients: [{
      id: 123,
      name: 'test',
      measures: {
        us: {
          amount: 1000,
          unitShort: '$'
        }
      }
    }]
  };

  beforeEach(() => {
    store = configureStore()({});

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<Ingredients {...props} />);
  });

  describe("on start", () => {
    it("renders correctly", () => {
      const tree = renderer
        .create(wrapper.find(".recipe-ings"))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("dispach addItems to store", () => {
      wrapper.find(Ingredient).props().clicked(props.ingredients[0]);
      const actions = store.getActions();
      const expectedResult = [{ type: "ADD_SHOP_ITEM", item: {
        id: 123,
        amount: 1000,
        unit: '$',
        name: 'test'
      } }]
      expect(actions).toEqual(expectedResult);
    })
  });
});
