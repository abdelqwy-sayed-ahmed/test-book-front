import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
//schema
const schema = yup.object().shape({
  email: yup.string().required().email(),
});

export default function Forget(){
  const[loading,setLoading]=useState(false)

  const {register,handleSubmit,errors}=useForm({resolver:yupResolver(schema)})
  const [success,setSuccess]=useState('');
  const [errmessage,setErrMessage]=useState('');
  const hostUrl='https://book-shop-2021.herokuapp.com'

   

  const onSubmit=async(data)=>{
    try{
      setLoading(true)
      const response= await axios.post(hostUrl+'/users/forget',data)
    if(response&&response.status===200){
      setSuccess(response.data)
      setLoading(false)
      // setTimeout(() => {
      //   window.location="/login"
      // }, 2000);
    }
    }catch(ex){
      setLoading(false)
      if(ex.response&&ex.response.status===400){
        setErrMessage(ex.response.data)
      }
    }
  }
  return (
    <div className="row mt-5">
      <div className="col-md-6 mx-auto">
        <div className="card card-body">
          {success&&<div className="alert alert-success">{success}</div>}
          {errmessage&&<div className="alert alert-danger">{errmessage}</div>}
          <h2 className="text-center text-primary">Forget Password</h2>
          <h6 className="mt-3 text-center">Please enter your valid Email then you will receive anew mail click on the link on it to rest your password</h6>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="email" ref={register}
            placeholder="Enter your valid email" className="form-control mt-4"
             />
             <p className="text-danger">{errors.email?.message}</p>
            
             <button className="btn btn-primary" disabled={loading}>{loading&&<i className="fa fa-refresh fa-spin"></i>} Submit</button>

          </form>
        </div>
      </div>
    
    </div>
  );
};

