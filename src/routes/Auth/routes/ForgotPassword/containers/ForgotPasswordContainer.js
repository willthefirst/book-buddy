import { connect } from 'react-redux'
import ForgotPassword from '../components/ForgotPassword'
import { errorHandler } from 'util/common'
import { browserHistory } from 'react-router'
import axios from 'axios'
import { authFailure } from 'layouts/CoreLayout/modules/coreLayout'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    handleForgotPassword: (user) => {
      axios.post(`${APP_SETTINGS.API_BASE}/auth/forgot-password`, user)
        .then((result) => {
          // #todo make this slicker.
          alert(result.data.message);
          browserHistory.push('/');
        }).catch((error) => {
          errorHandler(dispatch, error, authFailure)
        })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
