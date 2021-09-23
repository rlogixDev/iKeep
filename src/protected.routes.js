import React, { useContext, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "./components/homepageComponent/Main";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const activeUser = useContext(AuthContext);
  // const [activeUserFlag, setActiveUserFlag] = useState(false);

  // console.log("user in protected routes", activeUser.activeUser);
  // if (activeUser.activeUser !== null) {
  //       setActiveUserFlag(true) 
  // }

 
  return (
    // <Route
    //   {...rest}
    //   render={props=> {
    //     activeUser.activeUser.uid?.length >=1? <RouteComponent {...rest} {...props} />:  <Redirect to={{ pathname: "/", state: { from: props.location } }}/>
    //   }}
    // />

    activeUser.activeUser.uid?.length >0? <RouteComponent /> : <Redirect to="/" />
  );
};

export default ProtectedRoute;
