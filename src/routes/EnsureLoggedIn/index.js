import { injectReducer } from '../../store/reducers'
import BookListRoute from 'routes/BookList'
import BookRoute from 'routes/Book'
import NewRoute from 'routes/New'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
    and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
      dependencies for bundling   */
      const EnsureLoggedIn = require('./containers/EnsureLoggedInContainer').default
      const reducer = require('./modules/ensureLoggedIn').default

      /*  Add the reducer to the store on key 'ensureLoggedInContainer'  */
      injectReducer(store, { key: 'ensureLoggedIn', reducer })

      /*  Return getComponent   */
      cb(null, EnsureLoggedIn)

      /* Webpack named bundle   */
    }, 'ensureLoggedIn')
  }, childRoutes : [
    BookListRoute(store),
    BookRoute(store),
    NewRoute(store)
  ]
})
