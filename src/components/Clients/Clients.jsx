import React, { useState, useEffect } from 'react';
import { Table, Button, Layout, Space } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Content } = Layout;

export const Clients = () => {
  const [clients, setClients] = useState([]); // Estado para los clientes
  const [loading, setLoading] = useState(true); // Estado para mostrar el loading
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [totalClients, setTotalClients] = useState(0); // Estado para el total de clientes
  const [totalPages, setTotalPages] = useState(0); // Estado para el total de páginas

  // Función para obtener clientes con paginación
  const fetchClients = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/clients?page=${page}&limit=10`);
      console.log('API Response:', response.data); // Para depuración

      setClients(response.data.clients);
      setTotalClients(response.data.totalClients);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar clientes al montar el componente y cuando cambia la página
  useEffect(() => {
    console.log("Página actual: ", currentPage); // Muestra la página actual en el log
    fetchClients(currentPage); // Llama a fetchClients al cargar el componente o cambiar de página
  }, [currentPage]); // Vuelve a cargar los clientes si cambia la página

  // Maneja el cambio de página
  const handleTableChange = (pagination) => {
    const newPage = pagination.current || 1;
    console.log('Nueva página:', newPage);

    setCurrentPage(newPage);

    // Verifica si el componente se re-renderiza
    console.log('Componente re-renderizado:', currentPage);

    // Agregar un console.log para verificar los datos recibidos de la API
    fetchClients(newPage)
      .then(response => {
        console.log('Datos recibidos:', response.data);

        // Verificar si la respuesta tiene la estructura esperada
        if (response.data && response.data.clients) {
          setClients(response.data.clients);
          setTotalClients(response.data.totalClients);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Error: Respuesta de la API no tiene la estructura esperada');
        }
      })
      .catch(error => {
        console.error('Error al obtener clientes:', error);
      });
  };


  // Definición de las columnas para la tabla de clientes
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id', // Asegúrate de usar '_id' como clave
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
            current: currentPage, // Página actual
            pageSize: 10, // Tamaño de página
            total: totalClients, // Total de clientes
            onChange: handleTableChange, // Función para manejar el cambio de página
          }}
          rowKey="_id" // Clave única para cada fila
        />
      </Content>
    </Layout>
  );
};
