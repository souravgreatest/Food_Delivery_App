import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/style.css";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e);
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 201) {
        const json = response.data;
        // console.log(json);
        if (json.status === "success") {
          localStorage.setItem("token", json.token);
          localStorage.setItem("user", data.email);
        }

        toast.success("User registered successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        navigate("/");
        // setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("User registration failed!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Registration failed! Please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {/* name */}
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            className="register-input"
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="register-input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="register-input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            className="register-input"
            type="string"
            id="location"
            name="location"
            placeholder="Location"
            value={data.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button className="register-button" type="submit">
            Register
          </button>
        </div>
        <div className="login-link">
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
      {/*ToastContainer*/}
      <ToastContainer />
    </div>
  );
}

export default Register;
