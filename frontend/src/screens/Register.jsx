import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../styles/style.css"; // We'll rely more on inline styles and Bootstrap now

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
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
        navigate("/menu");
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: '#212529', // Dark background matching Navbar
        color: '#f8f9fa', // Light text for page
        fontFamily: 'Montserrat, sans-serif',
        paddingTop: '80px', // Space for fixed Navbar
        paddingBottom: '20px' // Add some padding at the bottom
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-lg" // Bootstrap padding and shadow
        style={{
          width: '100%',
          maxWidth: '400px', // Max width for the form card
          backgroundColor: '#343a40', // Slightly lighter dark for the form card
          borderRadius: '10px',
          border: 'none',
          color: '#f8f9fa' // Light text inside the form card
        }}
      >
        <h2 className="text-center text-warning mb-4"
          style={{ fontFamily: 'Pacifico, cursive', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
        >
          Register
        </h2>

        {/* name */}
        <div className="mb-3"> {/* Bootstrap margin-bottom */}
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control" // Bootstrap form control
            id="name"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            required
            style={{
              backgroundColor: '#495057', // Darker input background
              color: '#f8f9fa', // Light text for input
              borderColor: '#495057' // Darker border
            }}
          />
        </div>

        {/* Email */}
        <div className="mb-3"> {/* Bootstrap margin-bottom */}
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control" // Bootstrap form control
            id="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            required
            style={{
              backgroundColor: '#495057', // Darker input background
              color: '#f8f9fa', // Light text for input
              borderColor: '#495057' // Darker border
            }}
          />
        </div>

        {/* Password */}
        <div className="mb-3"> {/* Bootstrap margin-bottom */}
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control" // Bootstrap form control
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
            style={{
              backgroundColor: '#495057', // Darker input background
              color: '#f8f9fa', // Light text for input
              borderColor: '#495057' // Darker border
            }}
          />
        </div>

        {/* Location */}
        <div className="mb-3"> {/* Bootstrap margin-bottom */}
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control" // Bootstrap form control
            id="location"
            name="location"
            placeholder="Location"
            value={data.location}
            onChange={handleChange}
            required
            style={{
              backgroundColor: '#495057', // Darker input background
              color: '#f8f9fa', // Light text for input
              borderColor: '#495057' // Darker border
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100 fw-bold mt-3" // Bootstrap button, full width, bold, margin-top
          style={{ transition: 'all 0.3s ease-in-out' }}
          onMouseOver={e => {e.currentTarget.style.backgroundColor='#e0a800';}} // Darker yellow on hover
          onMouseOut={e => {e.currentTarget.style.backgroundColor='#ffc107';}} // Original yellow on mouse out
        >
          Register
        </button>

        <div className="text-center mt-3"> {/* Bootstrap text center, margin-top */}
          <p className="mb-0"> {/* Remove default paragraph margin */}
            Already registered? <Link to="/login" className="text-warning text-decoration-none">Login</Link>
          </p>
        </div>
      </form>
      {/*ToastContainer*/}
      <ToastContainer />
    </div>
  );
}

export default Register;