import { connect } from 'react-redux'
import Register from '../components/Register'
import { errorHandler } from 'util/common'
import axios from 'axios'
import { registerRequest, registerFailure, registerSuccess } from '../modules/register'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    handleRegister: (user) => {
      dispatch(registerRequest())
      axios.post(`${APP_SETTINGS.API_BASE}/auth/register`, user)
      .then((result) => {
        dispatch(registerSuccess(result.data.message))
      }).catch((error) => {
        errorHandler(dispatch, error, registerFailure)
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.register.loading,
    errorMessage: state.register.error,
    isRegistered: state.register.isRegistered
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
