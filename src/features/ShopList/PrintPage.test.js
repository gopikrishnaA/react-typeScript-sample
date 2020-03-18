import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import { PrintPage } from './PrintPage';


describe("RecipeItem", () => {
    let wrapper;
    const items = [{
        id: 123,
        name: 'test',
        unit: '1',
        amount: 1000
    }]
    beforeEach(() => {
        wrapper = shallow(<PrintPage items={items} customItems={[]} />);
    })

    it("renders correctly", () => {
        const tree = renderer
        .create(wrapper.find('[data-test="table"]'))
        .toJSON();
      expect(tree).toMatchSnapshot();
    })
})