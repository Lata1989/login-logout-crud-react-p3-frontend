import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios

const { Content } = Layout;

export const ClientEdit = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del cliente
    const fetchClient = async () => {
      try {
        // Asegúrate de que la URL es correcta
        const response = await axios.get(`http://localhost:4000/api/clients/${id}`);
        setClient(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching client:', error);
        message.error('Error al cargar el cliente'); // Mensaje de error para el usuario
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const onFinish = async (values) => {
    try {
      // Actualizar el cliente
      // await axios.put(`http://localhost:4000/api/clients/${id}`, values);
      await axios.put(`https://backend-login-logout-crud-p3-9xw241i9t-latitargs-projects.vercel.app/api/clients/${id}`, values);
      message.success('Cliente actualizado con éxito');
      navigate('/client'); // Navegar después de la actualización
    } catch (error) {
      console.error('Error updating client:', error);
      message.error('Error al actualizar el cliente');
    }
  };

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Form onFinish={onFinish} initialValues={client} layout="vertical">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: 'Por favor ingrese el nombre del cliente' }]}
            >
              <Input placeholder="Nombre del cliente" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Actualizar Cliente
              </Button>
            </Form.Item>
          </Form>
        )}
      </Content>
    </Layout>
  );
};


// export default ClientEdit;
