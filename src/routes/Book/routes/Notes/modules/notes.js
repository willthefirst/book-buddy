import { EditorState, convertFromRaw } from 'draft-js'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE'
export const INITIALIZE_EDITOR_STATE = 'INITIALIZE_EDITOR_STATE'

// ------------------------------------
// Actions
// ------------------------------------
export function updateEditorState (state) {
  return {
    type: UPDATE_EDITOR_STATE,
    payload: state
  }
}

export function initializeEditorState (notes) {
  return {
    type: INITIALIZE_EDITOR_STATE,
    payload: notes
  }
}

export const actions = {
  updateEditorState,
  initializeEditorState
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_EDITOR_STATE] : (state, action) => {
    return action.payload
  },
  [INITIALIZE_EDITOR_STATE] : (state, action) => {
    // If initializing with nothing, leave state alone
    if (!action.payload) {
      return state
    }

    // Else, initialize editor with latest notes
    const raw = JSON.parse(action.payload)
    const contentState = convertFromRaw(raw)
    const editorState = EditorState.createWithContent(contentState)
    return editorState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = EditorState.createEmpty()

export default function notesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
