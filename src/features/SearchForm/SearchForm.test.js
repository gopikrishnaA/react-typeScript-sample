import React from "react";
import { shallow } from "enzyme";
import { Form } from "reactstrap";
import renderer from 'react-test-renderer';

import * as SearchContext from "../../contexts/SearchContext";
import { SearchForm } from "./SearchForm";

jest.useFakeTimers();

const event = (value) => ({
  preventDefault: jest.fn(),
  currentTarget: {
    value
  }
})

describe("SearchForm", () => {
  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const contextValues = { updateQuery: jest.fn() };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();

    jest
      .spyOn(SearchContext, "useSearchContext")
      .mockImplementation(() => contextValues);

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe("initial load", () => {
    beforeEach(() => {
      // Cache original functionality
      const realUseState = React.useState

      // Stub the initial state
      const stubInitialState = '12'

      // Mock useState before rendering your component
      jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => realUseState(stubInitialState));
      jest
        .spyOn(React, "useRef")
        .mockReturnValue({
          current: {
            value: '12'
          }
        });
      wrapper = shallow(<SearchForm />);
    });
    afterEach(() => {
      jest.runAllTimers();
    })
    it("Should render on initial load", () => {
      const tree = renderer
            .create(wrapper.find(Form))
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
  });

  describe("Form Onsubmit handler", () => {
    beforeEach(() => {
      wrapper = shallow(<SearchForm />);
    });

    it("Should click on Form onSubmit when value < 3", () => {
      wrapper.find('input').props().onChange(event('12'));
      wrapper.find(Form).props().onSubmit(event('12'));
      expect(wrapper.find('input').props().value).toBe('12');
      expect(wrapper.find('small').props().children).toBe('Need be at least 3 characters');
    });

    it("Should click on Form onSubmit when value > 3", () => {
      wrapper.find('input').props().onChange(event('12345'));
      wrapper.find(Form).props().onSubmit(event('12345'));
      expect(wrapper.find('input').props().value).toBe('12345');
    });
  });
});
