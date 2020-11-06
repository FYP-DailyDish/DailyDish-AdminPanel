import firebase from "firebase/app";
import all from "firebase";
import "firebase/auth";
//import fire from "firebase";
// import "firebase/auth";
//import auth from "firebase";

const application = firebase.initializeApp({
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_FIREBASE__FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyBpPrfCDE4d8352ckKKoca_pQw1bbVbO-E",
  authDomain: "dailydish-adminv2.firebaseapp.com",
  databaseURL: "https://dailydish-adminv2.firebaseio.com",
  projectId: "dailydish-adminv2",
  storageBucket: "dailydish-adminv2.appspot.com",
  messagingSenderId: "740863894800",
  appId: "1:740863894800:web:60504ea1505652c267f195",
  measurementId: "G-NXYMZZYT4E",
});

export const auth = application.auth();
export const db = all.firestore();

export default application;
