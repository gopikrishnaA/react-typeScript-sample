import React from "react";
import { shallow } from "enzyme";

import { SearchProvider, useSearchContext } from "./SearchContext"

describe("SearchContext", () => {
    let wrapper;
    let useContextMock;

    const props = {
        children: "Pizza Recipe"
    };


    beforeEach(() => {
        jest
            .spyOn(React, 'useState')
            .mockImplementation((query) => [query, jest.fn()]);
        const createContextMock = jest
            .spyOn(React, 'createContext')
            .mockImplementation(f => ({
                query: "",
                updateQuery: jest.fn()
            }));
        useContextMock = jest
            .spyOn(React, 'useContext')
            .mockImplementationOnce(f => createContextMock);

        wrapper = shallow(<SearchProvider {...props} />);

    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call useContext method", () => {
        useSearchContext();
        expect(useContextMock).toBeCalled()
    });
    it("should render passed props", () => {
        expect(wrapper.props().children).toEqual(props.children);
    })
})