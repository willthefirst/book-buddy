// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST'
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS'
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE'

export const UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST'
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS'
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE'

export const CREATE_BOOK_REQUEST = 'CREATE_BOOK_REQUEST'
export const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS'
export const CREATE_BOOK_FAILURE = 'CREATE_BOOK_FAILURE'

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

export function updateBookSuccess(book) {
  return {
    type: UPDATE_BOOK_SUCCESS,
    payload: book
  }
}

export function updateBookFailure(error) {
  return {
    type: UPDATE_BOOK_FAILURE,
    payload: error
  }
}

export function createBookRequest(request) {
  return {
    type: CREATE_BOOK_REQUEST,
    payload: request
  }
}

export function createBookSuccess(book) {
  return {
    type: CREATE_BOOK_SUCCESS,
    payload: book
  }
}

export function createBookFailure(error) {
  return {
    type: CREATE_BOOK_FAILURE,
    payload: error
  }
}

export const actions = {
  fetchBookRequest,
  fetchBookSuccess,
  fetchBookFailure,

  updateBookRequest,
  updateBookSuccess,
  updateBookFailure,

  createBookRequest,
  createBookSuccess,
  createBookFailure
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

  [UPDATE_BOOK_REQUEST] : (state, action) => {
    return {
        ...state, loading: true
    }
  },
  [UPDATE_BOOK_SUCCESS] : (state, action) => {
    // merge granular update into full activeBook store
    return {
        data: Object.assign(state.data, action.payload),
        error: null,
        loading: false
    }
  },
  [UPDATE_BOOK_FAILURE] : (state, action) => {
    return {
        ...state, error: action.payload, loading: false
    }
  },

  [CREATE_BOOK_REQUEST] : (state, action) => {
    return {
        ...state, loading: true
    }
  },
  [CREATE_BOOK_SUCCESS] : (state, action) => {
    return {
        data: action.payload, error: null, loading: false
    }
  },
  [CREATE_BOOK_FAILURE] : (state, action) => {
    return {
        ...state, error: action.payload, loading: false
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

export default function bookReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
