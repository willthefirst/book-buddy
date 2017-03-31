// ------------------------------------
// Constants
// ------------------------------------
export const FORGOT_REQUEST = 'FORGOT_REQUEST'
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS'
export const FORGOT_FAILURE = 'FORGOT_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function forgotRequest (request) {
  return {
    type: FORGOT_REQUEST,
    payload: request
  }
}
export function forgotSuccess (response) {
  return {
    type: FORGOT_SUCCESS,
    payload: response
  }
}
export function forgotFailure (error) {
  return {
    type: FORGOT_FAILURE,
    payload: error
  }
}

export const actions = {
  forgotRequest,
  forgotSuccess,
  forgotFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FORGOT_REQUEST] : (state, action) => {
    return { ...state, loading: true }
  },
  [FORGOT_SUCCESS] : (state, action) => {
    return { ...state, error: '', loading: false, emailSent: true }
  },
  [FORGOT_FAILURE] : (state, action) => {
    return { ...state, error: action.payload, loading: false }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  error: '',
  emailSent: false
}

export default function forgotEmail (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
