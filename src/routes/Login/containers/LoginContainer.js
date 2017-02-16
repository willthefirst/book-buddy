import { connect } from 'react-redux'
import { loginRequest, loginFailure, loginSuccess } from '../modules/login'
import axios from 'axios'
import Login from '../components/Login'

const mapDispatchToProps = (dispatch) => {
  // #todo: ADMIN VERSION refactor the getting of the rooturk
  const AUTH_ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api/auth' : '/api/auth';

  return {
    handleLogin: (user) => {
      dispatch(loginRequest());
      axios.post(`${AUTH_ROOT_URL}/login`, user)
        .then((result) => {
          if (result.status !== 200) {
            dispatch(loginFailure(result.data));
            console.log('Error in result!', result);
          } else {
            dispatch(loginSuccess(result.data));
            console.log('Success. User logged in:', result.data.user.email);
          }
        }).catch((error) => {
          console.log('Error logging in!', error);
        });
    }
  }
}

const mapStateToProps = (state) => ({

})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Login)
