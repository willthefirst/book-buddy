import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST'
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS'
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE'

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

export const actions = {
  fetchBookRequest,
  fetchBookSuccess,
  fetchBookFailure
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
        activeBook: action.payload, error: null, loading: false
    }
  },
  [FETCH_BOOK_FAILURE] : (state, action) => {
    return {
        ...state, error: action.payload, loading: false
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =  {
  activeBook: {
    book: null,
    error: null,
    loading: false
  }
}

export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
