import 'antd/dist/reset.css'; // O usa el tema personalizado si es necesario
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa de react-dom/client para React 18
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// Variables de entorno para Auth0
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// Crear root usando createRoot para React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin, // Cambiado para evitar advertencias de deprecación
    }}
  >
    <App />
  </Auth0Provider>
);


/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
