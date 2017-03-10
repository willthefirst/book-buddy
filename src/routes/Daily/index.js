// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'Daily',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Daily = require('./containers/DailyContainer').default
      // const reducer = require('./modules/Daily').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'Daily', reducer })

      /*  Return getComponent   */
      cb(null, Daily)

      /* Webpack named bundle   */
    }, 'Daily')
  }
})
