import { connect } from 'react-redux'
import VerifyEmail from '../components/VerifyEmail'
import { errorHandler } from 'util/common'
import axios from 'axios'
import { authFailure } from 'layouts/CoreLayout/modules/coreLayout'
import APP_SETTINGS from 'config'
import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmail: (token) => {
      axios.post(`${APP_SETTINGS.API_BASE}/auth/verify-email/${token}`)
        .then((result) => {
          alert(result.data.message);
          browserHistory.push(`/auth/login`)
        }).catch((error) => {
          errorHandler(dispatch, error, authFailure)
        })
    }
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
