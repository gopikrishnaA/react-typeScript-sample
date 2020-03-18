import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import Ingredient from "./Ingredient";

describe("Ingredient", () => {
  let wrapper;

  let props = {
    ingredient: {
      name: 'test',
      measures: {
        us: {
          amount: 1000,
          unitShort: '$'
        }
      }
    },
    clicked: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<Ingredient {...props} />);
  });

  describe("on start", () => {
    it("renders correctly", () => {
      const tree = renderer
        .create(wrapper.find(".d-flex"))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
    it("should click on  particular ingredient", () => {
      wrapper.find(".d-flex").simulate('click');
      expect(wrapper.find(".d-flex").props().children).toContain(1000);
    })
  });
});
