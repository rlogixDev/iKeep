import React, { useContext, useState, useEffect } from 'react'
import auth from '../firebase';
// const auth = app.auth();

export const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false)

    function login(email, password) {
        console.log('details', email, password)
        return auth.signInWithEmailAndPassword(email, password)
    }

    const value = {
        currentUser,
        login
    }

    // useEffect(() => {
    //     app.auth().onAuthStateChanged(user => {
    //       setCurrentUser(user)
    //       setLoading(false)
    //     })
    //   }, [])

    return (
        <div>
            <AuthContext.Provider value={value}>
            {children}
            </AuthContext.Provider>
        </div>
    )
}

