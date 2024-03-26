import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useGetClientsQuery } from '../../redux/api/api';

import './UsersList.css';
import { PaginationComponent } from '../pagination/Pagination';

export default function UsersList() {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetClientsQuery(page);

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
            <PaginationComponent data={data} page={page} setPage={setPage}/>
        </>
    )
}