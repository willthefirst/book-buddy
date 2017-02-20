import { injectReducer } from 'store/reducers'
import InfoRoute from './routes/Info'
import ProgressRoute from './routes/Progress'
import NotesRoute from './routes/Notes'
import { requireAuth } from 'util/common'

export default (store) => ({
  path : 'book/id/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Book = require('./containers/BookContainer').default
      const reducer = require('./modules/book').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'activeBook', reducer })

      /*  Return getComponent   */
      cb(null, Book)

    /* Webpack named bundle   */
    }, 'activeBook')
  },
  childRoutes: [
    InfoRoute(store), // <site>/book/info
    ProgressRoute(store), // <site>/book/progress
    NotesRoute(store) // <site>/book/notes
  ]
});
