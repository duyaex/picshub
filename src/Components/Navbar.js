import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NewLogo from "../img/NewLogo.jpg";
import { FaHandshake } from "react-icons/fa";
import {BiLogIn} from 'react-icons/bi'
import "./StartUp.css"
export default function Navbar() {
  let navigate = useNavigate();
const handleLogout=()=>{
  localStorage.removeItem("token")
  navigate("/login")
}
  return (
    <div>
      <nav className="fixed-top" id="Cover">
        <ul id="LogUl">
          <Link to="/">
            {" "}
            <img id="logocom" src={NewLogo} alt="Duy'a'" />
          </Link>

          <div id="link">
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Home
              </Link>
            </li>
           {localStorage.getItem("token")? <li>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/discover"
              >
                Discover
              </Link>
            </li>: <li title="Login to Access this feature" style={{ textDecoration: "none", color: "white" }}>
             
                Discover
              
            </li>}

     {!localStorage.getItem("token")? <div className="div">
           
            <button
              
              onClick={() => {
                navigate("/signup");
              }}
              className="join"
            >
              <FaHandshake /> Sign Up
            </button>
            </div>:<button className="join" onClick={handleLogout}>Logout <BiLogIn/></button>}
          </div>
        </ul>
      </nav>
    </div>
  );
}
