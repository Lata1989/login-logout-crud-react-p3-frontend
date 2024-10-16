import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Cambia Switch y Redirect por Routes y Navigate
import { Clients } from './components/Clients/Clients';
import { ClientCreate } from './components/ClientCreate/ClientCreate';
import { ClientEdit } from './components/ClientEdit/ClientEdit';
import { useAuth0 } from '@auth0/auth0-react';
import { Spin } from 'antd';
import { AppLayout } from './components/AppLayout/AppLayout';

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  // Muestra un spinner mientras Auth0 está cargando
  if (isLoading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} />;
  }

  // Redirigir al login si el usuario no está autenticado
  if (!isAuthenticated) {
    loginWithRedirect();
    return <Spin size="large" />;
  }

  return (
    <Router>
      <AppLayout> {/* Usa AppLayout para envolver el contenido */}
        <Routes> {/* Cambia Switch por Routes */}
          <Route path="/client" element={<Clients />} /> {/* Usa element en lugar de component */}
          <Route path="/client/crear" element={<ClientCreate />} />
          <Route path="/client/:id/edit" element={<ClientEdit />} />
          <Route path="*" element={<Navigate to="/client" />} /> {/* Cambia Redirect por Navigate */}
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;




/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/