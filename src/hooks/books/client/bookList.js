
import React,{useContext} from 'react';
import userContext from '../../../context/userContext';
import { Link } from 'react-router-dom';
import  { Paginate } from '../../common/paginate';
const hostUrl=process.env.REACT_APP_HOST_URL
const BookList = () => {
  const lists=useContext(userContext)
  const pageSize=lists.pageSize
  const currentPage=lists.currentPage
  const filtering=lists.filtering
  const booksPerPage=Paginate(filtering,currentPage,pageSize)
 
 

  return (
    <React.Fragment>
      {booksPerPage.length===0&&<h3 className='text-center text-danger'>Sorry no much results found</h3>}
      <div className="row text-center">
        {booksPerPage.map(book=>(
          <div className="col-md-4"key={book._id}>
            <div className="card card-body mt-2 border-white" style={{height:"250"}} >
              <Link to={`/books/${book.title.replace(/\s+/g, '-').toLowerCase()}/${book._id}`}>
              <img src={hostUrl+`/${book.image}`} alt={book.title} height="200" width="200" style={{cursor:'pointer'}} />
              </Link>
            </div>
          </div>
        ))}
        
        
    </div>
    {/* {booksPerPage.length===0&&<h3 className='text-center text-danger'>Sorry no much results found</h3>} */}
      
    </React.Fragment>
  )
  // if(booksPerPage.length===0)return(<React.Fragment>
  //   <h3 className="text-danger text-center mt-4">Sorry no results found...</h3>
   
  // </React.Fragment>)
  
};

export default BookList;