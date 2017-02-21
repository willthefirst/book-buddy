import { connect } from 'react-redux'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { errorHandler } from 'util/common'
import cookie from 'react-cookie'
import New from '../components/New'

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

  return {
    createBook: (book) => {
      // dispatch(createBookRequest());
      console.log( cookie.load('token') );

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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(New)
