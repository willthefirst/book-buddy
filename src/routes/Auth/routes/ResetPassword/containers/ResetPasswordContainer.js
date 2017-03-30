import { connect } from 'react-redux'
import ResetPassword from '../components/ResetPassword'
import { errorHandler } from 'util/common'
import { browserHistory } from 'react-router'
import cookie from 'react-cookie'
import axios from 'axios'
import { authFailure } from 'layouts/CoreLayout/modules/coreLayout'
import APP_SETTINGS from 'config'

const mapDispatchToProps = (dispatch) => {
  return {
    handleResetPassword: (values, token) => {
      axios.post(`${APP_SETTINGS.API_BASE}/auth/reset-password/${token}`, values)
        .then((result) => {
          alert(result.data.message)
          browserHistory.push(`/daily`)
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
