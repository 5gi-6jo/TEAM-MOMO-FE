// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getMessaging } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDotjET2LCSTEOzuqLMRTbklh4UK3NXyZ8',
  authDomain: 'momo-cbc21.firebaseapp.com',
  projectId: 'momo-cbc21',
  storageBucket: 'momo-cbc21.appspot.com',
  messagingSenderId: '680572525834',
  appId: '1:680572525834:web:27670f661e197779556ef3',
  measurementId: 'G-CXWX95R14M',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = getMessaging();

export { messaging };
