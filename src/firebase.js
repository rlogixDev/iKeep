import { initializeApp } from 'firebase/app';
// import { getAuth,getFirestore, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBPuoiq8GlTWZzp_VxZXFgZezWNo_NMsE",
    authDomain: "react-project-1443c.firebaseapp.com",
    projectId: "react-project-1443c",
    storageBucket: "react-project-1443c.appspot.com",
    messagingSenderId: "401616856383",
    appId: "1:401616856383:web:2c9da16e4e0bb8bc099f8a",
    measurementId: "G-9SNYE0QB54"
  };

const authApp = initializeApp(firebaseConfig);
export default authApp;
