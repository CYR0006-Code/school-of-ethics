// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdTgzmL3CDn3hYXV2rlCfCmeo_0ax7xOg",
  authDomain: "schoolofethics-73280.firebaseapp.com",
  projectId: "schoolofethics-73280",
  storageBucket: "schoolofethics-73280.firebasestorage.app",
  messagingSenderId: "284611730896",
  appId: "1:284611730896:web:23ae77821b3c230079edd5",
  measurementId: "G-057RNXS2HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);