import React, { useContext, useState, createContext, useEffect } from 'react';

import { getAuth } from 'firebase/auth';
import authApp from '../firebase';
import Login from '../screens/Login/login';

export const AuthContext = React.createContext()
 const AuthProvider = ({ children }) => {
  const [activeUser, setCurrentUser] = useState({});
  const auth = getAuth(authApp);
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user)   
             
        })
    }, []);

    // console.log("auth user val", activeUser);
    return (

            <AuthContext.Provider  value={{activeUser:"helllow"}}>
                {children}
            </AuthContext.Provider>
        

    )
}

export default AuthProvider;
