// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST'
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS'
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE'

export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST'

// ------------------------------------
// Actions
// ------------------------------------

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

export function fetchBookRequest(request) {
  return {
    type: FETCH_BOOK_REQUEST,
    payload: request
  }
}

export function fetchBookSuccess(book) {
  return {
    type: FETCH_BOOK_SUCCESS,
    payload: book
  }
}

export function fetchBookFailure(error) {
  return {
    type: FETCH_BOOK_FAILURE,
    payload: error
  }
}


export function updateBookRequest(request) {
  return {
    type: UPDATE_BOOK_REQUEST,
    payload: request
  }
}

export const actions = {
  fetchBookRequest,
  fetchBookSuccess,
  fetchBookFailure,

  updateBookRequest
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_BOOK_REQUEST] : (state, action) => {
    return {
        ...state, loading: true
    }
  },
  [FETCH_BOOK_SUCCESS] : (state, action) => {
    return {
        data: action.payload, error: null, loading: false
    }
  },
  [FETCH_BOOK_FAILURE] : (state, action) => {
    return {
        ...state, error: action.payload, loading: false
    }
  },
  // #todo: this overlaps with fetchbook, refactor?
  [UPDATE_BOOK_REQUEST] : (state, action) => {
    return {
        ...state, loading: true
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =  {
  data: {},
  error: null,
  loading: false
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}