import React, { useState } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
import axios from 'axios'; // Importar axios

const { Content } = Layout;

export const ClientCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Cambia esto también

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // await axios.post('http://localhost:4000/api/clients', values); // Usando axios
      await axios.post('https://backend-login-logout-crud-p3.vercel.app//api/clients', values); // Usando axios
      message.success('Cliente creado con éxito');
      navigate('/client'); // Usa navigate aquí
    } catch (error) {
      console.error('Error creating client:', error);
      message.error('Error al crear el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del cliente' }]}
          >
            <Input placeholder="Nombre del cliente" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Crear Cliente
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

// export default ClientCreate;
