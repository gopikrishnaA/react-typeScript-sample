import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { Button } from "reactstrap";

import * as ReactReduxHooks from "../../hooks/react-redux";

import { LikeButton } from "./LikeButton";


describe("Likes", () => {
  let wrapper;
  let store;

  const props = {
    recipe: {
      id: 123,
      title: 'test'
    }
  }
  beforeEach(() => {
    store = configureStore()(
      [{
        id: 123,
        title: 'test'
      }]
    );

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<LikeButton store={store} {...props} />);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("dispatch removeItem action to store", () => {
    wrapper.find(Button).simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: "REMOVE_LIKE_ITEM", id: 123 }]);
  });

  it("dispatch addLikeItem action to store", () => {
    const item = {
      id: 111,
      title: 'test1'
    }
    wrapper.setProps({
      recipe: item
    });
    wrapper.find(Button).simulate('click');
    const actions = store.getActions();
    const expectedAction = [{
      type: "ADD_LIKE_ITEM",
      item
    }];
    expect(actions).toEqual(expectedAction);
  });
})