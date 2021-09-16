import React from 'react';
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/header';
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom';
import HomePage from './screens/Homepage/homepage';

export default function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/homepage' component={HomePage} />
=======
import { Route, Switch} from 'react-router-dom';
import HomePage from './screens/Homepage/homepage'
import Signup from './screens/Signup/signup';
export default function App() {
  return (
  
   
   
    <div className="App">
      <Header/>
      <Switch>
        <Route exact  path="/" component={Login} />
        <Route exact  path="/signup" component={Signup} />
        <Route exact  path="/homepage" component={HomePage} />
>>>>>>> 6a77ee9bbe44e0aaeb11b5ec926a97d67d3869f6
      </Switch>
    </div>
  
  
   
 
  );
}
