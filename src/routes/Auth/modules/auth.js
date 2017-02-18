// ------------------------------------
// Constants
// ------------------------------------
export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'

export const UNAUTH_USER = 'unauth_user',
             FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
             RESET_PASSWORD_REQUEST = 'reset_password_request',
             PROTECTED_TEST = 'protected_test';

// ------------------------------------
// Actions
// ------------------------------------

export const authRequest = (request) => {
  return {
    type: AUTH_REQUEST,
    payload: request
  }
}

export const authSuccess = (response) => {
  return {
    type: AUTH_SUCCESS,
    payload: response
  }
}

export const authFailure = (response) => {
  return {
    type: AUTH_FAILURE,
    payload: response
  }
}

export const actions = {
  authRequest,
  authSuccess,
  authFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [AUTH_REQUEST] : (state, action) => {
    console.log('auth request action handler');
    return { ...state, authenticated: false, loading: true  }
  },
  [AUTH_SUCCESS] : (state, action) => {
    console.log('auth success action handler');
    return { ...state, error: '', message: '', content: action.payload, authenticated: true, loading: false }
  },
  [AUTH_FAILURE] : (state, action) => {
    console.log('auth failure action handler');
    return { ...state, error: action.payload, loading: false }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { error: '', message: '', content: '', authenticated: false, loading: false}

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
