import { getRecipe, getRecipeSuccess, getRecipeFail } from "./actions";

describe("Reciepe related actions", () => {
  it("should create an action to getRecipeSuccess", () => {
    const data = {
        id: 1234,
        title: 'sampleTest',
    }
    const expectedAction = {
      type: "GET_RECIPE_SUCCESS",
      data
    };
    expect(getRecipeSuccess(data)).toEqual(expectedAction);
  });

  it("should create an action getReciepe ", () => {
    const id = 1234
    const expectedAction = {
      type: "GET_RECIPE",
      id
    };
    expect(getRecipe(id)).toEqual(expectedAction);
  });

  it("should create an action getReciepeFail ", () => {
    const error = { message: 'error'}
    const expectedAction = {
      type: "GET_RECIPE_FAIL",
      error
    };
    expect(getRecipeFail(error)).toEqual(expectedAction);
  });
});