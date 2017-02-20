// // ------------------------------------
// // Constants
// // ------------------------------------
// export const AUTH_REQUEST = 'AUTH_REQUEST'
// export const AUTH_SUCCESS = 'AUTH_SUCCESS'
// export const AUTH_FAILURE = 'AUTH_FAILURE'
//
// export const UNAUTH_USER = 'UNAUTH_USER',
//             //  FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
//             //  RESET_PASSWORD_REQUEST = 'reset_password_request',
//             //  PROTECTED_TEST = 'protected_test';
//
// // ------------------------------------
// // Actions
// // ------------------------------------
//
// export const authRequest = (request) => {
//   return {
//     type: AUTH_REQUEST,
//     payload: request
//   }
// }
//
// export const authSuccess = (response) => {
//   return {
//     type: AUTH_SUCCESS,
//     payload: response
//   }
// }
//
// export const authFailure = (response) => {
//   return {
//     type: AUTH_FAILURE,
//     payload: response
//   }
// }
//
// export const unauthUser = () => {
//   return {
//     type: UNAUTH_USER
//   }
// }
//
// export const actions = {
//   authRequest,
//   authSuccess,
//   authFailure,
//
//   unauthUser
// }
//
// // ------------------------------------
// // Action Handlers
// // ------------------------------------
// const ACTION_HANDLERS = {
//   [AUTH_REQUEST] : (state, action) => {
//     return { ...state, authenticated: false, loading: true  }
//   },
//   [AUTH_SUCCESS] : (state, action) => {
//     return { ...state, error: '', message: '', content: action.payload, authenticated: true, loading: false }
//   },
//   [AUTH_FAILURE] : (state, action) => {
//     return { ...state, error: action.payload, loading: false }
//   },
//   [UNAUTH_USER] : (state, action) => {
//     return { ...state, content: '', authenticated: false }
//   }
// }
//
// // ------------------------------------
// // Reducer
// // ------------------------------------
// const initialState = { error: '', message: '', content: '', authenticated: false, loading: false}
//
// export default function authReducer (state = initialState, action) {
//   const handler = ACTION_HANDLERS[action.type]
//   return handler ? handler(state, action) : state
// }
