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
          errorHandler(dispatch, error, authFailure)
        })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    redirectUrl: state.auth.redirectUrl
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
