import React, {useEffect, useState ,useContext} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import NavBar from './hooks/common/navbar';
import Login from './hooks/users/login';
import Register from './hooks/users/register';
import Home from './hooks/home';
import userContext from './context/userContext'
import Logout from './hooks/users/logout';
import Forget from './hooks/users/forgetPassword';
import Profile from './hooks/users/profile';
import AddBook from './hooks/books/admin/addBook';
import CheckToken from './hooks/common/token';
import NotFound from './hooks/notFound';
import CheckEmail from './hooks/users/checkemail';
import AssignPassword from './hooks/users/assignPas';
import ResetPassword from './hooks/common/reset';
import http from './services/http';
import EditProfileImage from './hooks/edit/profileImage';
import ViewBook from './hooks/books/client/viewBook';
import ShoppingCart from './hooks/books/client/shoppingCart';
import ViewCategory from './hooks/books/client/viewCategory';
import AddGenre from './hooks/books/admin/addGenre';
import AdminBookLists from './hooks/books/admin/booklists';
import EditBookData from './hooks/books/admin/editBookData';
import AdminViewBook from './hooks/books/admin/adminViewBook';
import EditBookImage from './hooks/books/admin/editBookImage';
export default function App(){
  const cartFromLocalStorage=JSON.parse(localStorage.getItem('cart')||"[]")
  const [user,setUser]=useState('')
  const [genres,setGenres]=useState([])
  const [books,setBooks]=useState([])
  const initialBookValues={title:'',price:'',genreId:''} 
  const [bookValues,setBookValues]=useState(initialBookValues)
  const [searchQuery,setSearchQuery]=useState('')
  const [currentPage,setCurrentPage]=useState(1)
  const [selectedGenre,setSelectedGenre]=useState(null)
  const [cart,setCart]=useState(cartFromLocalStorage)
  const pageSize=6
  const hostUrl=process.env.REACT_APP_HOST_URL
  const [loading,setLoading]=useState(true)

  //filteringby genre and search
  let filtering=books;
  if (searchQuery)
      filtering = books.filter((book) =>
        book.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtering = books.filter((i) => i.genre._id === selectedGenre._id);
      

  useEffect(()=>{
    setTimeout(() => {
      try{
        //get genres
      const getGenres=async()=>{
        // setLoading(false)
        const {data:res}=await http.get('https://book-shop-2021.herokuapp.com/genres')
        setGenres([{ _id: "", title: "All Books" },...res])
      }
      getGenres();
      //getBooks
      const getBooks=async()=>{
        const {data:res}=await http.get('https://book-shop-2021.herokuapp.com/books')
        setBooks(res)
        setLoading(false)
      }
      getBooks()
      //save items to localstorage
      localStorage.setItem('cart',JSON.stringify(cart))
      // //jwtDecode token
      const jwt=localStorage.getItem('token')
      const decode=jwtDecode(jwt)
      setUser(decode);

    }catch(ex){
      return null
    }
      
    }, 1000);

  },[cart,hostUrl])

 //add to shopping cart 
  const addToCart=(book)=>{
    let newCart=[...cart]
    let itemIncart=newCart.find(item=>book._id===item._id)
    if(itemIncart){
      itemIncart.quantity++
    }else{
      itemIncart={
        ...book,
        quantity:1
      }
      newCart.push(itemIncart)
    }
    setCart(newCart)
  }
  const deleteCartItem=(book)=>{
    let cartItems=[...cart]
    cartItems=cartItems.filter(item=>book._id!==item._id)
    setCart(cartItems)

  }
  const getCartTotal=()=>{
    return cart.reduce((sum,{quantity})=>sum + quantity,0);
  }
  const getTotalPrice=()=>{
    return cart.reduce((sum,{price,quantity})=>sum + quantity*price,0);
  }
  const handleIncrement=(book)=>{
    let newCart=[...cart]
    let itemInCart=newCart.find(item=>item._id===book._id)
    if(itemInCart){
      itemInCart.quantity++
    }
    setCart(newCart)
  }
  const handleDecrement=(book)=>{
    let newCart=[...cart]
    let itemInCart=newCart.find(item=>item._id===book._id)
    if(itemInCart){
      itemInCart.quantity--
    }
    setCart(newCart)
  }
  const clearAllCartItems=()=>{
    setCart([])
  }
  const onPageChange=(page)=>{
    setCurrentPage(page) 
  }
  const handleGenreSelect=(genre)=>{
    setSearchQuery('')
    setSelectedGenre(genre)
    setCurrentPage(1)
  }
  const handleSearch=query=>{
    setSearchQuery(query)
    setSelectedGenre(null)
    setCurrentPage(1)
  } 
  //books
  const handleEditData=book=>{
    setBookValues({title:book.title,price:book.price,genreId:book.genre._id})
  }

  return(
    <React.Fragment>
      <userContext.Provider value={{user,genres,pageSize,cart,currentPage,onPageChange,handleGenreSelect,handleSearch,searchQuery,selectedGenre,filtering,addToCart,cartFromLocalStorage,getCartTotal,getTotalPrice,deleteCartItem,handleIncrement,handleDecrement,clearAllCartItems,handleEditData,bookValues,loading}}>

      <NavBar />
      <div style={{maxWidth: "80%",margin: '0 auto',marginTop: '0px', display: 'block',paddingTop:"70px" }} >
        <Switch>
          <AdminRoute path="/books/add" ><AddBook/></AdminRoute>
          <AdminRoute path="/genre/add" ><AddGenre/></AdminRoute>
          <AdminRoute path="/books/edit/:_id" ><EditBookData/></AdminRoute>
          <AdminRoute path="/books/edit-image/:_id" ><EditBookImage/></AdminRoute>
          <AdminRoute path="/books/view/:bookTitle/:bookId" ><AdminViewBook/></AdminRoute>
          <AdminRoute path="/booklists" ><AdminBookLists/></AdminRoute>
           {/* User-Routes */}
          <PrivateRoute path="/profile/edit/image"><EditProfileImage/></PrivateRoute>
          <PrivateRoute path="/profile"><Profile/></PrivateRoute>
           {/* General-Routes */}
          <Route path="/login"><Login/></Route>
          <Route path="/cart"><ShoppingCart/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/forget"><Forget/></Route>
          <Route path="/checkemail"><CheckEmail/></Route>
          <Route path="/assign-password"><AssignPassword/></Route>
          <Route path="/users/confirm/:token"><CheckToken/></Route>
          <Route path="/users/forget/:token"><ResetPassword/></Route>
          <Route path="/books/:bookTitle/:bookId/"><ViewBook/></Route>
          <Route path="/categories/:genreTitle"><ViewCategory/></Route>
          <Route path="/logout"><Logout/></Route>
          <Route path="/" exact><Home/></Route>
          <Route path="/not-found"   ><NotFound/></Route>
          <Redirect to="/not-found"/>
         
        </Switch>
      </div>
      </userContext.Provider>
    </React.Fragment>
  )
}

const PrivateRoute=({ children, ...rest }) =>{
  const auth=localStorage.getItem('token')
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}
const AdminRoute=({ children, ...rest }) =>{
  const admin=useContext(userContext)
  let auth=admin.user
  if(auth.isAdmin===true){
    localStorage.setItem('check',true)
  }
  const checkAdmin=localStorage.getItem('check')


  return (
    <Route
      {...rest}
      render={({ location }) =>
        checkAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/not-found",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}