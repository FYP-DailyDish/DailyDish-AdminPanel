import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import "./disable.css";

function Disabled() {
  const { logout } = useAuth();
  useEffect(() => {
    const unsub = logout();
    return unsub;
  }, []);
  return (
      <>
    <div className="disable-container">
      <img className="img-hold" src={Logo} />
      <strong>
        <p>Your Account Has been Disabled by Senior Administrator</p>
      </strong>
      <Link to='./login'><p className="link-hold">Back to Login</p></Link>
    </div>
    
    </>
  );
}

export default Disabled;
