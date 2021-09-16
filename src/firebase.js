import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBJZ5X8lgrNErxR5rxeTW8QNOcJTPh4DaY",
    authDomain: "ikeep-authentication.firebaseapp.com",
    projectId: "ikeep-authentication",
    storageBucket: "ikeep-authentication.appspot.com",
    messagingSenderId: "832795327299",
    appId: "1:832795327299:web:9de52e4d31df87690e4df6"
});
console.log("firebase", app)

// export const auth = app.auth();
export default app