import AuthIndex from './components/AuthIndex'
import LoginRoute from './routes/Login'
import RegisterRoute from './routes/Register'
import LogoutRoute from './routes/Logout'

export default (store) => ({
  path : 'auth',
  /*  Async getComponent is only invoked when route matches   */
  component: AuthIndex,
  childRoutes: [
    LoginRoute(store),
    RegisterRoute(store),
    LogoutRoute(store)
  ]
})
