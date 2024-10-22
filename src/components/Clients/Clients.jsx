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
    const [pageSize] = useState(10); // Tamaño de página

    // Función para obtener clientes con paginación
    const fetchClients = async (page) => {
        setLoading(true);
        try {
            console.log('Llamando a la API con page:', page); // Para depurar
            // const response = await axios.get(`http://localhost:4000/api/clients?page=${page}&limit=${pageSize}`);
            const response = await axios.get(`https://backend-login-logout-crud-p3.vercel.app/api/clients?page=${page}&limit=${pageSize}`);
            console.log('API Response:', response.data); // Para depuración

            const { data: clients, total } = response.data; // Cambia la destructuración según tu respuesta
            setClients(clients); // Actualiza la lista de clientes
            setTotalClients(total); // Actualiza el total de clientes
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar clientes al montar el componente
    useEffect(() => {
        fetchClients(currentPage); // Llama a fetchClients al cargar el componente
    }, [currentPage]); // Solo se ejecuta cuando currentPage cambia

    // Maneja el cambio de página
    const handleTableChange = (pagination) => {
        const newPage = pagination; // Obtén la nueva página
        console.log('Nueva página (handleTableChange):', newPage); // Muestra la nueva página

        if (newPage) { // Verifica que newPage no sea undefined
            setCurrentPage(newPage); // Actualiza la página actual
            fetchClients(newPage); // Llama a fetchClients con la nueva página
        }
    };

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
                        pageSize: pageSize, // Tamaño de página
                        total: totalClients, // Total de clientes
                        onChange: handleTableChange, // Función para manejar el cambio de página
                    }}
                    rowKey="_id" // Clave única para cada fila
                />
            </Content>
        </Layout>
    );
};
