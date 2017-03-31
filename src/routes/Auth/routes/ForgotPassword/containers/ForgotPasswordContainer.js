import { connect } from 'react-redux'
import ForgotPassword from '../components/ForgotPassword'
import { errorHandler } from 'util/common'
import axios from 'axios'
import { forgotRequest, forgotFailure, forgotSuccess } from '../modules/forgotPassword'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    handleForgotPassword: (user) => {
      dispatch(forgotRequest())
      axios.post(`${APP_SETTINGS.API_BASE}/auth/forgot-password`, user)
        .then((result) => {
          dispatch(forgotSuccess())
        }).catch((error) => {
          errorHandler(dispatch, error, forgotFailure)
        })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.forgotPassword.loading,
    errorMessage: state.forgotPassword.error,
    emailSent: state.forgotPassword.emailSent
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
