import { connect } from "react-redux";
import EnsureLoggedIn from "../components/EnsureLoggedIn";
import { browserHistory } from "react-router";
import { errorHandler, applyAuthToken } from "util/common";
import {
  authRequest,
  authFailure,
  authSuccess,
  setRedirectUrl
} from "layouts/CoreLayout/modules/coreLayout";
import axios from "axios";
import APP_SETTINGS from "config";
import mixpanel from 'mixpanel-browser';


const mapDispatchToProps = dispatch => {
  return {
    setRedirectUrl: currentUrl => {
      dispatch(setRedirectUrl(currentUrl));
    },
    meFromToken: (redirectUrl) => {
      dispatch(authRequest());
      axios
        .get(`${APP_SETTINGS.API_BASE}/auth/meFromToken`, applyAuthToken())
        .then(result => {
          dispatch(authSuccess(result.data));
          mixpanel.identify(result.data.user._id)
          browserHistory.push(redirectUrl);
        })
        .catch(error => {
          errorHandler(dispatch, error, authFailure);
          browserHistory.push('/auth/login');
        });
    }
  };
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.authenticated,
  currentUrl: browserHistory.getCurrentLocation().pathname
});

export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedIn);
