import moment from 'moment'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_DAILIES_REQUEST = 'FETCH_DAILIES_REQUEST'
export const FETCH_DAILIES_SUCCESS = 'FETCH_DAILIES_SUCCESS'
export const FETCH_DAILIES_FAILURE = 'FETCH_DAILIES_FAILURE'

export const UPDATE_DAILY_REQUEST = 'UPDATE_DAILY_REQUEST'
export const UPDATE_DAILY_SUCCESS = 'UPDATE_DAILY_SUCCESS'
export const UPDATE_DAILY_FAILURE = 'UPDATE_DAILY_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
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

export const actions = {
  fetchDailiesRequest,
  fetchDailiesSuccess,
  fetchDailiesFailure,

  updateDailyRequest,
  updateDailySuccess,
  updateDailyFailure

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_DAILIES_REQUEST] : (state, action) => {
    return {
      ...state, loading: true
    }
  },
  [FETCH_DAILIES_SUCCESS] : (state, action) => {
    return {
      dailiesRange: action.payload.dailiesRange,
      dailiesMatch: action.payload.dailiesMatch,
      currentBooks: action.payload.currentBooks,
      error: null,
      loading: false
    }
  },
  [FETCH_DAILIES_FAILURE] : (state, action) => {
    return {
      ...state, error: action.payload, loading: false
    }
  },

  [FETCH_DAILIES_REQUEST] : (state, action) => {
    return {
      ...state, loading: true
    }
  },
  [FETCH_DAILIES_SUCCESS] : (state, action) => {
    const dateQuery = moment.utc(new Date(action.dateQuery))

    // From payload, define already existing entries or defaults to enter
    let dailiesRange = action.payload
    let dailiesMatch = dailiesRange.filter((daily) => {
      const date = moment.utc(new Date(daily.date))

      // If user has a daily that matches date query,
      return date.isSame(dateQuery, 'day')
    })

    return {
      dailiesRange: dailiesRange,
      dailiesMatch: dailiesMatch,
      currentBooks: [],
      error: null,
      loading: false
    }
  },
  [FETCH_DAILIES_FAILURE] : (state, action) => {
    return {
      ...state, error: action.payload, loading: false
    }
  }
}


// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  dailiesRange: [],
  dailiesMatch: [],
  currentBooks: [],
  error: null,
  loading: false
}

export default function dailyReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
