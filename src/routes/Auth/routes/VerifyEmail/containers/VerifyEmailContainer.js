import { connect } from 'react-redux'
import VerifyEmail from '../components/VerifyEmail'
import { errorHandler } from 'util/common'
import axios from 'axios'
import { verifyRequest, verifyFailure, verifySuccess } from '../modules/verifyEmail'
import APP_SETTINGS from 'config'
import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmail: (token) => {
      dispatch(verifyRequest(token))
      axios.post(`${APP_SETTINGS.API_BASE}/auth/verify-email/${token}`)
        .then((result) => {
          dispatch(verifySuccess(result.data.message))
        }).catch((error) => {
          errorHandler(dispatch, error, verifyFailure)
        })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isVerified: state.verify.isVerified,
    loading: state.verify.loading,
    error: state.verify.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
