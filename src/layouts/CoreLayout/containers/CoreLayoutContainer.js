import { connect } from 'react-redux'
import CoreLayout from '../components/CoreLayout'
import { browserHistory } from 'react-router'

const mapDispatchToProps = (dispatch) => {
  return {
    redirectAfterAuth: (prevProps, redirectUrl, isLoggedIn) => {
      const isLoggingOut = prevProps.isLoggedIn && !isLoggedIn
      const isLoggingIn = !prevProps.isLoggedIn && isLoggedIn

      if (isLoggingIn) {
        browserHistory.push(redirectUrl)
      } else if (isLoggingOut) {
        // do any kind of cleanup or post-logout redirection here
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.authenticated,
    redirectUrl: state.auth.redirectUrl
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
