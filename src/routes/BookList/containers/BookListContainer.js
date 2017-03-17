import { connect } from 'react-redux'
import { fetchBookListRequest, fetchBookListSuccess, fetchBookListFailure } from '../modules/bookList'
import { errorHandler, applyAuthToken } from 'util/common'
import axios from 'axios'
import APP_SETTINGS from 'config'
import BookList from '../components/BookList'

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: () => {
      dispatch(fetchBookListRequest())
      axios.get(`${APP_SETTINGS.API_BASE}/books`, applyAuthToken())
        .then((result) => {
          dispatch(fetchBookListSuccess(result.data))
        }).catch((error) => {
          errorHandler(dispatch, error, fetchBookListFailure)
        })
    }
  }
}

const getBooksByStatus = (status, allBooks) => {
  const books = allBooks.filter((book) => {
    return book.status === status
  })

  return books
}

const mapStateToProps = (state) => {
  const bookList = state.bookList
  return {
    booksCurrent: getBooksByStatus('current', bookList.books),
    booksQueue: getBooksByStatus('queue', bookList.books),
    booksFinished: getBooksByStatus('finished', bookList.books),
    isLoading: bookList.loading,
    error: bookList.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
