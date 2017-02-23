import { connect } from 'react-redux'
import { fetchBookRequest, fetchBookSuccess, fetchBookFailure } from '../modules/book'
import { initializeEditorState } from '../routes/Notes/modules/notes'
import axios from 'axios'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Book from '../components/Book'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

  return {
    fetchBook: (id) => {
      dispatch(fetchBookRequest());
      axios.get(`${ROOT_URL}/book/${id}`).then((result) => {
        if (result.status !== 200) {
          dispatch(fetchBookFailure(result.data));
        } else {
          dispatch(fetchBookSuccess(result.data));
          dispatch(initializeEditorState(result.data.notes))
        }
      });
    }
  }
}

const mapStateToProps = (state) => {
  const book = state.activeBook.data

  // Convert authors array to a string
  let authorsToString = ""
  if (book.authors) {
    authorsToString = book.authors.join(', ')
  }

  return {
    title: book.title,
    thumbnailUrl: book.thumbnailUrl,
    authors: authorsToString,
    _id: book._id
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

export default connect(mapStateToProps, mapDispatchToProps)(Book)
