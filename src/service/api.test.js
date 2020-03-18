import * as fakeData from "./data";
import { getSearchResults, getRecipe } from './api'

const apiMock = jest.mock('../axios-recipies');

jest.useFakeTimers();

describe("getSearchResults", () => {
  beforeEach(() => {
    jest.runAllTimers();
    apiMock.get = jest.fn();
    apiMock.get.mockImplementationOnce(() => Promise.resolve({}));
  });
  afterEach(() => {
    window.localStorage.removeItem("use_fake_data"); // finally
  })
  it("should get serach results with fakeData", () => {
    expect(getSearchResults('soup', 0, true)).resolves.toEqual({ data: fakeData.results[0] });
  });
  it("should get serach results", () => {
    expect(getSearchResults('soup')).resolves.toEqual({});
  });
});

describe("api", () => {
  beforeEach(() => {
    apiMock.get = jest.fn();
    apiMock.get.mockImplementationOnce(() => Promise.resolve({}));
  });
  afterEach(() => {
    window.localStorage.removeItem("use_fake_data"); // finally
    jest.runAllTimers();
  })
  it("should get recipe results with fakeData", () => {
    expect(getRecipe(559251, true)).resolves.toEqual({ data: fakeData.recipies[559251] });
  });
  it("should rejects with error", () => {
    expect(getRecipe(0, true)).rejects.toEqual(new Error(
      "There is no data for this recipe in fake DB. Try later when API works or choose recipe from first page at left."
    ));
  });
  it("should get recipe results", () => {
    getRecipe(0).then(resolved => {
      expect(resolved).toEqual(fakeData.recipies[0])
    })
  });
});