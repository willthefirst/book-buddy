import { connect } from "react-redux";
import Welcome from "../components/Welcome";

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.authenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
