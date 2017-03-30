import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'forgot-password',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ForgotPassword = require('./containers/ForgotPasswordContainer').default
      const reducer = require('./modules/forgotPassword').default

      injectReducer(store, { key: 'forgotPassword', reducer })

      /*  Return getComponent   */
      cb(null, ForgotPassword)
    /* Webpack named bundle   */
    }, 'forgot-password')
  }
})
