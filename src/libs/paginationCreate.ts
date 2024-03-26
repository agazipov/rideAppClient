export function paginationCreate(
    currentPage: number,
    totalPage: number,
): number[] {

    let startPage, endPage, items = [];

    if (totalPage <= 5) {
        startPage = 1;
        endPage = totalPage;
    } else {
        startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
        endPage = currentPage + 2 < totalPage ? currentPage + 2 : totalPage;
    }

    for (let number = startPage; number <= endPage; number++) {
        items.push(number);
    }

    return items;
};