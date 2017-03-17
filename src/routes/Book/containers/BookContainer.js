import { connect } from 'react-redux'
import { fetchBookRequest, fetchBookSuccess, fetchBookFailure } from '../modules/book'
import { initializeEditorState } from '../routes/Notes/modules/notes'
import { applyAuthToken, errorHandler } from 'util/common'
import axios from 'axios'
import Book from '../components/Book'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBook: (id) => {
      dispatch(fetchBookRequest())
      axios.get(`${APP_SETTINGS.API_BASE}/book/${id}`, applyAuthToken()).then((result) => {
        dispatch(fetchBookSuccess(result.data))
        dispatch(initializeEditorState(result.data.notes))
      }).catch((error) => {
        errorHandler(dispatch, error, fetchBookFailure)
      })
    }
  }
}

const mapStateToProps = (state) => {
  const book = state.activeBook.data

  // Convert authors array to a string
  let authorsToString = ''
  if (book.authors) {
    authorsToString = book.authors.join(', ')
  }

  return {
    title: book.title,
    thumbnailUrl: book.thumbnailUrl,
    authors: authorsToString,
    book_id: book.book_id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
