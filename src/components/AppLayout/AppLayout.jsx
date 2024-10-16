// AppLayout.jsx

// AppLayout.jsx

import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Importa Link
import { LogoutButton } from '../LogoutButton/LogoutButton'; 

const { Header, Content } = Layout;

export const AppLayout = ({ children }) => {
  const menuItems = [
    {
      key: '1',
      label: <Link to="/">Inicio</Link>, // Enlaza a la ruta de inicio
    },
    {
      key: '2',
      label: <Link to="/client">Clientes</Link>, // Enlaza a la ruta de clientes
    }
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} /> {/* Cambia children por items */}
        <LogoutButton />
      </Header>
      <Content style={{ padding: '50px' }}>{children}</Content>
    </Layout>
  );
};


// Este codigo anda.
/*
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Importa Link
import { LogoutButton } from '../LogoutButton/LogoutButton'; 

const { Header, Content } = Layout;

export const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1">
            <Link to="/">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/client">Clientes</Link>
          </Menu.Item>
        </Menu>
        <LogoutButton />
      </Header>
      <Content style={{ padding: '50px' }}>{children}</Content>
    </Layout>
  );
};

*/

// export default AppLayout;