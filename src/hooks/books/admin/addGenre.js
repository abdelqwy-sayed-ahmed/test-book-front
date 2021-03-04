import React, { useState } from 'react';
import Joi from 'joi-browser'
import http from '../../../services/http'
const AddGenre = () => {
  const initialGenreValues={title:''}
  const [genre,setGenre]=useState(initialGenreValues)
  const [servMessage,setServMessage]=useState('');
  const [errors,setErrors]=useState({});
  const hostUrl=process.env.REACT_APP_HOST_URL
  let schema={
    title:Joi.string().required().min(3).label('Title'),
  }
  //add validate property to display schema errors
  const validate=()=>{
    const options={abortEarly:false}
    const {error}=Joi.validate(genre,schema,options)
    if(!error)return null;
    const errors={}
    for (let item of error.details)
    errors[item.path[0]]=item.message
    return errors
   
  }

  const validatProperty = ({ name, value }) => {
    const obj = { [name]: value };
    schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  const handleGenreChange=({currentTarget:input})=>{
    const newErrors = {...errors};
    const errorMessage = validatProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors)
    const {name,value}=input
    setGenre({...genre,[name]:value})
  }
  const handleGenreSubmit=async(genre)=>{
    let errors=validate()
     setErrors(errors||{})
     if(errors)return;
    const res=await http.post(hostUrl+'/genres',genre)
    // setGenres(res)
    if(res&&res.status===200){
      setServMessage(res.data)
      setTimeout(()=>{window.location.reload()},2000)
    }
  }

  const renderInput=(name,label,value)=>{
    return(
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input type="text" name={name} value={value}  className="form-control" onChange={handleGenreChange} />
        {errors[name] && <p className="text-danger">{errors[name]}</p>}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-7 mx-auto">
          <div className="card card-body">
            {servMessage&&<div className="alert alert-success">{servMessage}</div>}
            <h3 className='text-center text-primary'>Add New Genre</h3>
            <form onSubmit={e=>{
              e.preventDefault(
                handleGenreSubmit(genre)
              )
            }}>
              {renderInput('title','Title',genre.title)}
              <button className="btn btn-primary mt-3" disabled={validate()}>Submit</button>
            </form>
          </div>
        </div>
      </div>

      
    </React.Fragment>
  );
};

export default AddGenre;