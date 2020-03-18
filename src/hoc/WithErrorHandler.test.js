import React from "react";
import { shallow } from "enzyme";
import WithErrorHandler from "./WithErrorHandler";
import Modal from "../views/Modal/Modal";

describe("WithErrorHandler", () => {
    let wrapper;

    let props = {
        children: 'empty'
    };

    beforeEach(() => {
        const httpMock = jest.mock("../hooks/useHttpErrorHandler");
        httpMock.useHttpErrorHandler = jest.fn();
        httpMock.useHttpErrorHandler.mockImplementationOnce(() => ['error', '', '']);
        wrapper = shallow(<WithErrorHandler {...props} />);
    });

    it("Should render Modal", () => {
        expect(wrapper.find(Modal)).toHaveLength(1);
    })
});
