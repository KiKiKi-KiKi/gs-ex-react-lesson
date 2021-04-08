import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from '../config';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

// Server timestamp
// cf. https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja#server_timestamp
export const createAtTimestamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

// Convert firestore.Timestamp
export const timestamp = (datetimeStr) => {
  return firebase.firestore.Timestamp.fromDate(new Date(datetimeStr));
};
