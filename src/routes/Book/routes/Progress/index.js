export default (store) => ({
  path : 'progress',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Progress = require('./containers/ProgressContainer').default
      cb(null, Progress)
    }, 'progress')
  }
})
