import React, { useContext, useState, createContext, useEffect } from 'react'
import auth from '../firebase';
import { getAuth } from "firebase/auth";
import authApp from '../firebase';

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const auth = getAuth(authApp);

    const value = {
        currentUser
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            console.log("auth user val", user);
        })
        return unsubscribe
    }, []);

    return (
        currentUser ? (<div>
            <AuthContext.Provider value={currentUser}>

                {children}
            </AuthContext.Provider>
        </div>) : <p>Hello</p>

    )
}

export default AuthProvider;