
import React from 'react'
import { useEffect ,useState} from 'react';
import http from '../../services/http';
import { Link } from 'react-router-dom';


export default function Profile(){
  const [list,setList]=useState('')
  const hostUrl=process.env.REACT_APP_HOST_URL

  useEffect(()=>{
    async function getProfileData(){
      const userId=localStorage.getItem('uId');
      const {data:profiles}=await http.get(hostUrl+`/users/profile/${userId}`)
      setList(profiles)
    }
    getProfileData()
  },[hostUrl])
  
 


  return(
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-md-4 text-center">
        {list.imageOut&&(
          <div>
            <img src={list.image} className="img-fluid rounded-circle" height="200"width="200" alt={list.name}/>
            <Link to='/profile/edit/image'><i className="fa fa-edit text-info"  style={{cursor:"pointer" ,position:"absolute",}}></i></Link>
          </div>
        )}
        {!list.imageOut&&(
          <div>
            <img src={hostUrl+`/${list.image}`} className="img-fluid rounded-circle" height="200"width="200" alt={list.name}/>
            <Link to='/profile/edit/image'><i className="fa fa-edit text-info"  style={{cursor:"pointer" ,position:"absolute",}}></i></Link>
          </div>
        )}

        </div>
        <div className="col-md-8 text-center">
          <h3>{list.name}</h3>
        </div>
      </div>
    </React.Fragment>
  )
}

