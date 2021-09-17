import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
