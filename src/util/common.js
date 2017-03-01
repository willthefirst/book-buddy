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
  console.log(error.response);
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response.data.message)
    dispatch(errorAction(error.response.data.message))
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(error.message)
    dispatch(errorAction(error.message))
  }
}
export const applyAuthToken = function() {
  return { headers: {'Authorization': cookie.load('token') } }
}
