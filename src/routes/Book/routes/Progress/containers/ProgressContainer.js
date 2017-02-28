import { connect } from 'react-redux'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, applyAuthToken } from 'util/common'
var moment = require('moment');

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Progress from '../components/Progress'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

  return {
    updateProgress: (values, book_id) => {
      const update = {
        date: values.date,
        book_id: book_id,
        currentPage: values.currentPage
      }

      dispatch(updateBookRequest());
      axios.put(`${ROOT_URL}/book/${book_id}/progress`, update, applyAuthToken()).then((result) => {
        const update = {
          progress: result.data
        }
        dispatch(updateBookSuccess(update));
      }).catch((error) => {
        errorHandler(dispatch, error, updateBookFailure)
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    progressEntries: state.activeBook.data.progress || []
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

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
