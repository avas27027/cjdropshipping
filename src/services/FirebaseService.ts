// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWdbQNeke2U9XrnJ4tR7vBGMPnMfSM0qM",
  authDomain: "cjdrop-b1fac.firebaseapp.com",
  databaseURL: "https://cjdrop-b1fac-default-rtdb.firebaseio.com",
  projectId: "cjdrop-b1fac",
  storageBucket: "cjdrop-b1fac.appspot.com",
  messagingSenderId: "756709718829",
  appId: "1:756709718829:web:3837c5ed3a2fa51ad731a4",
  measurementId: "G-GN547JYMP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);