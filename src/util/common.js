import { browserHistory } from 'react-router'
import cookie from 'react-cookie';

export const requireAuth =  (nextState, replace, callback) => {
  console.log(nextState);
  const token = cookie.load('token');
  if (!token) {
    browserHistory.push(`/auth/login`)
  }
  // } else {
  //   browserHistory.push(nextState.location.pathname)
  // }
  // console.error('something got fucked in the router')
  return callback()
}
