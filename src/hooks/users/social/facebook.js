import React from 'react';
import http from '../../../services/http';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useLocation } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

const Facebook = () => {
  const location=useLocation()
  const hostUrl='https://book-shop-2021.herokuapp.com'

  //facebook login
  const responseFacebook =async data=>{
    const {data:jwt} = await http.post(hostUrl+'/users/facebook',data)
    localStorage.setItem('token',jwt)
    const uid=jwtDecode(jwt)
    localStorage.setItem("uId",uid._id)
    const {state}=location
    window.location=state?state.from.pathname:"/"

}
  
  return (
    <div>
      <FacebookLogin
        appId="865248894308326"
        autoLoad={false}
        fields="name,email,picture.type(large)"
        callback={responseFacebook}
        render={renderProps => (
          <button className="btn btn-primary" onClick={renderProps.onClick}><i className="fa fa-facebook"></i> login with facebook account</button>
        )}
      />
      
    </div>
  );
};

export default Facebook;

