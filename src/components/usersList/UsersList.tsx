import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { useGetClientsQuery } from '../../redux/api/api';

export default function UsersList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching } = useGetClientsQuery(page);

    if (isLoading) {
        return <div>Loading</div>
    }

    if (!data) {
        return <div>Нет клиентов</div>
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Поездки</th>
                    </tr>
                </thead>
                <tbody>
                    {data.content.map((client, index) => (
                        <tr key={client.id}>
                            <td>{index + 1}</td>
                            <td>{client.name}</td>
                            <td>{client.phone}</td>
                            <td>{client.ride?.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {Array(data.totalPages).fill(0).map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === page} onClick={() => setPage(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}