import React,{useState} from 'react';
import http from '../../services/http'
import { Link } from 'react-router-dom';
import Joi from 'joi-browser'
export default function Register(){
  const[loading,setLoading]=useState(false)
  const initialValues={name:'',email:'',password:''}
  const [user,setUser]=useState(initialValues)
  const [errors,setErrors]=useState({});
  const [success,setSuccess]=useState('');
  const [errmessage,setErrMessage]=useState('');
  const hostUrl=process.env.REACT_APP_HOST_URL
   
  let schema={
    name:Joi.string().required().label('Name'),
    email:Joi.string().required().email().label('Email'),
    password:Joi.string().required().min(6).label('Password'),
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
  const handleRegisterSubmit=async(user)=>{
    let errors=validate()
     setErrors(errors||{})
     if(errors)return;
    //formData
    try{
      setLoading(true)
      const res= await http.post(hostUrl+'/users/register',user)
    if(res&&res.status===200){
      setSuccess(res.data)
      setTimeout(() => {
        window.location="/login"
      }, 2000);
    }
    }catch(ex){
      setLoading(false)
      if(ex.response&&ex.response.status===400){
        setErrMessage(ex.response.data)
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

  return (
    <div className="row mt-5">
      <div className="col-md-6 mx-auto">
        <div className="card card-body">
          {success&&<div className="alert alert-success">{success}</div>}
          {errmessage&&<div className="alert alert-danger">{errmessage}</div>}
          <h2 className="text-center text-primary">Register Form</h2>
          <form onSubmit={e=>{
            e.preventDefault()
            handleRegisterSubmit(user)
          }}>
            {renderInput('text','name','Name',user.name)}
            {renderInput('text','email','Email',user.email)}
            {renderInput('password','password','Password',user.password)}
             <button className="btn btn-primary"
             disabled={loading ||validate()}
             >{loading&&<i className="fa fa-refresh fa-spin"></i>}Submit</button>
             <div className="mt-2">
               <Link to ="/login"> Already have an account please login</Link>
             </div>

          </form>
        </div>
      </div>
    
    </div>
  );
};

