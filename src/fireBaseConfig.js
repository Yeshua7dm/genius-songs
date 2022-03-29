// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLUOSm-uPC5oHt7AhnZyc6fjb_8YADzCY",
  authDomain: "genius-songs.firebaseapp.com",
  projectId: "genius-songs",
  storageBucket: "genius-songs.appspot.com",
  messagingSenderId: "601134979828",
  appId: "1:601134979828:web:c51feda5eb29a62df49ca1",
  measurementId: "G-B2280DSQX4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//initialize firestore and get reference
export const db = getFirestore(app);
