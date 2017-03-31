import { connect } from 'react-redux'
import ResetPassword from '../components/ResetPassword'
import { errorHandler } from 'util/common'
import axios from 'axios'
import { resetPasswordRequest, resetPasswordFailure, resetPasswordSuccess } from '../modules/resetPassword'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetPassword: (values, token) => {
      console.log('here');
      dispatch(resetPasswordRequest())
      axios.post(`${APP_SETTINGS.API_BASE}/auth/reset-password/${token}`, values)
        .then((result) => {
          dispatch(resetPasswordSuccess())
        }).catch((error) => {
          errorHandler(dispatch, error, resetPasswordFailure)
        })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.resetPassword.loading,
    errorMessage: state.resetPassword.error,
    isReset: state.resetPassword.isReset
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
