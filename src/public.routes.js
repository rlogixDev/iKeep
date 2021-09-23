import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./screens/Login/login";

 const PublicRoute = ({
  component: RouteComponent,
  ...rest
}) => {
  
  const activeUser = useContext(AuthContext);
//   if(activeUser)
  //  let activeRouteFlag = activeUser.activeUser.uid.length >=1
  console.log('user in private routes',activeUser.activeUser.uid?.length <0)
  return (

    activeUser.activeUser.uid?.length <= 0 ? <Redirect to='/homepage' /> :<RouteComponent/>
  );
};

export default PublicRoute