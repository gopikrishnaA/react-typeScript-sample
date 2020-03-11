import reducer from './reducer';

describe('likes reducer', () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('addItem reducer expected state', () => {
    const item = [{
      id: 123,
      title: 'test'
    }]
    const action = {
      item: item[0],
      type: 'ADD_LIKE_ITEM',
    };

    const updatedState = reducer(item, action);
    expect(updatedState).toHaveLength(1);
    expect(updatedState).toEqual(item);
  });
  it('addItem reducer expected state', () => {
    const item = [{
      id: 123,
      title: 'test'
    }]
    const action = {
      item,
      type: 'ADD_LIKE_ITEM',
    };

    const updatedState = reducer(undefined, action);
    expect(updatedState).toHaveLength(1);
    expect(updatedState).toEqual([item]);
  });
  it('removeItem reducer expected state', () => {
    const item = [{
      id: 123,
      title: 'test'
    }]
    const action = {
      id: 111,
      type: 'REMOVE_LIKE_ITEM',
    };

    const updatedState = reducer(item, action);
    expect(updatedState).toHaveLength(1);
    expect(updatedState).toEqual(item);
  });
});