import React, {useState, useEffect, useContext} from 'react';
import {auth} from '../firebase/firebaseConfig';

//we create the context
const AuthContext = React.createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(true);
    const [loading, setLoading] = useState(true);

    //we check only once if there is a session active.
    useEffect(()=>{
        //we check once if there is user
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false); 
        })
    }, [])

    return(
        <AuthContext.Provider value={{user}}>
          {!loading && children}  
        </AuthContext.Provider>
    )

}

export {AuthProvider, useAuth}