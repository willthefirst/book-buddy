import 'babel-polyfill' // polyfill allows google crawler to see the site
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import mixpanel from 'mixpanel-browser';
import ReactDOMServer from 'react-dom/server'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// Mixpanel Inititialization
// ========================================================
if (__PROD__) {
  mixpanel.init('ebfe41d30f955d190e7c14dbbb2181ca');
} else {
  mixpanel.init('ef6e8738947feecf11daba6a1b2f5fcc');
}

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
