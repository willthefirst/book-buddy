import { connect } from 'react-redux'
import CoreLayout from '../components/CoreLayout'
import { browserHistory } from 'react-router'
import { authRequest, authFailure, authSuccess } from 'layouts/CoreLayout/modules/coreLayout'
import cookie from 'react-cookie'
import axios from 'axios'
import { errorHandler, authToken } from 'util/common'

const mapDispatchToProps = (dispatch) => {
  return {
    redirectAfterAuth: (prevProps, redirectUrl, isLoggedIn) => {
      const isLoggingOut = prevProps.isLoggedIn && !isLoggedIn
      const isLoggingIn = !prevProps.isLoggedIn && isLoggedIn

      if (isLoggingIn) {
        browserHistory.push(redirectUrl)
      } else if (isLoggingOut) {
        // do any kind of cleanup or post-logout redirection here
      }
    },
    meFromToken: () => {
      // #todo: ADMIN VERSION refactor the getting of the rooturk
      const AUTH_ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api/auth' : '/api/auth';
      if (authToken) {
        dispatch(authRequest());
        axios.get(`${AUTH_ROOT_URL}/meFromToken`, authToken)
          .then((result) => {
            dispatch(authSuccess(result.data));
          }).catch((error) => {
            errorHandler(dispatch, error, authFailure);
          });
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.authenticated,
    redirectUrl: state.auth.redirectUrl
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
