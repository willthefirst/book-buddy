import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_BOOKLIST_REQUEST = 'FETCH_BOOKLIST'
export const FETCH_BOOKLIST_SUCCESS = 'FETCH_BOOKLIST_SUCCESS'
export const FETCH_BOOKLIST_FAILURE = 'FETCH_BOOKLIST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchBookList() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(fetchBookListRequest)

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
    return axios({
      method: 'get',
      url: `${ROOT_URL}/books`,
      headers: []
    }).then((result) => {
      if (result.status !== 200) {
        dispatch(fetchBookListFailure(result.response.data));
      } else {
        dispatch(fetchBookListSuccess(result.data))
      }
    });
  }
}


export function fetchBookListRequest() {
  return {
    type: FETCH_BOOKLIST_REQUEST
  }
}

export function fetchBookListSuccess(books) {
  return {
    type: FETCH_BOOKLIST_SUCCESS,
    payload: books
  }
}

export function fetchBookListFailure(error) {
  return {
    type: FETCH_BOOKLIST_FAILURE,
    payload: error
  }
}

export const actions = {
  fetchBookList,
  fetchBookListRequest,
  fetchBookListSuccess,
  fetchBookListFailure
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_BOOKLIST_REQUEST] : (state, action) => {
    console.log('requesting...');
    return {
      ...state, booksList: { ...state.booksList, loading: true }
    }
  },
  [FETCH_BOOKLIST_SUCCESS] : (state, action) => {
    console.log('success');
    return {
      ...state, booksList: { books: action.payload, error: null, loading: false }
    }
  },
  [FETCH_BOOKLIST_FAILURE] : (state, action) => {
    console.log('failure');
    return {
      ...state, booksList: { ...state.booksList, error: action.payload, loading: false }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =  {
  booksList: {
    books: [],
    error: null,
    loading: false
  }
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
