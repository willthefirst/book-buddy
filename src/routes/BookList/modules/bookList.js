// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_BOOKLIST_REQUEST = 'FETCH_BOOKLIST_REQUEST'
export const FETCH_BOOKLIST_SUCCESS = 'FETCH_BOOKLIST_SUCCESS'
export const FETCH_BOOKLIST_FAILURE = 'FETCH_BOOKLIST_FAILURE'

export const RESET_BOOKLIST = 'FETCH_BOOKLIST_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchBookListRequest (request) {
  return {
    type: FETCH_BOOKLIST_REQUEST,
    payload: request
  }
}

export function fetchBookListSuccess (books) {
  return {
    type: FETCH_BOOKLIST_SUCCESS,
    payload: books
  }
}

export function fetchBookListFailure (error) {
  return {
    type: FETCH_BOOKLIST_FAILURE,
    payload: error
  }
}

export function resetBookList () {
  return {
    type: RESET_BOOKLIST,
    payload: ''
  }
}

export const actions = {
  fetchBookListRequest,
  fetchBookListSuccess,
  fetchBookListFailure,

  resetBookList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = {
  books: [],
  error: null,
  loading: false
}

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
  },
  [RESET_BOOKLIST] : (state, action) => {
    return initialState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function bookListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
