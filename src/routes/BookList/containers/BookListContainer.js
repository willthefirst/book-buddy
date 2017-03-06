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

const mapStateToProps = (state) => {
  return {
    books: state.bookList.books,
    isLoading: state.bookList.loading,
    error: state.bookList.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
