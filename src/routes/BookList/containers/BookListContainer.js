import { connect } from 'react-redux'
import { fetchBookListRequest, fetchBookListSuccess, fetchBookListFailure } from '../modules/bookList'
import { errorHandler, applyAuthToken } from 'util/common'
import axios from 'axios'

import BookList from '../components/BookList'

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'

  return {
    fetchBooks: () => {
      dispatch(fetchBookListRequest())
      axios.get(`${ROOT_URL}/books`, applyAuthToken())
        .then((result) => {
          dispatch(fetchBookListSuccess(result.data))
        }).catch((error) => {
          errorHandler(dispatch, error, fetchBookListFailure)
        })
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

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
