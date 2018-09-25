import {
  AUTH_LOGIN_SUBMIT_EMAIL_PASSWORD,
  AUTH_LOGIN_SUCCESS_EMAIL_PASSWORD,
  AUTH_LOGIN_ERROR_EMAIL_PASSWORD,
  AUTH_SIGNUP_EMAIL_PASSWORD,
  AUTH_SIGNUP_EMAIL_PASSWORD_ERROR,
  AUTH_SIGNUP_EMAIL_PASSWORD_SUCCESS,
  AUTH_CHECK_USER_STATUS,
  AUTH_LOGOUT_SUBMIT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_ERROR,
  AUTH_UPDATE_USER_DATA,
  AUTH_SEND_VERIFICATION_EMAIL,
  AUTH_SEND_VERIFICATION_EMAIL_SUCCESS,
  AUTH_SEND_VERIFICATION_EMAIL_ERROR,
  AUTH_VERIFY_EMAIL_LINK,
  AUTH_VERIFY_EMAIL_LINK_ERROR,
  AUTH_VERIFY_EMAIL_LINK_SUCCESS,
  AUTH_OAUTH_SIGNIN,
  AUTH_OAUTH_SIGNIN_ERROR,
  AUTH_OAUTH_SIGNIN_SUCCESS,
} from './actionTypes';

export function submitEmailPasswordAuthentication(email, password) {
  return {
    type: AUTH_LOGIN_SUBMIT_EMAIL_PASSWORD,
    payload: {
      email,
      password,
    },
  };
}
export function successEmailPasswordAuthentication() {
  return {
    type: AUTH_LOGIN_SUCCESS_EMAIL_PASSWORD,
  };
}
export function errorEmailPasswordAuthentication(payload) {
  return {
    type: AUTH_LOGIN_ERROR_EMAIL_PASSWORD,
    payload,
  };
}
export function checkUserAuthenticationStatus() {
  return {
    type: AUTH_CHECK_USER_STATUS,
  };
}
export function logoutUserAuthencation() {
  return {
    type: AUTH_LOGOUT_SUBMIT,
  };
}
export function logoutUserSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
}
export function logoutUserError() {
  return {
    type: AUTH_LOGOUT_ERROR,
  };
}
export function updateUserAuthenticationData(payload) {
  return {
    type: AUTH_UPDATE_USER_DATA,
    payload,
  };
}
export function sendEmailVerificationAuth(email) {
  return {
    type: AUTH_SEND_VERIFICATION_EMAIL,
    payload: {
      email,
    },
  };
}
export function sendEmailVerificationAuthSuccess() {
  return {
    type: AUTH_SEND_VERIFICATION_EMAIL_SUCCESS,
  };
}
export function sendEmailVerificationAuthError(message) {
  return {
    type: AUTH_SEND_VERIFICATION_EMAIL_ERROR,
    payload: {
      message,
    },
  };
}
// Currently email verification is done on firebase website
export function verifyEmailAuth(email) {
  return {
    type: AUTH_VERIFY_EMAIL_LINK,
    payload: {
      email,
    },
  };
}
export function verifyEmailAuthSuccess() {
  return {
    type: AUTH_VERIFY_EMAIL_LINK_SUCCESS,
  };
}
export function verifyEmailAuthError(message) {
  return {
    type: AUTH_VERIFY_EMAIL_LINK_ERROR,
    payload: {
      message,
    },
  };
}
export function signInOAuth(provider) {
  return {
    type: AUTH_OAUTH_SIGNIN,
    payload: {
      provider,
    },
  };
}
export function signInOAuthError(message) {
  return {
    type: AUTH_OAUTH_SIGNIN_ERROR,
    payload: {
      message,
    },
  };
}
export function signInOAuthSuccess() {
  return {
    type: AUTH_OAUTH_SIGNIN_SUCCESS,
  };
}
export function signUpEmailPassword(email, fullname, password) {
  return {
    type: AUTH_SIGNUP_EMAIL_PASSWORD,
    payload: {
      fullname,
      email,
      password,
    },
  };
}
export function signUpEmailPasswordSuccess(fullname) {
  return {
    type: AUTH_SIGNUP_EMAIL_PASSWORD_SUCCESS,
    payload: {
      fullname,
    },
  };
}
export function signUpEmailPasswordError(message) {
  return {
    type: AUTH_SIGNUP_EMAIL_PASSWORD_ERROR,
    payload: {
      message,
    },
  };
}
