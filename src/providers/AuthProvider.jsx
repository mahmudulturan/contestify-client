import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../config/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googleProviders = new GoogleAuthProvider();
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProviders)
    }
    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUsersProfile = (name, image) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, { displayName: name, photoURL:image})
    }
    const logOut = () =>{
        setLoading(true)
        return signOut()
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('fromobserver', currentUser);
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
           return unsubscribe()
        }
    },[])
    
    const authUser = {
        user,
        loading,
        createUser,
        googleLogin,
        loginUser,
        updateUsersProfile,
        logOut,
        setLoading
    }
  return (
   <AuthContext.Provider value={authUser}>
    {children}
   </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;