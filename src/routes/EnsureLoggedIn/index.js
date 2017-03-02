import { injectReducer } from '../../store/reducers'
import BookListRoute from 'routes/BookList'
import BookRoute from 'routes/Book'
import NewRoute from 'routes/New'
import ErrorRoute from 'routes/Error'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const EnsureLoggedIn = require('./containers/EnsureLoggedInContainer').default
      cb(null, EnsureLoggedIn)
    }, 'ensureLoggedIn')
  }, childRoutes : [
    BookListRoute(store),
    BookRoute(store),
    NewRoute(store),
    ErrorRoute(store)
  ]
})
