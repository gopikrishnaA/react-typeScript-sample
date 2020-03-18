import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import ReactToPrint from "react-to-print";
import * as ReactReduxHooks from "../../hooks/react-redux";
import CustomAddForm from "./Custom/CustomAddForm";
import CustomItems from "./Custom/CustomItems";

import ShopList from "./ShopList";
import Item from "./Item/Item";
import { Modal } from "../../views";
import PrintPage from "./PrintPage";



describe("ShopList", () => {
  let wrapper;
  let store;
  const items = [
    { id: 1, name: "Bread", amount: 1, unit: "kg" },
    { id: 2, name: "Milk", amount: 2, unit: "oz" }
  ]
  beforeEach(() => {
    store = configureStore()({
      items: items
    });

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<ShopList store={store} />);
  });

  it("should dispatch action updateItem ", () => {
    const actions = store.getActions();
    wrapper.find(Item).at(0).props().updateItem(items[0], 1000);
    expect(actions).toEqual([{
      type: "UPDATE_SHOP_ITEM",
      item: items[0],
      amount: 1000
    }])
  });

  it("should dispatch action removeItem ", () => {
    const actions = store.getActions();
    wrapper.find(Item).at(0).props().removeItem(items[0])
    expect(actions).toEqual([{
      type: "REMOVE_SHOP_ITEM",
      item: items[0]
    }])
  });

  it("should add custom Items ", () => {
    wrapper.find('[data-test="modalBtn"]').simulate('click')
    wrapper.find(CustomAddForm).props().onAdd(items[0]);
    expect(wrapper.find(CustomItems)).toHaveLength(1);
    expect(wrapper.find(CustomItems).props().items).toEqual([items[0]]);
  });

  it("should remove custom Items ", () => {
    wrapper.find('[data-test="modalBtn"]').simulate('click')
    wrapper.find(CustomAddForm).props().onAdd(items[0]);
    expect(wrapper.find(CustomItems).props().items).toEqual([items[0]]);
    wrapper.find(CustomItems).props().removeCustomItem(0);
    expect(wrapper.find(CustomItems).props().items).toEqual([]);
  });

  it("should render Item list", () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });

  it("should not render Item list on empty lost", () => {
    store = configureStore()({ items: [] });
    wrapper = shallow(<ShopList store={store} />);
    expect(wrapper.find(Item)).toHaveLength(0);
  });
  
  
  it("should close the modal on modal cancel", () => {
    wrapper.find('[data-test="modalBtn"]').simulate('click')
    expect(wrapper.find(Modal).props().show).toBe(true);
    wrapper.find(Modal).props().modalClosed();
    expect(wrapper.find(Modal).props().show).toBe(false);
  });

  it("should close the modal on customAddForm", () => {
    wrapper.find('[data-test="modalBtn"]').simulate('click')
    expect(wrapper.find(Modal).props().show).toBe(true);
    wrapper.find(CustomAddForm).props().onClose();
    expect(wrapper.find(Modal).props().show).toBe(false);
  });

  it("should trigger the print btn", () => {
    wrapper.find(ReactToPrint).props().trigger();
    wrapper.find(ReactToPrint).props().content();
    expect(wrapper.find(PrintPage).props().items).toHaveLength(2);
  });

});
