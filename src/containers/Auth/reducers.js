/* global window */
import {
  AUTH_UPDATE_USER_DATA,
  AUTH_LOGIN_SUBMIT_EMAIL_PASSWORD,
  AUTH_LOGIN_SUCCESS_EMAIL_PASSWORD,
  AUTH_LOGIN_ERROR_EMAIL_PASSWORD,
  AUTH_CHECK_USER_STATUS,
  AUTH_SIGNUP_EMAIL_PASSWORD,
  AUTH_SIGNUP_EMAIL_PASSWORD_ERROR,
  AUTH_SIGNUP_EMAIL_PASSWORD_SUCCESS,
} from './actionTypes';

const initialState = {
  isLoggedIn: false,
  user: {},
  authenticating: false,
  loginForm: {
    errors: false,
    message: '',
    loading: false,
  },
  signupForm: {
    errors: false,
    message: '',
    loading: false,
  },
  confirmEmailForm: {
    email: false,
    isVerified: false,
    isVerifying: false,
    errors: false,
    message: '',
  },
};

function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_UPDATE_USER_DATA:
      return {
        ...state,
        isLoggedIn: action.payload.loggedIn,
        authenticating: false,
        user: {
          ...action.payload.user,
        },
        loginForm: {
          ...state.loginForm,
          loading: false,
        },

      };
    case AUTH_LOGIN_SUBMIT_EMAIL_PASSWORD:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          loading: true,
          errors: false,
        },
      };
    case AUTH_LOGIN_SUCCESS_EMAIL_PASSWORD:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          loading: false,
        },
      };
    case AUTH_LOGIN_ERROR_EMAIL_PASSWORD:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          loading: false,
          errors: true,
          message: action.payload,
        },
      };
    case AUTH_CHECK_USER_STATUS:
      return {
        ...state,
        authenticating: true,
      };
    case AUTH_SIGNUP_EMAIL_PASSWORD:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          loading: true,
          errors: false,
        },
      };
    case AUTH_SIGNUP_EMAIL_PASSWORD_ERROR:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          loading: false,
          errors: true,
          message: action.payload.message,
        },
      };
    case AUTH_SIGNUP_EMAIL_PASSWORD_SUCCESS:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          loading: false,
        },
      };
    default:
      break;
  }
  return state;
}

export default authenticationReducer;
