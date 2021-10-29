import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
require('firebase/database');
var firebaseConfig = {
  apiKey: "AIzaSyCL_EcHteL2Fjfj2sm2jN2j7f1bQTjmloc",
  authDomain: "rvision-fd77e.firebaseapp.com",
  projectId: "rvision-fd77e",
  storageBucket: "rvision-fd77e.appspot.com",
  messagingSenderId: "472792518606",
  appId: "1:472792518606:web:7de4799c5f4ac5a53e259f",
  measurementId: "G-DQR2GHM278"
};
  // Initialize Firebase
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;