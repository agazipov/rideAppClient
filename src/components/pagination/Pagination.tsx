import Pagination from 'react-bootstrap/Pagination';
import { Dispatch, SetStateAction } from 'react';
import { IClient, ListResponse } from '../../type/interface';
import { paginationCreate } from '../../libs/paginationCreate';

import './Pagination.css';

interface IPagination {
    data: ListResponse<IClient>,
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
}

export function PaginationComponent({ data, page, setPage }: IPagination) {
    return (
        <div className='usersList__pagination'>
            <Pagination>
                <Pagination.First onClick={() => setPage(1)} />

                <Pagination.Prev onClick={() => setPage(current => current - 1)} disabled={!data.prevPage} />

                {paginationCreate(data.page, data.totalPages).map((number) => {
                    return (
                        <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
                            {number}
                        </Pagination.Item>
                    )
                })}

                {data.totalPages > 5 && <Pagination.Ellipsis onClick={() => { }} />}

                <Pagination.Next onClick={() => setPage(current => current + 1)} disabled={!data.nextPage} />

                <Pagination.Last onClick={() => setPage(data.totalPages)} />
            </Pagination>
        </div>
    )
}