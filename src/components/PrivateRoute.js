import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export const PrivateRoute = ({children, ...restoDePropiedades}) => {
    const {user} = useAuth();
    if(user){
        return <Route {...restoDePropiedades}>{children}</Route> 
    }
    else{
        return <Redirect to='/login'/>
    }
}