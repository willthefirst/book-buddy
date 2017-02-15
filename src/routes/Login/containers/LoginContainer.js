import { connect } from 'react-redux'
import { loginRequest, loginFailure, loginSuccess } from '../modules/login'
import axios from 'axios'
import Login from '../components/Login'

const mapDispatchToProps = (dispatch) => {
  // #todo: refactor the getting of the rooturk
  const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

  return {
    handleLogin: (user) => {
      dispatch(loginRequest());
      console.log(user);
      axios.post(`${ROOT_URL}/login`).then((result) => {
        if (result.status !== 200) {
          dispatch(LoginFailure(result.data));
        } else {
          dispatch(LoginSuccess(result.data));
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
