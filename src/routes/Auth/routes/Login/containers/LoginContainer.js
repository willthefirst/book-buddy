import { connect } from 'react-redux'
import Login from '../components/Login'
import { errorHandler } from 'util/common'
import cookie from 'react-cookie'
import axios from 'axios'
import { authRequest, authFailure, authSuccess } from 'layouts/CoreLayout/modules/coreLayout'

const mapDispatchToProps = (dispatch) => {
  // #todo: ADMIN VERSION refactor the getting of the rooturk
  const AUTH_ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api/auth' : '/api/auth'

  return {
    handleLogin: (user, redirectUrl) => {
      dispatch(authRequest())
      axios.post(`${AUTH_ROOT_URL}/login`, user)
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
