import React from "react";
import { useHistory} from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  const handleClick=()=>{
    localStorage.removeItem("token");
    history.push("/")
  }

  return (
    <nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">WebSiteName</a>
    </div>
    <ul className="nav navbar-nav">
      <li className="active"><a href="#">Home</a></li>
      <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li>
          <Link to='/AdminPanel'>Admin</Link>
          </li>
          <li><a href="#">Page 1-2</a></li>
          <li><a href="#">Page 1-3</a></li>
        </ul>
      </li>
      <li><a href="#">Page 2</a></li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
      {localStorage.getItem("token")!=null ? <li><a href="#" onClick={handleClick}><span className="glyphicon glyphicon-log-in"></span> Logout</a></li> 
       : <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> 
       }
     
    </ul>
  </div>
</nav>
  //   <div className="ui fixed menu" >
  //     <div className="ui container right">
  //       <h2>FakeShop</h2>
  //       <button className="ui secondary button" onClick={handleClick}>
  //          Logout
  // </button>
  //     </div>
  //   </div>
  );
};

export default Header;
