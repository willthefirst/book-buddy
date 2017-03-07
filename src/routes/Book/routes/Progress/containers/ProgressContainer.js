import { connect } from 'react-redux'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, applyAuthToken } from 'util/common'
import Progress from '../components/Progress'
import APP_SETTINGS from 'config'
import moment from 'moment'

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
  let progress = []
  if (state.activeBook.data.progress) {
    progress = state.activeBook.data.progress
  }

  return {
    progressEntries: progress,
    latestEntry: progress[0] ? progress[0].currentPage : 0,
    initialValues: {
      date: moment().format('YYYY-MM-DD')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
