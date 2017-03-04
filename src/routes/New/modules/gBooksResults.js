// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_GBOOKS_REQUEST = 'FETCH_GBOOKS_REQUEST'
export const FETCH_GBOOKS_SUCCESS = 'FETCH_GBOOKS_SUCCESS'
export const FETCH_GBOOKS_FAILURE = 'FETCH_GBOOKS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function fetchGBooksRequest (request) {
  return {
    type: FETCH_GBOOKS_REQUEST,
    payload: request
  }
}

export function fetchGBooksSuccess (books) {
  return {
    type: FETCH_GBOOKS_SUCCESS,
    payload: books
  }
}

export function fetchGBooksFailure (error) {
  return {
    type: FETCH_GBOOKS_FAILURE,
    payload: error
  }
}

export const actions = {
  fetchGBooksRequest,
  fetchGBooksSuccess,
  fetchGBooksFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_GBOOKS_REQUEST] : (state, action) => {
    return {
      ...state, loading: true
    }
  },
  [FETCH_GBOOKS_SUCCESS] : (state, action) => {
    return {
      books: action.payload, error: null, loading: false
    }
  },
  [FETCH_GBOOKS_FAILURE] : (state, action) => {
    return {
      ...state, error: action.payload, loading: false
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  books: [],
  error: null,
  loading: false
}

export default function gBooksResults (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
