// ------------------------------------
// Constants
// ------------------------------------
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function registerRequest (request) {
  return {
    type: REGISTER_REQUEST,
    payload: request
  }
}
export function registerSuccess (response) {
  return {
    type: REGISTER_SUCCESS,
    payload: response
  }
}
export function registerFailure (error) {
  return {
    type: REGISTER_FAILURE,
    payload: error
  }
}

export const actions = {
  registerRequest,
  registerSuccess,
  registerFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGISTER_REQUEST] : (state, action) => {
    return {...state, loading: true}
  },
  [REGISTER_SUCCESS] : (state, action) => {
    return { ...state, error: '', loading: false, isRegistered: true}
  },
  [REGISTER_FAILURE] : (state, action) => {
    return { ...state, error: action.payload, loading: false }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  error: '',
  isRegistered: false
}

export default function register (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
