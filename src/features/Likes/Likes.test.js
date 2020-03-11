import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { DropdownToggle } from "reactstrap";

import * as ReactReduxHooks from "../../hooks/react-redux";

import { Likes } from "./Likes";


describe("Likes", () => {
  let wrapper;
  let store;
  const setDropdownOpenMock = jest.fn();

  beforeEach(() => {
    store = configureStore()(
      [{
        id: 123,
        title: 'test'
      }]
    );

    jest
    .spyOn(React, 'useState')
    .mockImplementation((dropdownOpen) => [dropdownOpen, setDropdownOpenMock])
    
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    wrapper = shallow(<Likes store={store} />);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should toggle the dropdownToggle", () => {
    wrapper.find(DropdownToggle).simulate('click');
    expect(setDropdownOpenMock).toHaveBeenCalledWith(true);
  });
  it("dispatch removeItem action to store", () => {
    const firstElem = wrapper.find('[data-item="id123"]')
    firstElem.find(".fa-trash").simulate('click');
    const actions = store.getActions();
    expect(actions).toEqual([{ type: "REMOVE_LIKE_ITEM", id: 123 }]);
  });
  it("should render no items display when no likes", () => {
    store = configureStore()([]);
    wrapper = shallow(<Likes store={store} />);
    expect(wrapper.find('span').props().children).toEqual('You haven\'t favourite recipies yet')
  });
})