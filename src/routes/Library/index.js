import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'library',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Library = require('./containers/LibraryContainer').default
      const reducer = require('./modules/library').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'library', reducer })

      /*  Return getComponent   */
      cb(null, Library)

    /* Webpack named bundle   */
  }, 'library')
  }
})
