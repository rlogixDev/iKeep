import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  
  const activeUser = useContext(AuthContext)
  if (activeUser.value.activeUser !== '') {

    const activeid = activeUser.value.activeUser.email
}
  console.log('User present in routes', activeUser, activeUser.email !=='');
  return (
    <Route
      {...rest}
      render={(props) => {
        activeUser.email !=='' ? <Component {...props} /> :  <Redirect to={{ path: "/", state: { from: props.location } }}/>
      }}
    />
  );
};
