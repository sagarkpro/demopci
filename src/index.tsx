import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/mdc-dark-deeppurple/theme.css';
//import 'primereact/resources/themes/vela-purple/theme.css';
//import 'primereact/resources/themes/arya-purple/theme.css';
import '/node_modules/primeflex/primeflex.css'
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing></Routing>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
