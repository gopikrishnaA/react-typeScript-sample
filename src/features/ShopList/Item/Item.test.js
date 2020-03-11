import React from "react";
import { shallow } from "enzyme";

import { ShopItem } from "./Item";

describe("ShowItem", () => {
    let wrapper;
    let useEffect;

    const UpdateItemMock = jest.fn();
    const removeItemMock = jest.fn();
    const props = {
        item: {
            amount: 0,
            unit: 1,
            name: "test"
        },
        updateItem: UpdateItemMock,
        removeItem: removeItemMock
    };

    const updateValue = jest.fn();

    const event = {
        currentTarget: {
            value: 10
        }
    }

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
      };

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();

        jest
            .spyOn(React, 'useState')
            .mockImplementation((value) => [value, updateValue])

        wrapper = shallow(<ShopItem {...props} />);

    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render input value when onChange", () => {
        const input = wrapper.find(".shop-item__amount-input");
        input.simulate('change', event);
        expect(wrapper.find(".shop-item__amount-input").props().value).toBe(10)
    });
    it("should render input value when OnBlur", () => {
        const input = wrapper.find(".shop-item__amount-input");
        input.simulate('blur', event);
        expect(wrapper.find(".shop-item__amount-input").props().value).toBe(0)
    });
    it("should remove the item on clicking on delete", () => {
        wrapper.find("i").simulate('click');
        expect(removeItemMock).toHaveBeenCalledWith(props.item)
    });
    it("should update the item on clicking on add", () => {
        const item = {amount: 10,
            unit: 1,
            name: "test"}
        wrapper = shallow(<ShopItem {...props} item={item}/>);
        const input = wrapper.find(".shop-item__amount-input");
        input.simulate('blur');
        expect(UpdateItemMock).toHaveBeenCalledWith(item, 10)
        expect(wrapper.find(".shop-item__amount-input").props().value).toBe(10)
    });
})