import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import { RecipeItem } from './RecipeItem';


describe("RecipeItem", () => {
    let wrapper;
    const recipe = {
        id: 123,
        title: 'test',
        readyInMinutes: '123'
    }
    beforeEach(() => {
        wrapper = shallow(<RecipeItem recipe={recipe} />);
    })

    it("renders correctly", () => {
        const tree = renderer
        .create(wrapper.find('.recipe-item'))
        .toJSON();
      expect(tree).toMatchSnapshot();
    })
})