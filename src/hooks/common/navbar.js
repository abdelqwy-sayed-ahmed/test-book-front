import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import userContext from '../../context/userContext';
import Search from './search';
  
export default function NavBar() {
  const currentUser=useContext(userContext)
  const getCartTotal=currentUser.getCartTotal

  return (
      <div>
        <nav className="navbar navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container ">
            <Link className="navbar-brand" to="/"><i className="fa fa-book fa-lg"></i></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle='collapse' data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className=" collapse navbar-collapse collapse-hide" id="navbarSupportedContent">
                
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" aria-labelledby="navbarSupportedContent">
      {/* not-Auth */}
               {!currentUser.user&&(
                 <React.Fragment>
               <li className="nav-item">
                  <Link className="nav-link" to="/login" ><i className="fa fa-user fa-2x text-primary"></i></Link>
                </li>
                 </React.Fragment>
               )
                }
    {/* Admin-Auth */}
                {currentUser.user.isAdmin&&(
                  <React.Fragment>
                    <li className="nav-item dropdown">
                      <button className="btn btn-dark nav-link dropdown-toggle" id="navbarDropdown"  data-bs-toggle="dropdown" aria-expanded="false">
                        DashBoard
                      </button>
                      <ul className="dropdown-menu bg-dark " aria-labelledby="navbarDropdown">
                        <li className="nav-item">
                        <Link className="nav-link mr-2" to="/genre/add" role="button"data-toggle="collapse">Add Genre</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link mr-2" to="/books/add">AddBook</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link mr-2" to="/booklists">Book lists</Link>
                        </li>
                      </ul>
                    </li>
                  </React.Fragment>
                )}
      {/* user-Auth */}
                {currentUser.user&&(
                  <React.Fragment>
                    <li className="nav-item">
                  <Link className="nav-link" to="/profile" >{currentUser.user.name}</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/logout" className="nav-link"  role="button" data-toggle="collapse">Logout</Link>
                  </li>
                  </React.Fragment>
                  )}
                  </ul>
       {/* right-hand-side */}
                <form className="d-flex mr-2" onSubmit={e=>{e.preventDefault()}}>
                  <Search/>
                </form>
                 <ul className="navbar-nav my-auto mb-2 mb-lg-0">
                 <li className="nav-item">
                  <Link className="nav-link" to="/cart"><i className="fa fa-shopping-cart fa-2x text-primary"></i><span className="badge rounded-pill bg-success">{getCartTotal()}</span></Link>
                </li>
                  </ul>
                </div>
              </div>
     
        </nav>

      </div>
  
  );
};




