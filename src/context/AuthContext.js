import React, { useContext, useState, createContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// import { getAuth } from 'firebase/auth';
import authApp from '../firebase';
import Login from '../screens/Login/login';

export const AuthContext = React.createContext('');
const AuthProvider = ({ children }) => {
  const [activeUser, setCurrentUser] = useState('');
  const auth = getAuth(authApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setCurrentUser(user);
        console.log('user', user);

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  const value = {
    activeUser,
  };
  return (
    <AuthContext.Provider value={{ activeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
