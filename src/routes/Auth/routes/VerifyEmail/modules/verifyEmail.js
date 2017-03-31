// ------------------------------------
// Constants
// ------------------------------------
export const VERIFY_REQUEST = 'VERIFY_REQUEST'
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS'
export const VERIFY_FAILURE = 'VERIFY_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function verifyRequest (request) {
  return {
    type: VERIFY_REQUEST,
    payload: request
  }
}
export function verifySuccess (response) {
  return {
    type: VERIFY_SUCCESS,
    payload: response
  }
}
export function verifyFailure (error) {
  return {
    type: VERIFY_FAILURE,
    payload: error
  }
}

export const actions = {
  verifyRequest,
  verifySuccess,
  verifyFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [VERIFY_REQUEST] : (state, action) => {
    return { ...state, loading: true }
  },
  [VERIFY_SUCCESS] : (state, action) => {
    return { ...state, error: '', loading: false, isVerified: true }
  },
  [VERIFY_FAILURE] : (state, action) => {
    return { ...state, error: action.payload, loading: false }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  error: '',
  isVerified: false
}

export default function verifyEmail (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
