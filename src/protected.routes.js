import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const { activeUser } = useContext(AuthContext)
  console.log('User present in routes',  activeUser.email !=='');
  const val = true;
  return (
    <Route
      {...rest}
      render={(props) => {
        activeUser.email !=='' ? <Component {...props} /> : <Redirect to="/" />
      }}
    />
  );
};
