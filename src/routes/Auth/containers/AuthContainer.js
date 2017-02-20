export function errorHandler(dispatch, error, errorAction) {
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    dispatch(errorAction(error.response.data.message))
  } else {
    // Something happened in setting up the request that triggered an Error
    dispatch(errorAction(error.message))
  }
}
