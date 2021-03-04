import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import http from '../../services/http';

export default function CheckToken(){
  const [message,setMessage]=useState('')
  const [serverError,setServerError]=useState('')
  const hostUrl='https://book-shop-2021.herokuapp.com'
  const{token}=useParams()
  useEffect(()=>{
    async function getToken(){
    try{
        const response=await http.get(hostUrl+`/users/confirm/${token}`)
        if(response&&response.status===200){
          setMessage(response.data)
          setTimeout(()=>window.location='/login',4000)
        }
      }catch(ex){
        if(ex.response &&ex.response.status===401){
          setServerError(ex.response.data)
          setTimeout(()=>window.location='/checkemail',5000)
        }
        if (ex.response && ex.response.status===400){
          setServerError(ex.response.data)
          setTimeout(()=>window.location='/login',4000)
        }  
      }
    }
    getToken()
  },[token,hostUrl])

  return(
    <React.Fragment>
      <div className="mt-2">
        <div>
          {serverError&&<div className="alert alert-danger">{serverError}</div>}
        </div>
        <div>
          {message&&<div className="alert alert-success">{message}</div>}
        </div>
      </div>
    </React.Fragment>
  )
}