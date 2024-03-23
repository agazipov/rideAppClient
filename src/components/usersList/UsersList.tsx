import { Dispatch, SetStateAction, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useGetClientsQuery } from '../../redux/api/api';

import './UsersList.css';

export default function UsersList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching } = useGetClientsQuery(page);

    function paginationCreate(
        currentPage: number,
        totalPage: number,
        active: number,
        handleClick: Dispatch<SetStateAction<number>>,
    ): JSX.Element[] {

        let startPage, endPage;
        let items = [];

        if (totalPage <= 5) {
            startPage = 1;
            endPage = totalPage;
        } else {
            startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
            endPage = currentPage + 2 < totalPage ? currentPage + 2 : totalPage;
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => handleClick(number)}>
                    {number}
                </Pagination.Item>,
            );
        }

        return items;
    };

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
            <div className='usersList__pagination'>
                <Pagination>
                    <Pagination.First onClick={() => setPage(1)} />

                    <Pagination.Prev onClick={() => setPage(current => current - 1)} disabled={!data.prevPage} />

                    {paginationCreate(data.page, data.totalPages, page, setPage)}

                    {data.totalPages > 5 && <Pagination.Ellipsis onClick={() => { }} />}

                    <Pagination.Next onClick={() => setPage(current => current + 1)} disabled={!data.nextPage} />

                    <Pagination.Last onClick={() => setPage(data.totalPages)} />
                </Pagination>
            </div>
        </>
    )
}