import { addLikeItem, removeLikeItem } from "./actions";

describe("Likes related actions", () => {
  it("should create an action to add like to receipe", () => {
    const item = {
        id: 1234,
        title: 'sampleTest',
    }
    const expectedAction = {
      type: "ADD_LIKE_ITEM",
      item
    };
    expect(addLikeItem(item)).toEqual(expectedAction);
  });

  it("should create an action remove like for receipe ", () => {
    const id = 1234
    const expectedAction = {
      type: "REMOVE_LIKE_ITEM",
      id
    };
    expect(removeLikeItem(id)).toEqual(expectedAction);
  });
});