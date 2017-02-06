// import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'progress',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Progress = require('./containers/ProgressContainer').default
      const reducer = require('./modules/progress').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'progress', reducer })

      /*  Return getComponent   */
      cb(null, Progress)

    /* Webpack named bundle   */
    }, 'progress')
  }
});
