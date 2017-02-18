import { injectReducer } from 'store/reducers'
import LoginRoute from './routes/Login'
import RegisterRoute from './routes/Register'

export default (store) => ({
  path : 'auth',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
    and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const Auth = require('./containers/AuthContainer').default
      const reducer = require('./modules/auth').default

      injectReducer(store, { key: 'auth', reducer })

      /*  Return getComponent   */
      cb(null, Auth)

      /* Webpack named bundle   */
    }, 'auth')
  },
  childRoutes: [
    LoginRoute(store),
    RegisterRoute(store)
  ]
})
