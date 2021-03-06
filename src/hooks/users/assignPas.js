import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import http from '../../services/http';

//schema
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  password2: yup.string().required().min(6)
});

export default function AssignPassword() {
  const {register,handleSubmit,errors}=useForm({resolver:yupResolver(schema)});
  const [errserver,setErrServer]=useState('')
  const [success,setSuccess]=useState('')
  const hostUrl=process.env.REACT_APP_HOST_URL


  //handleSubmit
  const onSubmit=async(data)=>{
    try{ 
     const response= await http.post(hostUrl+'/users/assign',data)
     if(response&&response.status===200){
       setSuccess(response.data)
       setTimeout(()=>window.location='/login',4000)

     }
    }catch(ex){
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
          <h2 className="text-center text-primary">Re-assign Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          
            
            <input type="text" name="email" ref={register}
            placeholder="Enter your email again" className="form-control"
             />
             <p className="text-danger">{errors.email?.message}</p>
            <input type="password" name="password" ref={register}
            placeholder="Enter Password" className="form-control"
             />
             <p className="text-danger">{errors.password?.message}</p>
            <input type="password" name="password2" ref={register}
            placeholder="Re-enter Password" className="form-control"
             />
             <p className="text-danger">{errors.password2?.message}</p>
             <button className="btn btn-primary ">Confirm</button>

          
          </form>
          
        </div>
      </div>
    
    </div>
  );
};

