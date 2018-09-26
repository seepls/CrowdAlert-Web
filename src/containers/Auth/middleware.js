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
    // Make sure we are forwarding the action & then doing the async suff
    // in the background
    next(action);

    const localStorageUserData = JSON.parse(window.localStorage.getItem('user'));

    if (localStorageUserData) {
      dispatch(updateUserAuthenticationData({
        loggedIn: true,
        user: localStorageUserData,
      }));
    }

    Auth.onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName,
          email,
          emailVerified,
          uid,
          providerData,
        } = user;
        const photoURL = user.photoURL || 'https://crowdalert.herokuapp.com/static/images/meerkat.svg';
        // Hint the app on the next load to fetch the user data
        window.localStorage.setItem('shouldBeLoggedIn', true);
        // Update the store
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
        // Save the user data in localStorage so that we can retrieve it
        // when the app loads up next
        window.localStorage.setItem('user', JSON.stringify({
          displayName,
          email,
          emailVerified,
          photoURL,
          uid,
          providerData,
        }));
        if (!emailVerified) {
          // Make sure we are not trying to authenticate on next load
          window.localStorage.setItem('shouldBeLoggedIn', false);
          history.push('/auth/confirmEmail');
        }
        // Token is used only in ajax requests
        Auth.currentUser.getIdToken().then((token) => {
          window.sessionStorage.setItem('token', token);
        });
        console.log('User Logged IN');
      } else {
        window.localStorage.setItem('shouldBeLoggedIn', false);
        window.localStorage.removeItem('user');
        window.sessionStorage.removeItem('token');
        dispatch(updateUserAuthenticationData({
          loggedIn: false,
          user: null,
        }));
        console.log('Not Logged IN');
      }
    });
    return;
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
  // Proceed to next middleware as there are no dependencies
  next(action);
  // Then manage the async stuff
  if (action.type === AUTH_LOGIN_SUBMIT_EMAIL_PASSWORD) {
    const { email, password } = action.payload;

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
      // Send a verification mail
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
        window.sessionStorage.removeItem('token');
        history.push('/login/');
      })
      .catch((err) => { console.log('Error sign out', err); });
  }
};
const oAuthMiddleware = () => next => (action) => {
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
