import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };
  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (
      (name, email, password, reEnterPassword) &&
      password === reEnterPassword
    ) {
      axios.post("http://localhost:8080/api/register", user).then((res) => {
        alert(res.data.message);
      });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="register-container">
      <h1>Register Page</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Enter your Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Enter your Email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter your Password"
        onChange={handleChange}
      />
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-Enter your Password"
        onChange={handleChange}
      />
      <button className="register-button" onClick={register}>
        Register
      </button>
      <p>or</p>
      <button className="login-button" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default Register;
