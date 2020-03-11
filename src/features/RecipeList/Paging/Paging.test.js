import React from "react";

import { shallow } from "enzyme";

import Paging from "./Paging";


describe("<Paging />", () => {
  let wrapper;
  const pageHandlerMock = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<Paging pageChangedHandler={() => {}} />);
  });

  it("should render  Previous Page <i /> with class no-active if offset === 0 ", () => {
    wrapper.setProps({ offset: 0, totalResults: 33, cntOnPage: 7, pageChangedHandler: jest.fn() });
    const expected = /title="Previous page".+page--noactive.+[^>]+>/;
    expect(wrapper.html()).toEqual(expect.stringMatching(expected));
  });

  it("should render  Next Page <i /> with class no-active if (offset <= totalResults - cntOnPage) ", () => {
    wrapper.setProps({ offset: 28, totalResults: 33, cntOnPage: 7 });
    const expected = /title="Next page".+page--noactive.+[^>]+>/;
    expect(wrapper.html()).toEqual(expect.stringMatching(expected));
  });
  it("should click on Previous Page", () => {
    wrapper.setProps({ offset: 28, totalResults: 33, cntOnPage: 7, pageChangedHandler: pageHandlerMock});
    wrapper.find('.fa-arrow-left').simulate('click')
    expect(pageHandlerMock).toHaveBeenCalled()
  });
  it("should click on Next Page", () => {
    wrapper.setProps({ offset: 0, totalResults: 33, cntOnPage: 7, pageChangedHandler: pageHandlerMock});
    wrapper.find('.fa-arrow-right').simulate('click')
    expect(pageHandlerMock).toHaveBeenCalled()
  });
});
