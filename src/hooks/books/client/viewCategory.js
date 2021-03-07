import React,{useEffect,useState,useContext} from 'react';
import { useParams,Link } from 'react-router-dom';
import http from '../../../services/http';
import userContext from '../../../context/userContext';
const hostUrl=process.env.REACT_APP_HOST_URL
const ViewCategory = () => {
  const items=useContext(userContext)
  const searchQuery=items.searchQuery
  const [books,setBooks]=useState([])
  const [loading,setLoading]=useState(true)
 
  let filtering=books;
  if (searchQuery)
      filtering = books.filter((book) =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

  const {genreTitle}=useParams()
  useEffect(()=>{
   setTimeout(() => {
    async function getRelatedGenreItems(){
      const {data:res}=await http.get(hostUrl+`/books/genre/${genreTitle}`)
      setBooks(res)
      setLoading(false)
    }
    getRelatedGenreItems()
   }, );
  },[genreTitle])

  return (
    <React.Fragment>
      {loading&&<div className="text-center" style={{paddingTop:"100px"}}><i className="fa fa-spinner fa-pulse fa-3x ">{loading}</i></div>}
      <div className="row">
        <div className="col-md-8 mx-auto">
            <div className="row">
              {filtering.map(book=>(
                  <div className="col-md-4"key={book._id}>
                    <div className="card card-body mt-2 border-white" style={{height:"200"}} >
                    <Link to={`/books/${book.title.replace(/\s+/g, '-').toLowerCase()}/${book._id}`}>
                    <img src={book.image} alt={book.title} height="200" width="200" style={{cursor:'pointer'}} />
                   </Link>
                  </div>
                </div>
              ))}
              </div>
          
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewCategory;