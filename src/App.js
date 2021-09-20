import React from 'react';
import './App.css';
import Login from './screens/Login/login';
import Header from './components/header/header';
import { Route, Switch } from 'react-router-dom';
import HomePage from './screens/Homepage/homepage';
import Signup from './screens/Signup/signup';
import ResetPassword from './screens/ResetPassword/ResetPassword';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/homepage" component={HomePage} />
          <Route exact path="/resetPassword" component={ResetPassword} />
        </Switch>
        <ToastContainer autoClose={2000}/>
      </AuthProvider>
    </div>
  );
}
