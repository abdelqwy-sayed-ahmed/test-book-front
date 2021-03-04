import { useEffect } from 'react';

const Logout = () => {
  useEffect(()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('check')
    localStorage.removeItem('uId')
    // localStorage.clear();
    window.location="/"
  })
  return (
    null
  );
};

export default Logout;