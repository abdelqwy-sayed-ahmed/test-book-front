import React, {  useState,useContext } from 'react';
import Joi from 'joi-browser'
import http from '../../services/http';
import { useLocation,Link } from 'react-router-dom';
// import Google from './social/google';
import Facebook from './social/facebook';
import userContext from '../../context/userContext';
import jwtDecode from 'jwt-decode';
//schema


export default function Login(){
  const currentUser=useContext(userContext)
  const hostUrl=process.env.REACT_APP_HOST_URL
  const initialValues={email:'',password:''}
  const [user,setUser]=useState(initialValues)
  const [errors,setErrors]=useState({})
  const [errserver,setErrServer]=useState('')
  const location=useLocation()

  let schema={
    email:Joi.string().required().email().label('Email'),
    password:Joi.string().required().label('Password'),
  }
  //add validate property to display schema errors
  const validate=()=>{
    const options={abortEarly:false}
    const {error}=Joi.validate(user,schema,options)
    if(!error)return null;
    const errors={}
    for (let item of error.details)
    errors[item.path[0]]=item.message
    return errors
   
  }
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  const handleInputChange=({currentTarget:input})=>{
    const newErrors = {...errors};
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors)
    const {name,value}=input
    setUser({...user,[name]:value})
  }
  const handleLoginSubmit=async(user)=>{
    let errors=validate()
     setErrors(errors||{})
     if(errors)return;
    //formData
    try{ 
      const {data:jwt}= await http.post(hostUrl+'/users/login',user)
       localStorage.setItem('token',jwt)
       const uid=jwtDecode(jwt)
       localStorage.setItem("uId",uid._id)
       // direct after login
       const {state}=location
       window.location=state?state.from.pathname:"/"
     }catch(ex){
       if(ex.response&&ex.response.status===400){
         setErrServer(ex.response.data)
       }
     }
  }
  const renderInput=(type,name,label,value)=>{
    return(
      <div className="form-group mb-2">
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} value={value}  className="form-control mt-2" onChange={handleInputChange} />
        {errors[name] && <p className="text-danger">{errors[name]}</p>}
      </div>
    )
  }
  //check current User
     if(currentUser.user) window.location="/"
  return (
    <div className="row mt-5">
      <div className="col-md-6 mx-auto">
        <div className="card card-body">
          {errserver&&<div className="alert alert-danger">{errserver}</div>}
          <h2 className="text-center text-primary">Login Form</h2>
          <form onSubmit={e=>{
            e.preventDefault()
            handleLoginSubmit(user)
          }}>
          
            {renderInput('text','email','Email',user.email)}
            {renderInput('password','password','Password',user.password)}
             <button className="btn btn-primary " disabled={validate()}>Login</button>

          <div className="d-flex align-items-center mt-2">
          <div >
          <Link to ="/forget">Forget your password</Link>
          </div>
          <div className="ms-auto">
          <Link to ="/register">Create new account</Link>
          </div>
          </div>
          </form>
          {/* <div className="text-center mt-2">
            <Google/>
          </div> */}
          <div className="text-center mt-2">
            <Facebook/>
          </div>
        </div>
      </div>
    
    </div>
  );
};

