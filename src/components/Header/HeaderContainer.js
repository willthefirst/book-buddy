import { connect } from 'react-redux'
import  Header  from './Header'

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.authenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
