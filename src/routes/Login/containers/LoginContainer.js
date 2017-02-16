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
          dispatch(loginSuccess(result.data));
          console.log('Success. User logged in:', result.data.user.email);
        }).catch((error) => {
          if (error.response) {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            dispatch(loginFailure(error.response.data))
            console.log('Login error:', error.response.data);
          } else {
            // Something happened in setting up the request that triggered an Error
            dispatch(loginFailure(error.message))
            console.error('Request error:', error.message);
          }
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
