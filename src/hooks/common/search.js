import React, { useContext } from 'react';
import userContext from '../../context/userContext';

export default function Search(){
  const user=useContext(userContext)
  const handleSearch=user.handleSearch

  return(
    <React.Fragment>
      <input
      type="text"
      onChange={(e)=> handleSearch(e.target.value)}
      className="form-control me-2"
      placeholder="Seach for Book..."
      name="query"
    />

    </React.Fragment>
  )
}