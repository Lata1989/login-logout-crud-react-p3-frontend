import React, { useState, useEffect } from 'react';
import { Table, Button, Layout, Space } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClients, setTotalClients] = useState(0);

  // Definición de las columnas para la tabla de clientes
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/client/${record._id}/edit`}>
            <Button type="primary">Editar</Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Función para obtener clientes con paginación
  const fetchClients = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/clients?page=${page}&limit=10`);
      console.log('Response from API:', response.data);
      setClients(response.data.clients);
      setTotalClients(response.data.totalClients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  // Cargar clientes al montar el componente y cuando cambia la página
  useEffect(() => {
    fetchClients(currentPage);
  }, [currentPage]);

  // Maneja el cambio de página
  const handleTableChange = (pagination) => {
    console.log('Pagination Change:', pagination);
    setCurrentPage(pagination.current);
  };

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Button type="primary" style={{ marginBottom: '20px' }}>
          <Link to="/client/crear">Crear Nuevo Cliente</Link>
        </Button>
        <Table
          columns={columns}
          dataSource={clients}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: totalClients,
            onChange: handleTableChange,
          }}
          rowKey="_id"
        />
      </Content>
    </Layout>
  );
};
