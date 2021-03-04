import React, { useContext } from 'react';
import userContext from '../../context/userContext';
import _ from 'lodash';
export default function Pagination(){
 
  //imported props with contextPI
  const items=useContext(userContext)
  const filtering=items.filtering
  const booksCount=filtering.length
  const pageSize=items.pageSize
  const currentPage=items.currentPage
  const onPageChange=items.onPageChange

  const pagesCount=Math.ceil(booksCount/pageSize)

  //lodash
  if(pagesCount===1) return null;

  const pages=_.range(1,pagesCount+1)

  return(
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page=>(
            <li key={page}
            className={page===currentPage?"page-item active": "page-item"}><button className="page-link" onClick={()=>onPageChange(page)}>{page}</button></li>
          ))}
          

        </ul>
      </nav>
    </React.Fragment>
  )
}

export function Paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
