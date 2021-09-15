import React, { Suspense } from 'react';
import { Route } from 'react-router';
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/header';
import { Switch} from 'react-router-dom';
import Signup from './screens/Signup/signup';
const SignupComponent = React.lazy(() => import ('./screens/Signup/signup'));

export default function App() {
  return (
  
   
   
    <div className="App">
      <Header/>
      <Switch>
        <Route exact  path="/" component={Login} />
        <Route exact  path="/signup" component={Signup} />
      </Switch>
    </div>
  
  
   
 
  );
}

