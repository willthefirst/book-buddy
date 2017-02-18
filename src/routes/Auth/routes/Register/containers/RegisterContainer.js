import { connect } from 'react-redux'
import Register from '../components/Register'
import { errorHandler } from 'routes/auth/containers/AuthContainer'
import { browserHistory } from 'react-router';
import cookie from 'react-cookie'
import axios from 'axios'
import { authRequest, authFailure, authSuccess } from 'routes/auth/modules/auth'


const mapDispatchToProps = (dispatch) => {
  // #todo: ADMIN VERSION refactor the getting of the rooturk
  const AUTH_ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api/auth' : '/api/auth';

  return {
    handleRegister: (user) => {
      dispatch(authRequest());
      axios.post(`${AUTH_ROOT_URL}/register`, user)
        .then((result) => {
          cookie.save('token', result.data.token, { path: '/' });
          dispatch(authSuccess(result.data));
          browserHistory.push(`/books`);
        }).catch((error) => {
          errorHandler(dispatch, error, authFailure);
        });
    }
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
