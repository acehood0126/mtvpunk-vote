import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Pagination = function({
    page,
    pages,
    onChange,
    className=''
}) {

    const [arrPages, setArrPages] = useState([])
    
    const handleChangePage = (idx) => {
        idx = idx < 1 ? 1 : (idx > pages ? pages : idx)
        if(idx === page) return;
        if(onChange) onChange(idx)
    }

    useEffect(() => {
        if( pages <= 7 ) {
            setArrPages(Array.from({length: pages}, (_, i) => i + 1))
        } else {
            let arrNewPages = [];
            arrNewPages.push(1)

            if(page > 3)
                arrNewPages.push(0)

            if(page > 2)
                arrNewPages.push(page - 1)

            if(page !== 1 && page !== pages)
                arrNewPages.push(page)

            if(page < pages - 1)
                arrNewPages.push(page + 1)
            
            if(page < pages - 2)
                arrNewPages.push(0)
            
            arrNewPages.push(pages)

            setArrPages(arrNewPages)
        }
    }, [page, pages])

    return (
        <div className={`co-pagination d-flex align-items-center ${className} ${pages === 0 ? 'd-none' : ''}`}>
            <div className="co-pagination-page" onClick={() => handleChangePage(page - 1)}>
                <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 1L2 9.5L10 18" stroke="white" strokeWidth="2"/>
                </svg>
            </div>
            {arrPages.map((val, idx) => {
                if(val === 0) {
                    return (
                        <div className="co-pagination-page" key={`pagination-sep-${idx}`}>
                            ...
                        </div>
                    )
                }
                return (  
                    <div 
                        className={`co-pagination-page ${val === page ? 'current' : ''}`} 
                        onClick={() => handleChangePage(val)}
                        key={`pagination-${val}`}
                    >
                        {val}
                    </div>
                )
            })}
            <div className="co-pagination-page" onClick={() => handleChangePage(page + 1)}>
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L9 9L1 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>       
        </div>
    );
}

export default Pagination;
