import React ,{useContext,useState} from 'react';
import GenreList from '../client/genreList';
import Pagination, {Paginate} from './../../common/paginate';
import userContext from './../../../context/userContext';
import { Link } from 'react-router-dom';
import http from '../../../services/http';

const AdminBookLists = () => {
  const [servMessage,setServMessage]=useState('')
  const lists=useContext(userContext)
  const pageSize=lists.pageSize
  const loading=lists.loading
  const currentPage=lists.currentPage
  const filtering=lists.filtering
  const booksPerPage=Paginate(filtering,currentPage,pageSize)
  const hostUrl=process.env.REACT_APP_HOST_URL

  const handledeleteBook=async(book)=>{
    if(window.confirm('Are you sure to delete this book ?')){
      const bookId=book._id
      const res=await http.delete(hostUrl+`/books/${bookId}`)
      if(res&&res.status===200){
        setServMessage(res.data)
        setTimeout(()=>{
          window.location="/booklists"
        },2000)
      }
    }else{
      return null
    }
  }
  if(loading===true)return(
    <div className="text-center" style={{paddingTop:"100px",paddingRight:"25px"}}><i className="fa fa-spinner fa-pulse fa-3x "></i></div>
  )
  return (
    <React.Fragment>
      <div className="row mt-5 mb-2">
        <div className="col-md-3">
          <GenreList/>
        </div>
          {servMessage&&<div className="alert alert-danger">{servMessage}</div>}
        {booksPerPage.length===0 &&<h3 className="text-center text-danger" >Sorry No much Results found </h3>}
        <div className="col-md-9 text-center">
          <div className="row ">
            {booksPerPage.map(book=>(
            <div className="col-md-4 " key={book._id}>
              <div className="card mt-2 "style={{width:"250px"}} >
                <div className="card-img-top text-center"  >
                  <img src={hostUrl+`/${book.image}`} alt={book.title} width="248px" height="200px" />
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item">{book.title}</li>
                  <li className="list-group-item">$ {book.price}</li>
                  </ul>
                </div>
                <div className="card-footer ">
                  <Link to={`/books/view/${book.title.replace(/\s+/g, '-').toLowerCase()}/${book._id}`} className="btn btn-primary btn-sm m-2">View Book</Link>
                  <button className="btn btn-danger btn-sm" onClick={()=>handledeleteBook(book)}>Delete Book</button>
                </div>
              </div>
            </div>
          ))}
          </div>
          <Pagination/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminBookLists;