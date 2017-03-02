import { connect } from 'react-redux'
import { setRedirectUrl } from 'layouts/CoreLayout/modules/coreLayout'
import EnsureLoggedIn from '../components/EnsureLoggedIn'
import { browserHistory } from 'react-router';
import { errorHandler, applyAuthToken } from 'util/common'
import { authRequest, authFailure, authSuccess } from 'layouts/CoreLayout/modules/coreLayout'
import axios from 'axios'


const mapDispatchToProps = (dispatch) => {
  return {
    setRedirectUrl: (currentUrl) => {
      dispatch(setRedirectUrl(currentUrl))
    },
    meFromToken: () => {
      // #todo: ADMIN VERSION refactor the getting of the rooturk
      const AUTH_ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api/auth' : '/api/auth';
        dispatch(authRequest());
        axios.get(`${AUTH_ROOT_URL}/meFromToken`, applyAuthToken())
          .then((result) => {
            dispatch(authSuccess(result.data));
          }).catch((error) => {
            errorHandler(dispatch, error, authFailure);
            browserHistory.push('/auth/login');
          });
    }
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.authenticated,
  currentUrl: browserHistory.getCurrentLocation().pathname
})

export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedIn)
