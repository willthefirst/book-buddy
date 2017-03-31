import { connect } from 'react-redux'
import Login from '../components/Login'
import { errorHandler } from 'util/common'
import cookie from 'react-cookie'
import axios from 'axios'
import { authRequest, authFailure, authSuccess } from 'layouts/CoreLayout/modules/coreLayout'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (user, redirectUrl) => {
      dispatch(authRequest())
      axios.post(`${APP_SETTINGS.API_BASE}/auth/login`, user)
        .then((result) => {
          cookie.save('token', result.data.token, { path: '/' })
          dispatch(authSuccess(result.data))
        }).catch((error) => {
          if (error.response.data.message === 'Missing credentials') {
            error.response.data.message = 'Make sure you type in both your email AND password.'
          } else if (error.response.data.message === 'jwt expired') {
            error.response.data.message = 'Please log in again.'
          }
          errorHandler(dispatch, error, authFailure)
        })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    redirectUrl: state.auth.redirectUrl,
    loading: state.auth.loading,
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
