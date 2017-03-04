export default (store) => ({
  path : 'logout',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Login = require('./containers/LogoutContainer').default
      /*  Return getComponent   */
      cb(null, Login)
    /* Webpack named bundle   */
    }, 'logout')
  }
})
