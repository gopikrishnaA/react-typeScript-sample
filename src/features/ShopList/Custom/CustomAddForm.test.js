import React from "react";
import { shallow } from "enzyme";
import renderer from 'react-test-renderer';
import { Form, Input } from "reactstrap";
import CustomAddForm from "./CustomAddForm";

describe("CustomAddForm", () => {
    let wrapper;
    let useEffect;

    let props = {
        isShown: false,
        onAdd: jest.fn(),
        onClose: jest.fn(),
    };

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();

        wrapper = shallow(<CustomAddForm {...props} />);
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(wrapper.find(Form))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should setName of the input", () => {
        const event =  { target: { value: 'Hello' } };
        const nameInput = wrapper.find(Input).at(0);
        nameInput.simulate('change', event);
        expect(nameInput.props().value).toBe('');
    });

    it("should setAmount of the input", () => {
        const event =  { target: { value: '1000' } };
        const nameInput = wrapper.find(Input).at(1);
        nameInput.simulate('change', event);
        expect(nameInput.props().value).toBe(0);
    });

    it("should setUnit of the input", () => {
        const event =  { target: { value: '1' } };
        const nameInput = wrapper.find(Input).at(2);
        nameInput.simulate('change', event);
        expect(nameInput.props().value).toBe('');
    });
    it("should click on submit of the form", () => {
        const event =  { 
            preventDefault: jest.fn(), 
            target: { value: '1' } };
        wrapper.find(Form).props().onSubmit(event);
        expect(props.onAdd).toHaveBeenCalledTimes(1);
    });
});
