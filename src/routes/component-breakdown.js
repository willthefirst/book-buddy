Components breakdown:
* Header
* BookProgress
  * Success: shows book title, author, and thumbnail
  * Loading: shows “loading…” for title and author, placeholder image for thumbnail
  * Error: Shows error if failed to load
  * State
    initialState: {
      bookProgress: {
        book: {}
        error: null,
        loading: false
      }
    }
  * Actions
    * Ask server for book data
      export function fetchBook(id) {
        const request = axios.get(`${ROOT_URL}/id`);
        return {
          type: FETCH_BOOK,
          payload: request
        };
      }
    * Success
      export function fetchBookSuccess(book) {
        return {
          type: FETCH_BOOK_SUCCESS,
          payload: book
        };
      }
    * Error
      export function fetchBookError(book) {
        return {
          type: FETCH_BOOK_ERROR,
          payload: error
        };
      }
    *

* BookNotes
* BookInfo
* BookList
* BookListMain
