// ------------------------------------
// Constants
// ------------------------------------
export const SET_CURRENT_DATE = 'SET_CURRENT_DATE'

export const FETCH_DAILIES_REQUEST = 'FETCH_DAILIES_REQUEST'
export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS'
export const FETCH_DAILIES_FAILURE = 'FETCH_DAILIES_FAILURE'

export const FETCH_CURRENT_REQUEST = 'FETCH_CURRENT_REQUEST'
export const FETCH_CURRENT_SUCCESS = 'FETCH_CURRENT_SUCCESS'
export const FETCH_CURRENT_FAILURE = 'FETCH_CURRENT_FAILURE'

export const UPDATE_DAILY_REQUEST = 'UPDATE_DAILY_REQUEST'
export const UPDATE_DAILY_SUCCESS = 'UPDATE_DAILY_SUCCESS'
export const UPDATE_DAILY_FAILURE = 'UPDATE_DAILY_FAILURE'

export const QUERY_REQUEST = 'QUERY_REQUEST'
export const QUERY_SUCCESS = 'QUERY_SUCCESS'
export const QUERY_FAILURE = 'QUERY_FAILURE'

export const ADD_TO_DAILIES = 'ADD_TO_DAILIES'

// ------------------------------------
// Actions
// ------------------------------------
export function setCurrentDate (date) {
  return {
    type: SET_CURRENT_DATE,
    payload: date
  }
}

export function fetchDailiesRequest (request) {
  return {
    type: FETCH_DAILIES_REQUEST,
    payload: request
  }
}

export function fetchDailiesSuccess (dailies, dateQuery) {
  return {
    type: FETCH_DAILIES_SUCCESS,
    payload: dailies,
    dateQuery: dateQuery
  }
}

export function fetchDailiesFailure (error) {
  return {
    type: FETCH_DAILIES_FAILURE,
    payload: error
  }
}

export function fetchCurrentRequest (request) {
  return {
    type: FETCH_CURRENT_REQUEST,
    payload: request
  }
}

export function fetchCurrentSuccess (dailies, dateQuery) {
  return {
    type: FETCH_CURRENT_SUCCESS,
    payload: dailies,
    dateQuery: dateQuery
  }
}

export function fetchCurrentFailure (error) {
  return {
    type: FETCH_CURRENT_FAILURE,
    payload: error
  }
}

export function updateDailyRequest (request) {
  return {
    type: UPDATE_DAILY_REQUEST,
    payload: request
  }
}

export function updateDailySuccess (dailies) {
  return {
    type: UPDATE_DAILY_SUCCESS,
    payload: dailies
  }
}

export function updateDailyFailure (error) {
  return {
    type: UPDATE_DAILY_FAILURE,
    payload: error
  }
}

export function queryRequest (request) {
  return {
    type: QUERY_REQUEST,
    payload: request
  }
}

export function querySuccess (books) {
  return {
    type: QUERY_SUCCESS,
    payload: books
  }
}

export function queryFailure (error) {
  return {
    type: QUERY_FAILURE,
    payload: error
  }
}

export function addToDailies (book) {
  return {
    type: ADD_TO_DAILIES,
    payload: book
  }
}

export const actions = {
  setCurrentDate,

  fetchDailiesRequest,
  fetchDailiesSuccess,
  fetchDailiesFailure,

  fetchCurrentRequest,
  fetchCurrentSuccess,
  fetchCurrentFailure,

  updateDailyRequest,
  updateDailySuccess,
  updateDailyFailure,

  queryRequest,
  querySuccess,
  queryFailure,

  addToDailies
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CURRENT_DATE] : (state, action) => {
    return {
      ...state, currentDate: action.payload
    }
  },

  [FETCH_DAILIES_REQUEST] : (state, action) => {
    return {
      ...state, loading: true
    }
  },
  [FETCH_DAILIES_FAILURE] : (state, action) => {
    return {
      ...state, error: action.payload, loading: false
    }
  },
  [FETCH_DAILIES_SUCCESS] : (state, action) => {
    return {
      ...state,
      dailiesRange: action.payload,
      error: null,
      loading: false
    }
  },

  [FETCH_CURRENT_REQUEST] : (state, action) => {
    return state
  },
  [FETCH_CURRENT_FAILURE] : (state, action) => {
    return {
      ...state, error: action.payload, loading: false
    }
  },
  [FETCH_CURRENT_SUCCESS] : (state, action) => {
    return {
      ...state,
      currentBooks: action.payload,
      error: null,
      loading: false
    }
  },

  [QUERY_REQUEST] : (state, action) => {
    return {
      ...state, loading: true
    }
  },
  [QUERY_FAILURE] : (state, action) => {
    return {
      ...state, error: action.payload, loading: false
    }
  },
  [QUERY_SUCCESS] : (state, action) => {
    return {
      ...state,
      bookQueryResults: action.payload,
      error: null,
      loading: false
    }
  },
  [ADD_TO_DAILIES] : (state, action) => {
    return {
      ...state,
      dailiesMatch: [...state.dailiesMatch, action.payload]
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  currentDate: '',
  bookQueryResults: [],
  currentBooks: [],
  dailiesRange: [],
  error: null,
  loading: false
}

export default function dailyReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
