// ------------------------------------
// Constants
// ------------------------------------
export const LOAD = 'redux-form-examples/account/LOAD'

// ------------------------------------
// Actions
// ------------------------------------

export function loadAccount(data) {
  return {
    type: LOAD,
    payload: data
  }
}

export const actions = {
  loadAccount
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD] : (state, action) => {
    return {
      data: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState =  {}

export default function infoReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
