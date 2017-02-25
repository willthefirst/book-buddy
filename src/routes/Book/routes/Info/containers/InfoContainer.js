import { connect } from 'react-redux'
import { loadAccount } from '../modules/info'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, authToken } from 'util/common'
import { browserHistory } from 'react-router';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Info from '../components/Info'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */
// const loadAccount = data => ({ type: LOAD, data })

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

  return {
    updateBook: (book) => {
      const update = {
        status: book.status,
        totalPages: book.totalPages
      }

      dispatch(updateBookRequest());
      axios.put(`${ROOT_URL}/book/${book._id}`, update, authToken).then((result) => {
        dispatch(updateBookSuccess(result.data));
      }).catch((error) => {
        errorHandler(dispatch, error, updateBookFailure)
      });;
    },
    deleteBook: (book) => {
      axios.delete(`${ROOT_URL}/book/${book._id}`, authToken).then((result) => {
        console.log(result);
        browserHistory.push(`/books`)
      }).catch((error) => {
        console.error('Failed to delete book.', error);
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.activeBook.data,
    enableReinitialize: true
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
export default connect(mapStateToProps, mapDispatchToProps)(Info)
