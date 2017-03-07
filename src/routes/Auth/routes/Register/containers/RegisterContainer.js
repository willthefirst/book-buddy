import { connect } from 'react-redux'
import Register from '../components/Register'
import { errorHandler } from 'util/common'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'
import axios from 'axios'
import { authRequest, authFailure, authSuccess } from 'layouts/CoreLayout/modules/coreLayout'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    handleRegister: (user) => {
      dispatch(authRequest())
      axios.post(`${APP_SETTINGS.API_BASE}/auth/register`, user)
        .then((result) => {
          console.log(result)
          cookie.save('token', result.data.token, { path: '/' })
          dispatch(authSuccess(result.data))
          browserHistory.push(`/books`)
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
