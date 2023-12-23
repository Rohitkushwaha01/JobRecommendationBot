import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthenticationContext/auth.context'

const PrivateRoute = ({component: Component})=>{
    const {isAuthenticated} = useContext(AuthContext);
    if(isAuthenticated){
        return <Component/>
    }    
    else{
        return <Navigate to="/login" />;
    }

}

export default PrivateRoute;
