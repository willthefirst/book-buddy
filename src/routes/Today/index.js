// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'today',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Today = require('./containers/TodayContainer').default
      // const reducer = require('./modules/today').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'today', reducer })

      /*  Return getComponent   */
      cb(null, Today)

      /* Webpack named bundle   */
    }, 'today')
  }
})
