import { connect } from 'react-redux'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { updateEditorState, initializeEditorState } from '../modules/notes'
import { updateBookRequest, fetchBookSuccess, fetchBookFailure } from '../../../modules/book'
import axios from 'axios'

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
    onEditorStateChange: function(editorState) {
      dispatch(updateEditorState(editorState));
    },

    updateBookNotes: function(book) {
      // Convert editor content to raw JS object (http://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content)
      let rawContent = convertToRaw(book.notes.getCurrentContent());

      // Serialize because server is acting like a douche with empty entityMap JSON object
      rawContent = JSON.stringify(rawContent);

      const updatedBook = {
        ...book,
        notes: rawContent
      };

      // #todo: refactor the getting of the rooturk
      const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

      dispatch(updateBookRequest())
      // update server
      axios.put(`${ROOT_URL}/book/${book._id}`, updatedBook).then((result) => {
        if (result.status !== 200) {
          dispatch(fetchBookFailure(result.data));
        } else {
          dispatch(fetchBookSuccess(result.data));
        }
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editor
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
