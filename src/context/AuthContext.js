import React, { useContext, useState, createContext, useEffect } from 'react'
import auth from '../firebase';
import { getAuth } from "firebase/auth";
import authApp from '../firebase';
import Login from '../screens/Login/login';

export const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const auth = getAuth(authApp);

    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)       
        })
        return unsubscribe
    }, []);

    console.log("auth user val", currentUser);
    return (
        currentUser ? (<div>
            <AuthContext.Provider value={{currentUser}}>
                {children}
            </AuthContext.Provider>
        </div>) : <Login/>

    )
}

export default AuthProvider;