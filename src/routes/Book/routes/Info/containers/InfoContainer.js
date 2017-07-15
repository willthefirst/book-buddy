import { connect } from 'react-redux'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, applyAuthToken } from 'util/common'
import { browserHistory } from 'react-router'
import Info from '../components/Info'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    updateBook: (book) => {
      const update = {
        status: book.status,
        reason: book.reason,
        totalPages: book.totalPages,
        rating: book.rating
      }

      dispatch(updateBookRequest())
      axios.put(`${APP_SETTINGS.API_BASE}/book/${book._id}`, update, applyAuthToken()).then((result) => {
        dispatch(updateBookSuccess(result.data))
      }).catch((error) => {
        errorHandler(dispatch, error, updateBookFailure)
      })
    },
    deleteBook: (book) => {
      axios.delete(`${APP_SETTINGS.API_BASE}/book/${book._id}`, applyAuthToken()).then((result) => {
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
    enableReinitialize: true,
    loading: state.activeBook.loading,
    errorMessage: state.activeBook.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
