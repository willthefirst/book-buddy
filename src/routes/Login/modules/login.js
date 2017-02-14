// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const loginRequest = (request) => {
  return {
    type: LOGIN_REQUEST,
    payload: request
  }
}

export const loginSuccess = (response) => {
  return {
    type: LOGIN_SUCCESS,
    payload: response
  }
}

export const loginFailure = (response) => {
  return {
    type: LOGIN_FAILURE,
    payload: response
  }
}

export const actions = {
  loginRequest,
  loginSuccess,
  loginFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_REQUEST] : (state, action) => {
    console.log('login request action handler');
    return {
      state
    }
  },
  [LOGIN_SUCCESS] : (state, action) => {
    console.log('login success action handler');
    return {
      state
    }
  },
  [LOGIN_FAILURE] : (state, action) => {
    console.log('login failure action handler');
    return {
      state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
