import * as firebase from 'firebase';
import { firebaseConfig } from '../config';

firebase.initializeApp(firebaseConfig);
console.log(firebase)
export const database = firebase.database();
