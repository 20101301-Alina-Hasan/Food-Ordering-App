import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions/userAction.js";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function login() {
    const user = {
      email,
      password,
    };
    dispatch(userLogin(user))
      .then((response) => {
        if (response.payload.error) {
          setError(response.payload.error);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-heading">Login</h1>
        {error && <p className="text-danger">{error}</p>}
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            className="form-control"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button onClick={login} className="btn btn-primary p-2">
            Login
          </button>
        </div>
        <p className="register-link">
          First Byte? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}
