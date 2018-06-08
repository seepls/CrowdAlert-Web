import * as firebase from 'firebase';
import { firebaseConfig } from '../config';

// Initiate the firebase app
firebase.initializeApp(firebaseConfig);
/**
 * [database contains a reference to firebase database]
 * @type {[type]}
 */
const database = firebase.database();
export default database;
