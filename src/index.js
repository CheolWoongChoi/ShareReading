import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';   //React-Alert (Alert 창)
import App from './App';

//로그인 화면과 회원가입 화면에 나타나는 Alert 창의 CSS
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
