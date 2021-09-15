import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './screens/Homepage/homepage';
import { Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Route exact path='/' render={() => <Homepage />} />
    </div>
  );
}
