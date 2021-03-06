import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import http from '../../services/http';

export default function EditProfileImage(){
  const [image,setImage]=useState('')
  const [success,setSuccess]=useState('')
  const [disable,setDisable]=useState(true)
  const {handleSubmit}=useForm()
  const hostUrl=process.env.REACT_APP_HOST_URL
  const onSubmit=async()=>{
    
    const formData=new FormData()
    formData.append('image',image)
    const userId=localStorage.getItem('uId')
    const response=await http.put(hostUrl+`/users/profile/image/${userId}`,formData)
    if(response&&response.status===200){
      setSuccess(response.data)
    }
    setTimeout(() => {
      window.location="/profile"
    }, 2000);
    
  }

  const handleChange=e=>{
    setImage(e.target.files[0])
    setDisable(false)
  }
  
 
  return(
    <div>
      <div className="row mt-5">
        <div className="col-md-7 mx-auto">
          <div className="card card-body">
            {success&&<div className="alert alert-success">{success}</div>}
            <h3 className="text-center">Edit Profile Image</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="image">Upload image</label>
                <input type="file"
                name='image'
                id='image'
                onChange={handleChange}
                className='form-control'
                />
              </div>
              <button className="btn btn-primary mt-2" disabled={disable}>Upload</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}