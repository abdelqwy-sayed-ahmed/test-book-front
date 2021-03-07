import React,{ useContext, useEffect, useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import http from '../../../services/http';
import userContext from '../../../context/userContext';
export default function ViewBook() {
  const [book,setBook]=useState([])
  const hostUrl=process.env.REACT_APP_HOST_URL
  let cart=useContext(userContext)
  let addToCart=cart.addToCart
  const {bookId}=useParams()
  useEffect(()=>{
    async function getSingleBook(){
      const {data:res}=await http.get(hostUrl+`/books/${bookId}`)
      setBook(res)
    }
    getSingleBook()
  },[bookId,hostUrl])

 
 
  return (
    <React.Fragment>
     
        {book.map(book=>(
         <div className="row mt-4" key={book._id}>
          <div className="col-md-4 mb-2" >
            <div className="text-center ">
            <img src={book.image} alt={book.title} width="250" height="250"/>
            </div>
            </div>
           <div className="col-md-8 ">
             <div className="">
               <h1>{book.title}</h1>
              <h3>$ {book.price}</h3>
                <Link to={`/categories/${book.genre.title}`}> <h5>{book.genre.title}</h5> </Link>

                  <button className="btn btn-primary m-2" onClick={()=>addToCart(book)}><i className="fa fa-shopping-cart"></i> Add to Cart</button>
             </div>
           </div>
        </div>
      ))}
    </React.Fragment>
  );
};
