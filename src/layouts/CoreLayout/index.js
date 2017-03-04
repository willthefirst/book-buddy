export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
    and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const CoreLayout = require('./containers/CoreLayoutContainer').default

      /*  Return getComponent   */
      cb(null, CoreLayout)

      /* Webpack named bundle   */
    }, 'coreLayout')
  }
})
