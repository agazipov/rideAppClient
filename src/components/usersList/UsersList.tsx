import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useGetClientsQuery } from '../../redux/api/api';

export default function UsersList() {
    const { data } = useGetClientsQuery();

    return (
        <>
            {data &&
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
                        {data.map((client, index) => (
                            <tr key={client.id}>
                                <td>{index + 1}</td>
                                <td>{client.name}</td>
                                <td>{client.phone}</td>
                                <td>{client.ride?.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>}
        </>
    )
}