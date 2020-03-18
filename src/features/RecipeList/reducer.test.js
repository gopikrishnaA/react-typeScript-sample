import reducer from './reducer';

describe('RecipeList reducer', () => {
  const initialState = {
    isLoading: false,
    data: { totalResults: 0 },
    error: null
  }
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('search reducer expected state', () => {
    const action = {
      isLoading: true,
      error: null,
      type: 'SEARCH',
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toEqual({ isLoading: true,
      data: { totalResults: 0 },
      error: null});
  });

  it('serachSuccess reducer expected state', () => {
  
    const action = {
      isLoading: false,
      error: null,
      data:  { totalResults: 1},
      type: 'SEARCH_SUCCESS',
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toEqual({ isLoading: false,
      data:  { totalResults: 1},
      error: null});
  });

  it('searchFail reducer expected state', () => {
  
    const action = {
      isLoading: false,
      error: {message: 'error'},
      type: 'SEARCH_FAIL',
    };

    const updatedState = reducer(initialState, action);
    expect(updatedState).toEqual({ isLoading: false,
      data:  { totalResults: 0 },
      error: {message: 'error'}});
  });

});