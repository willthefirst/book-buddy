// ------------------------------------
// Constants
// ------------------------------------
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL'

// ------------------------------------
// Actions
// ------------------------------------
export function setRedirectUrl(url) {
  alert('bang', url)
  return {
    type    : SET_REDIRECT_URL,
    payload : url
  }
}

export const actions = {
  setRedirectUrl
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_REDIRECT_URL] : (state, action) => {
    return {
      redirectUrl: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { redirectUrl: '' }

export default function ensureLoggedInReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
