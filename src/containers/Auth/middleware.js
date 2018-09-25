/* global window */
import {
  AUTH_LOGIN_SUBMIT_EMAIL_PASSWORD,
  AUTH_SIGNUP_EMAIL_PASSWORD,
  AUTH_LOGOUT_SUBMIT,
  AUTH_CHECK_USER_STATUS,
  AUTH_SEND_VERIFICATION_EMAIL,
  AUTH_OAUTH_SIGNIN,
} from './actionTypes';
import {
  checkUserAuthenticationStatus,
  updateUserAuthenticationData,
  successEmailPasswordAuthentication,
  errorEmailPasswordAuthentication,
  signUpEmailPasswordError,
  signUpEmailPasswordSuccess,
  sendEmailVerificationAuth,
} from './actions';
import { updateUserData } from '../User/actions';
import history from '../../';
import {
  FacebookAuth,
  GoogleAuth,
  Auth,
} from '../../utils/firebase';

const authMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === AUTH_CHECK_USER_STATUS) {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          photoURL,
          uid,
          providerData,
        } = user;
        window.localStorage.setItem('shouldBeLoggedIn', true);
        if (!emailVerified) {
          history.push('/auth/confirmEmail');
        }
        dispatch(updateUserAuthenticationData({
          loggedIn: true,
          user: {
            displayName,
            email,
            emailVerified,
            photoURL,
            uid,
            providerData,
          },
        }));
        // Token is used only in ajax requests
        Auth.currentUser.getIdToken().then((token) => {
          console.log("Token Saved");
          window.sessionStorage.setItem('token', token);
        });
        console.log('User Logged IN');
      } else {
        window.localStorage.setItem('shouldBeLoggedIn', false);
        dispatch(updateUserAuthenticationData({
          loggedIn: false,
          user: null,
        }));
        console.log('Not Logged IN');
      }
    });
  }
  if (action.type === AUTH_SEND_VERIFICATION_EMAIL) {
    const actionCodeSettings = {
      url: 'https://crowdalert.herokuapp.com/login',
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.crowdalert.',
      },
      android: {
        packageName: 'com.crowdalert.',
        installApp: true,
      },
    };
    Auth.currentUser.sendEmailVerification(actionCodeSettings)
      .then(() => {
        console.log('Email Sent');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  next(action);
};

const emailPasswordAuthMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === AUTH_LOGIN_SUBMIT_EMAIL_PASSWORD) {
    const { email } = action.payload;
    const { password } = action.payload;
    Auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(successEmailPasswordAuthentication());
        dispatch(checkUserAuthenticationStatus());
        history.push('/');
      })
      .catch((err) => {
        dispatch(errorEmailPasswordAuthentication(err.message));
      });
  }
  if (action.type === AUTH_SIGNUP_EMAIL_PASSWORD) {
    const { email, password, fullname } = action.payload;
    dispatch(checkUserAuthenticationStatus());
    Auth.createUserWithEmailAndPassword(email, password).then((user) => {
      // Send a verificaiton mail
      dispatch(sendEmailVerificationAuth(email));
      // Update the firebase profile
      user.updateProfile({
        displayName: fullname,
      });
      // Make sure that we have the token before dispatching an async action
      user.getIdToken().then((token) => {
        window.sessionStorage.setItem('token', token);
        dispatch(updateUserData({ userData: { displayName: fullname } }));
      });
    }).catch((err) => {
      console.log(err.message);
      dispatch(signUpEmailPasswordError(err.message));
    });
    dispatch(signUpEmailPasswordSuccess(fullname));
  }
  if (action.type === AUTH_LOGOUT_SUBMIT) {
    Auth.signOut()
      .then(() => {
        dispatch(checkUserAuthenticationStatus());
        history.push('/login/');
      })
      .catch((err) => { console.log('Error sign out', err); });
  }
  next(action);
};
const oAuthMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === AUTH_OAUTH_SIGNIN) {
    window.localStorage.setItem('shouldBeLoggedIn', true);
    switch (action.payload.provider) {
      case 'facebook':
        Auth.signInWithRedirect(FacebookAuth);
        break;
      case 'google':
        Auth.signInWithRedirect(GoogleAuth);
        break;
      default:
        break;
    }
  }
  next(action);
};

export {
  authMiddleware,
  emailPasswordAuthMiddleware,
  oAuthMiddleware,
};
