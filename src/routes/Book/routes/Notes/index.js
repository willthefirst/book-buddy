import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'notes',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Notes = require('./containers/NotesContainer').default
      const reducer = require('./modules/notes').default

      injectReducer(store, { key: 'editor', reducer })

      /*  Return getComponent   */
      cb(null, Notes)

    /* Webpack named bundle   */
    }, 'editor')
  }
});
