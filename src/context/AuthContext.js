import React, { useContext, useState, createContext, useEffect } from 'react';

import { getAuth } from 'firebase/auth';
import authApp from '../firebase';
import Login from '../screens/Login/login';

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [activeUser, setCurrentUser] = useState();
  const auth = getAuth(authApp);
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)       
        })
        return unsubscribe
    }, []);

    // console.log("auth user val", activeUser);
    const value = {
        activeUser
      }
    return (
        activeUser ? (<div>
            <AuthContext.Provider  value={value}>
                {children}
            </AuthContext.Provider>
        </div>) : <Login/>

    )
}

export default AuthProvider;
