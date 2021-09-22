import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Main from './components/homepageComponent/Main'
import { AuthContext } from "./context/AuthContext";

 const ProtectedRoute = ({
  component: RouteComponent,
  ...rest
}) => {
  
  const activeUser = useContext(AuthContext)
  return (
    // <Route
    //   {...rest}
    //   render={(routeProps) => {
    //     activeUser.email !=='' ? <h1>Hello world</h1>:  <Redirect to={{ path: "/", state: { from: routeProps.location } }}/>
    //   }}
    // />
    activeUser ? <Main />: <Redirect to='/' />
  );
};

export default ProtectedRoute