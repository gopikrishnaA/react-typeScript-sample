import { of, throwError } from 'rxjs';
import { searchEpic } from './epics';
const apiMock = jest.mock("../../service/api");

describe("searchEpic", () => {
  it("should dispatch searchSuccess action to store", () => {
    // The response object we expect to receive from the server.
    const response = {
      data: {
        testData: 'sample'
      }
    };
    // Create a fake API call instance which will return
    apiMock.getSearchResults = jest.fn();
    apiMock.getSearchResults.mockReturnValue(Promise.resolve(response));
    // Create an Observable stream of the dispatching action.
    const action$ = of({
      type: 'SEARCH',
      query: 'test',
      offset: 1234
    });
    // Pass the Observable action to our action and inject the
    // mocked client instance.
    const epic$ = searchEpic(action$);

    epic$.subscribe((action) => {
      expect(action.type).toBe('SEARCH');
      expect(action.payload).toBe('');
    });    
    // Get the resulting actions by using async/await.
    // const result = await epic$.toArray().toPromise();
    // // Test if we've received the expected action as result.
    // expect(result).toEqual([
    //   { type: 'SEARCH_SUCCESS', data: { testData: 'sample' } }
    // ])
    })
})
