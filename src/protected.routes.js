import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useContext(AuthContext)
  console.log('user in routes', currentUser);
  const val = true;
  return (
    <Route
      {...rest}
      render={(props) => {
        val ? <Component {...props} /> : <Redirect to="/" />
      }}
    />
  );
};
