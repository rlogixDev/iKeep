import React, { useContext, useState, createContext, useEffect} from 'react'
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
        })
        return unsubscribe
    }, []);

    return (
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

