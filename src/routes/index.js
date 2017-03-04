// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CounterRoute from './Counter'
import AuthRoute from './Auth'
import EnsureLoggedInRoute from './EnsureLoggedIn'
import ErrorRoute from './Error'
import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : '/',
  indexRoute: Home,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const CoreLayout = require('layouts/CoreLayout/containers/CoreLayoutContainer').default
      const reducer = require('layouts/CoreLayout/modules/coreLayout').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'auth', reducer })

      /*  Return getComponent   */
      cb(null, CoreLayout)

    /* Webpack named bundle   */
    }, 'coreLayout')
  },
  childRoutes: [
    CounterRoute(store),
    AuthRoute(store),
    EnsureLoggedInRoute(store),
    ErrorRoute(store)
  ]
})
