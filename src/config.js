/**
 * [firebaseConfig: object containing firebase keys fetched from os env]
 * @type {Object}
 */
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};
/**
 * [facebookConfig contains the required facebook api keys fetched from os env]
 * @type {Object}
 */
export const facebookConfig = {
  facebookAppId: process.env.REACT_APP_FACEBOOK_APP_ID,
};
