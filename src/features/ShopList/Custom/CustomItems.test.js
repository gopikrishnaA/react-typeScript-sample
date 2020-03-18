import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import CustomItems from "./CustomItems";

describe("CustomItems", () => {
  let wrapper;

  let props = {
    items: [{
      amount: 1000,
      unit: 1,
      name: 'test'
    }, {
      amount: 10000,
      unit: 10,
      name: 'test10'
    }],
    removeCustomItem: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<CustomItems {...props} />);
  });

  describe("on start", () => {
    it("renders correctly", () => {
      const tree = renderer
        .create(wrapper.find(".custom-list"))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("should click on  particular ingredient", () => {
      wrapper.find(".fa-trash").at(0).simulate('click');
      expect(props.removeCustomItem).toHaveBeenCalledWith(0);
    })
  });
});
