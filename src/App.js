import React from 'react';
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/Header';
import { Route, Switch } from 'react-router-dom';
import HomePage from './screens/Homepage/homepage';
import Signup from './screens/Signup/signup';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from './protected.routes';
import  AuthProvider  from './context/AuthContext';

export default function App() {
  return (
<AuthProvider>
     
    
      <Header />
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={Signup} />
        {/* <Route exact path='/homepage' component={HomePage} /> */}
        <ProtectedRoute exact path='/homepage' component={HomePage} />
    
      <ToastContainer autoClose={5000} />
   </AuthProvider>
    
  );
}
