import { connect } from 'react-redux'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { errorHandler, applyAuthToken } from 'util/common'
import { fetchGBooksRequest, fetchGBooksSuccess, fetchGBooksFailure } from '../modules/gBooksResults'
import { createBookRequest, createBookSuccess, createBookFailure } from 'routes/Book/modules/book'
import New from '../components/New'
import APP_SETTINGS from 'config'

const gBookQuery = (query) => {
  return `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GBOOKS_API_KEY}`
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryGBooks: (keyword) => {
      if (keyword.length > 2) {
        dispatch(fetchGBooksRequest())
        axios.get(gBookQuery(`${keyword}`))
        .then((result) => {
          let books
          if (result.data.totalItems < 1) {
            books = []
          } else {
            // Create a clean JSON array of books
            books = result.data.items.map((volume) => {
              const info = volume.volumeInfo

              // Set authors
              let authors = []
              if (info.authors) {
                authors = info.authors.map((author) => {
                  return author
                })
              }

              // Set thumbnail
              let thumbnailUrl = ''
              if (info.imageLinks) {
                thumbnailUrl = info.imageLinks.thumbnail
              }
              return {
                title: info.title,
                authors: authors,
                thumbnailUrl: thumbnailUrl,
                totalPages: info.pageCount,
                gBooks_id: volume.id
              }
            })
          }
          // Update store with clean array of books
          dispatch(fetchGBooksSuccess(books))
        }).catch((error) => {
          errorHandler(dispatch, error, fetchGBooksFailure)
        })
      }
    },
    createBook: (book) => {
      dispatch(createBookRequest())

      axios.post(
        `${APP_SETTINGS.API_BASE}/books`,
        book,
        applyAuthToken())
      .then((result) => {
        // #todo: this double fetches books. on success we load book to state, but then on navigate to the book route
        // we make another server call to reget the book...
        dispatch(createBookSuccess(result.data))
        browserHistory.push(`/book/id/${result.data._id}/info`)
      }).catch((error) => {
        errorHandler(dispatch, error, createBookFailure)
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    gBooksResults : state.gBooksResults.books
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(New)
