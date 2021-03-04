import React,{useContext} from 'react';
import Pagination from './common/paginate';
import GenreList from './books/client/genreList';
import BookList from './books/client/bookList';
import userContext from './../context/userContext';

export default function Home(){
  const lists=useContext(userContext)
  const loading=lists.loading
  if(loading===true)return(
    <div className="text-center" style={{paddingTop:"100px",paddingRight:"25px"}}><i className="fa fa-spinner fa-pulse fa-3x "></i></div>
  )
  return(
    <React.Fragment>
      <div className="row mt-4">
        <div className="col-md-4">
          <GenreList/>
        </div>
        <div className="col-md-8 mt-4 text-center mb-5">
          <BookList/>  
        <div className="mt-5">
          <Pagination/>
        </div>
        </div>
      </div>
    </React.Fragment>
  )
}