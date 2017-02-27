import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// If we have a JWT token, update state to reflect authenticated user
// const token = cookie.load('token');
//
// if (token) {
//
//   store.dispatch(authSuccess(token));
//
//   handleLogin: (user, redirectUrl) => {
//     dispatch(authRequest());
//     axios.post(`${AUTH_ROOT_URL}/login`, user)
//       .then((result) => {
//         cookie.save('token', result.data.token, { path: '/' });
//         dispatch(authSuccess(result.data));
//       }).catch((error) => {
//         errorHandler(dispatch, error, authFailure);
//       });
//   }
// }

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
