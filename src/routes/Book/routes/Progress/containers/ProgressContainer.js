import { connect } from 'react-redux'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, applyAuthToken } from 'util/common'
import Progress from '../components/Progress'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    updateProgress: (values, bookId) => {
      const update = {
        date: values.date,
        book_id: bookId,
        currentPage: values.currentPage
      }

      dispatch(updateBookRequest())
      axios.put(`${APP_SETTINGS.API_BASE}/book/${bookId}/progress`, update, applyAuthToken()).then((result) => {
        const update = {
          progress: result.data
        }
        dispatch(updateBookSuccess(update))
      }).catch((error) => {
        errorHandler(dispatch, error, updateBookFailure)
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    progressEntries: state.activeBook.data.progress || []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
