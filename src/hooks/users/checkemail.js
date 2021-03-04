import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import http from '../../services/http';

//schema
const schema = yup.object().shape({
  email: yup.string().required().email(),
});

export default function CheckEmail() {

  const[loading,setLoading]=useState(false)
  const[success,setSuccess]=useState(false)
  const {register,handleSubmit,errors}=useForm({resolver:yupResolver(schema)});
  const [errserver,setErrServer]=useState('')
  const hostUrl='https://book-shop-2021.herokuapp.com'

  //handleSubmit
  const onSubmit=async(data)=>{
    try{ 
      setLoading(true)
     const response= await http.post(hostUrl+'/users/token',data)
     if(response&&response.status===200){
      setSuccess(response.data)
      setTimeout(() => {
        window.location="/login"
      }, 2000);
    }
    }catch(ex){
      setLoading(false)
      if(ex.response&&ex.response.status===400){
        setErrServer(ex.response.data)
      }
    }
  }

  return (
    <div className="row mt-5">
      <div className="col-md-6 mx-auto">
        <div className="card card-body">
          {errserver&&<div className="alert alert-danger">{errserver}</div>}
          {success&&<div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <h5 className="text-center">Enter Your Valid Email to send new Email Verification</h5>
            <input type="text" name="email" ref={register}
            placeholder="Enter your valid email" className="form-control"
             />
             <p className="text-danger">{errors.email?.message}</p>
            
             <button className="btn btn-primary " disabled={loading}>{loading&&<i className="fa fa-refresh fa-spin"></i>}Send</button>

          </form>
        </div>
      </div>
    
    </div>
  );
  
}