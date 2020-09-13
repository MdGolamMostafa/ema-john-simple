import React, { useContext } from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <nav>
        <Link to ="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/manage">Manage Inventory Here</Link>
        <button onClick={()=> setLoggedInUser({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
