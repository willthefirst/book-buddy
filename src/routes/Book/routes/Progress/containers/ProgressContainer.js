import { connect } from 'react-redux'
import { updateBookRequest, updateBookSuccess, updateBookFailure } from '../../../modules/book'
import axios from 'axios'
import { errorHandler, applyAuthToken } from 'util/common'
import Progress from '../components/Progress'

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'

  return {
    updateProgress: (values, bookId) => {
      const update = {
        date: values.date,
        book_id: bookId,
        currentPage: values.currentPage
      }

      dispatch(updateBookRequest())
      axios.put(`${ROOT_URL}/book/${bookId}/progress`, update, applyAuthToken()).then((result) => {
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
