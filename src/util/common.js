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

export const errorHandler = (dispatch, error, errorAction) => {
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    dispatch(errorAction(error.response.data.message))
  } else {
    // Something happened in setting up the request that triggered an Error
    dispatch(errorAction(error.message))
  }
}
