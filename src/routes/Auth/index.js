import AuthIndex from './components/AuthIndex'
import LoginRoute from './routes/Login'
import RegisterRoute from './routes/Register'
import LogoutRoute from './routes/Logout'
import ForgotPasswordRoute from './routes/ForgotPassword'
import ResetPasswordRoute from './routes/ResetPassword'
import VerifyEmailRoute from './routes/VerifyEmail'

export default (store) => ({
  path : 'auth',
  /*  Async getComponent is only invoked when route matches   */
  component: AuthIndex,
  childRoutes: [
    LoginRoute(store),
    RegisterRoute(store),
    LogoutRoute(store),
    ForgotPasswordRoute(store),
    ResetPasswordRoute(store),
    VerifyEmailRoute(store)
  ]
})
