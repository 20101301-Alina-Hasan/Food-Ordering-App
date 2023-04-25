import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/userAction.js";
import { useNavigate, Link } from "react-router-dom";
import "../register.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function register() {
    if (password !== confirm) {
      alert("Passwords do not match!");
    } else {
      const user = {
        firstName,
        lastName,
        email,
        password,
      };
      console.log(user);
      dispatch(registerUser(user)).then(() => {
        setRegistrationSuccess(true);
      });
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-heading">Register</h1>
        {registrationSuccess && (
          <p style={{ color: "green" }}>Registration successful!</p>
        )}
        <div>
          <input
            required
            type="text"
            placeholder="First Name"
            className="form-control"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            className="form-control"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            required
            type="text"
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
          />
          <button onClick={register} className="btn register-btn p-2">
            Register
          </button>
        </div>
        <p className="register-link">
          Already had a Byte? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
