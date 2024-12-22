import React, { useState, useEffect, useMemo } from 'react';

function Pagination({ filter, onPageChange }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    // Memoized calculation of current records for the current page
    const currentRecords = useMemo(() => {
        const lastIndex = currentPage * recordsPerPage;
        const firstIndex = lastIndex - recordsPerPage;
        return filter.slice(firstIndex, lastIndex);
    }, [filter, currentPage]);

    // Update parent with paginated records only when `currentRecords` changes
    useEffect(() => {
        onPageChange(currentRecords);
    }, [currentRecords]); // Dependency on only `currentRecords` ensures stable behavior

    const totalPages = Math.ceil(filter.length / recordsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const prePage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const changePage = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <ul className="pagination">
                <li className={`page_item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page_link" onClick={prePage} disabled={currentPage === 1}>
                        Prev
                    </button>
                </li>
                {pageNumbers.map((n) => (
                    <li key={n} className={`page_item ${currentPage === n ? 'active' : ''}`}>
                        <button className="page_link" onClick={() => changePage(n)}>
                            {n}
                        </button>
                    </li>
                ))}
                <li className={`page_item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page_link" onClick={nextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;


