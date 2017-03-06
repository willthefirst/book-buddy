import { browserHistory } from 'react-router'
import cookie from 'react-cookie'

export const requireAuth = (nextState, replace, callback) => {
  console.log(nextState)
  const token = cookie.load('token')
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
    console.error(error.response.data.message)
    dispatch(errorAction(error.response.data.message))
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(error.message)
    dispatch(errorAction(error.message))
  }
}
export const applyAuthToken = function () {
  return { headers: { 'Authorization': cookie.load('token') } }
}

// Source: http://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
export const truncate = (string, n, useWordBoundary) => {
  if (string.length <= n) { return string }
  var subString = string.substr(0, n - 1)
  return (useWordBoundary
       ? subString.substr(0, subString.lastIndexOf(' '))
       : subString) + '...'
}
