import reducer from './reducer';

describe('Recipe reducer', () => {
  const initialState = {
    isLoading: false,
    data: null,
    error: null
  }
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('getRecipe reducer expected state', () => {
  
    const action = {
      isLoading: false,
      error: null,
      type: 'GET_RECIPE',
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toEqual({ isLoading: true,
      data: null,
      error: null});
  });

  it('getRecipeSuccess reducer expected state', () => {
  
    const action = {
      isLoading: false,
      error: null,
      data: 'dummyData',
      type: 'GET_RECIPE_SUCCESS',
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toEqual({ isLoading: false,
      data: 'dummyData',
      error: null});
  });

  it('getRecipeSuccess reducer expected state', () => {
  
    const action = {
      isLoading: false,
      error: {message: 'error'},
      type: 'GET_RECIPE_FAIL',
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toEqual({ isLoading: false,
      data: null,
      error: {message: 'error'}});
  });

});