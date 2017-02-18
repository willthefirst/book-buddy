import { browserHistory } from 'react-router'
import cookie from 'react-cookie';

export const requireAuth =  (nextState, replace, callback) => {
  const token = cookie.load('token');
  if (!token) {
    browserHistory.push(`/auth/login`)
  }
  return callback()
}
