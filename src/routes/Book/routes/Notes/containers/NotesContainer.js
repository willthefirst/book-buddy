import { connect } from 'react-redux'
import { convertToRaw } from 'draft-js'
import { updateEditorState, initializeEditorState } from '../modules/notes'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import { errorHandler, applyAuthToken } from 'util/common'
import axios from 'axios'
import APP_SETTINGS from 'config'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Notes from '../components/Notes'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch) => {
  return {
    // For the editor to manage it's own state
    onEditorStateChange: function (editorState) {
      dispatch(updateEditorState(editorState))
    },

    updateBookNotes: function (editorState, bookId) {
      // Convert editor content to raw JS object
      // (http://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content)
      let rawContent = convertToRaw(editorState.getCurrentContent())

      // Serialize because server is acting like a douche with empty entityMap JSON object
      rawContent = JSON.stringify(rawContent)

      const update = {
        book_id: bookId,
        notes: rawContent
      }

      dispatch(updateBookRequest())
      axios.put(`${APP_SETTINGS.API_BASE}/book/${bookId}`, update, applyAuthToken()).then((result) => {
        dispatch(updateBookSuccess(result.data))
        dispatch(initializeEditorState(result.data.notes))
      }).catch((error) => {
        errorHandler(dispatch, error, updateBookFailure(error))
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editor,
    bookId: state.activeBook.data._id,
    loading: state.activeBook.loading,
    errorMessage: state.activeBook.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
