import "./css/register.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/userAction.js";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const dispatch = useDispatch();

  function register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (password !== confirm) {
      alert("Passwords do not match!");
    } else if (!emailRegex.test(email)) {
      alert("Invalid email address!");
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
        setTimeout(() => {
          setRegistrationSuccess(false);
        }, 3000);
      });
    }
    resetForm();
  }

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirm("");
  };

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
          <button onClick={register} className="btn register-btn mt-4">
            Register
          </button>
        </div>
        <p className="register-link">
          Already had a Byte? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}
