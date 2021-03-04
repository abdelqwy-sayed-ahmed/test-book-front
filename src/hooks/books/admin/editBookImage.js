import React, { useState } from 'react';
import http from '../../../services/http';
import { useParams } from 'react-router-dom';

const EditBookImage = () => {
  const [image,setImage]=useState('')
  const [success,setSuccess]=useState('')
  const hostUrl='https://book-shop-2021.herokuapp.com'
  const {_id}=useParams()
  const handleImageChange=e=>{
    setImage(e.target.files[0])
  }
  const handleEditBookImage=async()=>{
    
    const formData=new FormData()
    formData.append('image',image)
    const config={
      Headers:{'Content-Type':'multipart/form-data'}
    }
    const res=await http.put(hostUrl+`/books/bookImage/${_id}`,formData,config)
    if(res && res.status===200){
      setSuccess(res.data)
    }
    setTimeout(() => {
      window.location="/booklists"
    }, 2000);
    
  }
  return (
    <React.Fragment>
     <div className="row mt-5">
        <div className="col-md-7 mx-auto">
          <div className="card card-body">
            {success&&<div className="alert alert-success">{success}</div>}
            <h3 className="text-center">Edit Book Image</h3>
            <form onSubmit={e=>{
              e.preventDefault()
                handleEditBookImage()
            }}>
              <div className="form-group">
                <label htmlFor="image">Upload image</label>
                <input type="file"
                name='image'
                id='image'
                onChange={handleImageChange}
                className='form-control'
                />
              </div>
              <button className="btn btn-primary mt-2">Upload</button>

            </form>
          </div>
        </div>
      </div>
      
    </React.Fragment>
  );
};

export default EditBookImage;