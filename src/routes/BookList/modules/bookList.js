// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_BOOKLIST_REQUEST = 'FETCH_BOOKLIST_REQUEST'
export const FETCH_BOOKLIST_SUCCESS = 'FETCH_BOOKLIST_SUCCESS'
export const FETCH_BOOKLIST_FAILURE = 'FETCH_BOOKLIST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function fetchBookListRequest(request) {
  return {
    type: FETCH_BOOKLIST_REQUEST,
    payload: request
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
  fetchBookListRequest,
  fetchBookListSuccess,
  fetchBookListFailure
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_BOOKLIST_REQUEST] : (state, action) => {
    return {
        ...state, loading: true
    }
  },
  [FETCH_BOOKLIST_SUCCESS] : (state, action) => {
    return {
        books: action.payload, error: null, loading: false
    }
  },
  [FETCH_BOOKLIST_FAILURE] : (state, action) => {
    return {
        ...state, error: action.payload, loading: false
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =  {
  books: [],
  error: null,
  loading: false
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
