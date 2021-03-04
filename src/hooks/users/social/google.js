import React from 'react';
import {useGoogleLogin} from 'react-google-login'
import http from '../../../services/http';
import { useLocation } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
//google client Id
const hostUrl='https://book-shop-2021.herokuapp.com'


const hostUrl=process.env.REACT_APP_HOST_URL
const Google = () => {
  const location=useLocation()
   //google login
   const onSuccess=async data=>{
    const {data:jwt} = await http.post(hostUrl+'/users/google',{tokenId:data.tokenId})
    localStorage.setItem('token',jwt)
    const uid=jwtDecode(jwt)
    localStorage.setItem("uId",uid._id)
    const {state}=location
    window.location=state?state.from.pathname:"/"
}
const onFailure=res=>{
  console.log('login failed:res:',res);
}
const cookiePolicy='single_host_origin'
const {signIn}=useGoogleLogin({
  onSuccess,
  onFailure,
  clientId,
  cookiePolicy
  
})
  return (
    <div>
      <button className="btn btn-light" onClick={signIn}><span><i className="fa fa-google"></i> Login with google account</span></button>
      
    </div>
  );
};

export default Google;

