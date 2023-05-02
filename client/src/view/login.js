import "./css/login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../actions/userAction.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin() {
    dispatch(userLogin({ email, password }))
      .then((response) => {
        if (response.payload.error) {
          setError(response.payload.error);
        } else {
          navigate(response.payload.user.isAdmin ? "/delete" : "/");
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setError(
            "An error occurred while logging in. Please enter the correct email and password."
          );
        }, 2000);
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-login">
            Login
          </button>
        </div>
        <p className="register-link">
          First Byte? <a href="/register">Create Account</a>
        </p>
      </div>
    </div>
  );
}
