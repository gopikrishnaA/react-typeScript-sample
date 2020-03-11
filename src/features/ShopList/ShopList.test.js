import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import * as ReactReduxHooks from "../../hooks/react-redux";

import ShopList from "./ShopList";
import Item from "./Item/Item";

jest.mock('react-to-print');

describe("ShopList", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = configureStore()({
      items: [
        { id: 1, name: "Bread", amount: 1, unit: "kg" },
        { id: 2, name: "Milk", amount: 2, unit: "oz" }
      ]
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<ShopList store={store} />);
  });

  describe("on start", () => {
    it(" dispatch action getRecipe ", () => {
      // const actions = store.getActions();
      // expect(actions).toEqual([{ type: "GET_RECIPE", id: 11234 }]);
    });
  });

  it("should dispatch action removeItem ", () => {});

  it("should dispatch action updateItem ", () => {});

  it("should render Item list", () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });

  it("should not render Item list on empty lost", () => {
    store = configureStore()({ items: [] });
    wrapper = shallow(<ShopList store={store} />);
    expect(wrapper.find(Item)).toHaveLength(0);
  });
});
