import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import 'babel-polyfill';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

const options = {
  type: 'error',
  position: 'top center',
  timeout: 3000,
  offset: '250px',
  transition: 'scale'
}

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>, 
  document.getElementById('root')
);
