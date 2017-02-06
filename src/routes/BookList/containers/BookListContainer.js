import { connect } from 'react-redux'
import { fetchBookListRequest, fetchBookListSuccess, fetchBookListFailure } from '../modules/bookList'
import axios from 'axios'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import BookList from '../components/BookList'

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

  return {
    fetchBooks: () => {
      dispatch(fetchBookListRequest());

      axios.get(`${ROOT_URL}/books`).then((result) => {
        if (result.status !== 200) {
          dispatch(fetchBookListFailure(result.data));
        } else {
          dispatch(fetchBookListSuccess(result.data))
        }
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookList.books,
    isLoading: state.bookList.loading,
    error: state.bookList.error
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

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
