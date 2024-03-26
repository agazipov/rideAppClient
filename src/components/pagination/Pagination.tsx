import Pagination from 'react-bootstrap/Pagination';
import { Dispatch, SetStateAction } from 'react';

import './Pagination.css';
import { IClient, ListResponse } from '../../type/interface';

interface IPagination {
    data: ListResponse<IClient>,
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
}

export function PaginationComponent({data, page, setPage} : IPagination) {

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

    return (
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
    )
}