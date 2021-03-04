
import React, { useContext } from 'react';
import userContext from '../../../context/userContext';

export default function ShoppingCart(){
  const list=useContext(userContext)
  const cart=list.cart
  const books=list.cartFromLocalStorage
  const getTotalPrice=list.getTotalPrice
  const deleteCartItem=list.deleteCartItem
  const handleIncrement=list.handleIncrement
  const handleDecrement=list.handleDecrement
  const clearAllCartItems=list.clearAllCartItems
  const hostUrl='https://book-shop-2021.herokuapp.com'

  return(
    <React.Fragment>

     <div className="row">
       <div className="col-md-8 mx-auto">
       <table className="table mt-4">
      <thead className="text-center">
        <tr>
          <th scope="col">Item</th>
          <th scope="col"> </th>
          <th scope="col">Qty</th>
          <th scope="col">price</th>
          <th scope="col"> </th>
        </tr>
      </thead>
      <tbody className="text-center">
        {books.map(book=>(
          <tr className="align-middle" key={book._id}>
          <th ><img src={hostUrl+`/${book.image}`} alt={book.title} width="100" height="100"/></th>
          <td ><h5>{book.title}</h5></td>
          {/* <td><input type="number" min={1}  defaultValue={book.quantity }onChange={(e)=>setQuantity(book,parseInt(e.target.value))} style={{cursor:'pointer'}} /></td> */}
          
            <td>
            <div className="d-flex align-items-center ">
            <button className="btn btn-primary btn-sm" onClick={()=>handleDecrement(book)} disabled={book.quantity===1}>-</button>
            <span className="badge text-secondary " style={{fontSize:"18px"}}>{book.quantity}</span>
            <button className="btn btn-primary btn-sm" onClick={()=>handleIncrement(book)}>+</button>
            </div>
            </td>
          
          
          <td>{book.price}</td>
          <td><button className="btn btn-danger" onClick={()=>deleteCartItem(book)}><i className="fa fa-trash"></i></button></td>
        </tr>
        ))}
        <tr>
          <td></td>
          <td><h4 className="text-primary">Total Price ${getTotalPrice()}</h4> </td>
          {/* <td></td> */}
          <td>{cart.length>=1 &&(<button className="btn btn-danger btn-sm"onClick={clearAllCartItems}>Empty Cart </button>)}</td>

        </tr>
      </tbody>
    </table>
       </div>
     </div>
    </React.Fragment>
  )
}