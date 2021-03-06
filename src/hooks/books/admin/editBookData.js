import React,{useContext,useState} from 'react';
import Joi from 'joi-browser'
import userContext from './../../../context/userContext';
import http from '../../../services/http';
import { useParams } from 'react-router-dom';


const EditBookData = () => {
  const results=useContext(userContext)
  const bookValues=results.bookValues
  const [book,setBook]=useState(bookValues)
  const [errors,setErrors]=useState({});
  const genres=results.genres;
  const [serverMessage,setServerMessage]=useState('')
  const hostUrl=process.env.REACT_APP_HOST_URL
  
  const {_id}=useParams()
 
  let schema={
    title:Joi.string().required().label('Title'),
    price:Joi.number().required().positive().label('Price'),
    genreId:Joi.string().required().label('Genre'),
  }

  //add validate property to display schema errors
  const validate=()=>{
    const options={abortEarly:false}
    const {error}=Joi.validate(book,schema,options)
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
  const handleBookChange=({currentTarget:input})=>{
    const newErrors = {...errors};
    const errorMessage = validateProperty(input);
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors)
    const {name,value}=input
    setBook({...book,[name]:value})
  }

  const handleBookUpdate=async(book)=>{
    let errors=validate()
     setErrors(errors||{})
     if(errors)return;
       const res=await http.put(hostUrl+`/books/${_id}`,book)
        if(res&&res.status===200){
          setServerMessage(res.data)
          setTimeout(()=>{window.location="/booklists"},1000)
        }
  }

  const renderInput=(type,name,label,value)=>{
    return(
      <div className="form-group mb-2">
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} defaultValue={value}  className="form-control mt-2" onChange={handleBookChange} />
        {errors[name] && <p className="text-danger">{errors[name]}</p>}
      </div>
    )
  }
  const renderSelect=(name,label,options)=>{
    return(
      <div className="form-group mt-2">
        <label>{label}</label>
        <select 
        name={name}/*"genreId"*/
        onChange={handleBookChange}
        className="form-select mt-2"
        value={book.genreId}
        >
        {options.map((cat)=>(
          <option key={cat._id} value={cat._id} >{cat.title}</option>
          ))} 
        </select>
        {errors&&<p className="text-danger">{errors[name]}</p>}
      </div>
    )
  }

  return (
    <React.Fragment>
    <div className="row mt-5" >
      <div className="col-md-8 mx-auto">
        <div className="card card-body">
          {serverMessage&&<div className="alert alert-success">{serverMessage}</div>}
          <h4 className="text-center text-primary">Update book</h4>
          <form onSubmit={e=>{
            e.preventDefault()
            handleBookUpdate(book)
          }}>
            
            {renderInput('text','title','Book Title',book.title)}
            {renderInput('text','price','Price',book.price)}
            {renderSelect('genreId','Category',genres)}
            <button className="btn btn-primary mt-3" disabled={validate()} >Update</button>

          </form>
        </div>
      </div>
    </div>

  </React.Fragment>
  );
};

export default EditBookData;