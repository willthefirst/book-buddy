import { connect } from 'react-redux'
import  Header  from './Header'

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  let userEmail = ''
  if (state.auth.authenticated) {
    // userEmail = 'asadasd'
    userEmail = state.auth.content.user.email
  }

  return ({
    isLoggedIn: state.auth.authenticated,
    userEmail: userEmail
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
