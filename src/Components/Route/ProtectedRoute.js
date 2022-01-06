import React from "react";
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({isAuth: isAuth, component: Component, pathname: pathname, ...rest}) =>{
    return(
        <Route 
        {...rest} 
        render={(props)=>{
            if(isAuth){
                return <Component />
            }else{
                return <Redirect to={{pathname, state:{from:props.location}}}/>;
            }
        }}/>
    )
}

export default ProtectedRoute;