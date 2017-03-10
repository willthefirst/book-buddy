// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_BOOKLIST_REQUEST = 'FETCH_BOOKLIST_REQUEST'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchBookListRequest (request) {
  return {
    type: FETCH_BOOKLIST_REQUEST,
    payload: request
  }
}

export const actions = {

}

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = {

}

const ACTION_HANDLERS = {

}

// ------------------------------------
// Reducer
// ------------------------------------

export default function bookListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
