import React, { Suspense } from 'react';
import { Route } from 'react-router';
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/header';
import { Switch} from 'react-router-dom';

const SignupComponent = React.lazy(() => import ('./screens/Signup/signup'));

export default function App() {
  return (
  
   
   
    <div className="App">
    <Header/>
    <Suspense fallback={<div>Loading...</div>}>
      <Route path="/signup" component={SignupComponent}/>
      </Suspense>
     
     
    
        <Route exact  path="/login" component={Login} />
     
      {/* <Login/> */}
    </div>
  
  
   
 
  );
}

