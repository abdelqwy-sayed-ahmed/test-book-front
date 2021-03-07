import React,{useEffect,useState,useContext} from 'react';
import { useParams,Link } from 'react-router-dom';
import http from '../../../services/http';
import userContext from './../../../context/userContext';

const AdminViewBook = () => {
  const [data,setData]=useState([])
  const hostUrl=process.env.REACT_APP_HOST_URL
  const lists=useContext(userContext)
  const handleEditData=lists.handleEditData

  const {bookId}=useParams()
  useEffect(()=>{
    async function getSingleBook(){
      const {data:res}=await http.get(hostUrl+`/books/${bookId}`)
      setData(res)
    }
    getSingleBook()
  },[bookId,hostUrl])


  return (
    <React.Fragment>
     
        {data.map(book=>(
         <div className="row mt-5" key={book._id}>
          <div className="col-md-4 mb-2" >
            <div className="text-center ">
            <img src={book.image} alt={book.title} width="250" height="250"/>
            <Link to ={`/books/edit-image/${book._id}`}>
              <i className="fa fa-pencil  text-primary" style={{position:'absolute',top:"95px" ,fontSize:"20px"}} role="button" /></Link>
            </div>
            </div>
           <div className="col-md-8 ">
             <div className="card card-body" style={{border:"white"}}>
             <Link to ={`/books/edit/${book._id}`}>
              <i className="fa fa-pencil  text-primary" style={{position:'absolute',top:"15px" ,right:"70px" ,fontSize:"20px"}} role="button" onClick={()=>handleEditData(book)}/></Link>
               <h1>{book.title}</h1>
               <h3>$ {book.price}</h3>
               <h5>{book.genre.title}</h5> 
             </div>
           </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default AdminViewBook;