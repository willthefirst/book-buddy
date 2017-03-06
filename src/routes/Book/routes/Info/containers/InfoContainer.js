import { connect } from 'react-redux'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, applyAuthToken } from 'util/common'
import { browserHistory } from 'react-router'
import Info from '../components/Info'

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:8080/api' : '/api'

  return {
    updateBook: (book) => {
      const update = {
        status: book.status,
        totalPages: book.totalPages
      }

      dispatch(updateBookRequest())
      axios.put(`${ROOT_URL}/book/${book._id}`, update, applyAuthToken()).then((result) => {
        dispatch(updateBookSuccess(result.data))
      }).catch((error) => {
        errorHandler(dispatch, error, updateBookFailure)
      })
    },
    deleteBook: (book) => {
      axios.delete(`${ROOT_URL}/book/${book._id}`, applyAuthToken()).then((result) => {
        browserHistory.push(`/books`)
      }).catch((error) => {
        console.error('Failed to delete book.', error)
      })
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
