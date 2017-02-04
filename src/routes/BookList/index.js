import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'books',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const BookList = require('./containers/BookListContainer').default
      const reducer = require('./modules/BookList').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'BookList', reducer })

      /*  Return getComponent   */
      cb(null, BookList)

      /* Webpack named bundle   */
    }, 'BookList')
  }
})
