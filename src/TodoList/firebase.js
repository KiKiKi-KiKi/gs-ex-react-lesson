import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../config';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
