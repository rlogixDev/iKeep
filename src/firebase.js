import { initializeApp } from 'firebase/app';
// import { getAuth,getFirestore, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJZ5X8lgrNErxR5rxeTW8QNOcJTPh4DaY",
    authDomain: "ikeep-authentication.firebaseapp.com",
    projectId: "ikeep-authentication",
    storageBucket: "ikeep-authentication.appspot.com",
    messagingSenderId: "832795327299",
    appId: "1:832795327299:web:9de52e4d31df87690e4df6"
};

const authApp = initializeApp(firebaseConfig);
export default authApp;

// const auth = getAuth(app);
// const db = getFirestore(app);

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });