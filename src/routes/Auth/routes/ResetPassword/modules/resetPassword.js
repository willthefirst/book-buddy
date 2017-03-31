// ------------------------------------
// Constants
// ------------------------------------
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function resetPasswordRequest (request) {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: request
  }
}
export function resetPasswordSuccess (response) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: response
  }
}
export function resetPasswordFailure (error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error
  }
}

export const actions = {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RESET_PASSWORD_REQUEST] : (state, action) => {
    return {...state, loading: true}
  },
  [RESET_PASSWORD_SUCCESS] : (state, action) => {
    return { ...state, error: '', loading: false, isReset: true}
  },
  [RESET_PASSWORD_FAILURE] : (state, action) => {
    return { ...state, error: action.payload, loading: false }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  error: '',
  isReset: false
}

export default function resetPassword (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
