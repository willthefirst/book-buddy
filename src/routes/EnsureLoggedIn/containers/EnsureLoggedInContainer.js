import { connect } from 'react-redux'
import { setRedirectUrl } from 'layouts/CoreLayout/modules/coreLayout'
import EnsureLoggedIn from '../components/EnsureLoggedIn'
import { browserHistory } from 'react-router';


const mapDispatchToProps = (dispatch) => {
  return {
    setRedirectUrl: (currentUrl) => {
      dispatch(setRedirectUrl(currentUrl))
    }
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.authenticated,
  currentUrl: browserHistory.getCurrentLocation().pathname
})

export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedIn)
