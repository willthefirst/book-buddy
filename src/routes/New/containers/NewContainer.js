import { connect } from 'react-redux'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { errorHandler, authToken } from 'util/common'
import { fetchGBooksRequest, fetchGBooksSuccess, fetchGBooksFailure } from '../modules/gBooksResults'
import { createBookRequest, createBookSuccess, createBookFailure } from 'routes/Book/modules/book'
import New from '../components/New'

const gBookQuery = (query) => {
  return `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GBOOKS_API_KEY}`
}

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

  return {
    queryGBooks: (keyword) => {
      if (keyword.length > 2) {
        dispatch(fetchGBooksRequest());
        axios.get(gBookQuery(`${keyword}`))
        .then((result) => {
          if (result.data.items > 0) {
            // Create a clean JSON array of books
            const books = result.data.items.map((volume) => {
              const info = volume.volumeInfo

              const authors = info.authors.map((author) => {
                return author
              });

              return {
                title: info.title,
                authors: authors,
                thumbnailUrl: info.imageLinks.thumbnail,
                totalPages: info.pageCount,
                gBooks_id: volume.id
              }
            });
            // Update store with clean array of books
            dispatch(fetchGBooksSuccess(books));
          }
        }).catch((error) => {
          errorHandler(dispatch, error, fetchGBooksFailure)
        });
      }
    },
    createBook: (book) => {
      dispatch(createBookRequest());

      axios.post(
        `${ROOT_URL}/books`,
        book,
        authToken)
      .then((result) => {
        console.log('Book saved:', result.data);
        // #todo: this double fetches books. on success we load book to state, but then on navigate to the book route
        // we make another server call to reget the book...
        dispatch(createBookSuccess(result.data));
        browserHistory.push(`/book/id/${result.data._id}/info`)
      }).catch((error) => {
        errorHandler(dispatch, error, createBookFailure);
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    gBooksResults : state.gBooksResults.books
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(New)
