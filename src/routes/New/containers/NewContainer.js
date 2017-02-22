import { connect } from 'react-redux'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { errorHandler } from 'util/common'
import { fetchGBooksRequest, fetchGBooksSuccess, fetchGBooksFailure } from '../modules/gBooksResults'
import cookie from 'react-cookie'
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
          const books = result.data.items.map((volume) => {
            const info = volume.volumeInfo

            const authors = info.authors.map((author) => {
              return author
            });

            return {
              title: info.title,
              authors: authors,
              thumbnailUrl: info.imageLinks.smallThumbnail,
              totalPages: info.pageCount
            }
          });
          dispatch(fetchGBooksSuccess(books));
        }).catch((error) => {
          errorHandler(dispatch, error, fetchGBooksFailure)
        });
      }
    },
    createBook: (book) => {
      // dispatch(createBookRequest());
      const config = {
        headers: {'Authorization': cookie.load('token') }
      }

      axios.post(
        `${ROOT_URL}/books`,
        book,
        config)
      .then((result) => {
        console.log('book saved', result);
        browserHistory.push(`/book/id/${result.data._id}/info`)
      }).catch((error) => {
        // errorHandler(dispatch, error, actionHere);

        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message)
        }

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
