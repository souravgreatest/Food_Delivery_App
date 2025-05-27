// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Assuming Navbar.js is in src/components/
import Footer from '../components/Footer'; // Assuming Footer.js is in src/components/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#212529', // Dark theme background
        color: '#f8f9fa',     // Light text color
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <Navbar />

      {/* --- Hero Section Start --- */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white py-5"
        style={{
            paddingLeft:"100px",
            paddingRight:"80px",
          minHeight: 'calc(100vh - 120px)', // Adjust based on navbar/footer height to fill viewport
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D')`, // Dynamic Indian food/restaurant background
        //   backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Optional: for parallax-like effect
        }}
      >
        <div className="container my-5">
          <div className="row align-items-center justify-content-center">
            {/* Left Column: Text Content */}
            <div className="col-lg-7 mb-4 mb-lg-0 text-lg-start text-center">
              <h1
                className="display-3 fw-bold text-warning mb-3"
                style={{
                  fontFamily: 'Pacifico, cursive',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                }}
              >
                Welcome to FoodBar!
              </h1>
              <p
                className="lead text-light mb-4"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
              >
                Your culinary journey begins here. Explore a wide array of delicious meals from your favorite local restaurants, delivered hot and fresh to your doorstep.
              </p>

              {/* Action Buttons */}
              <div className="d-flex justify-content-lg-start justify-content-center flex-wrap">
                <Link to="/menu" className="btn btn-warning btn-lg fw-bold text-dark px-4 py-2 me-2 mb-2">
                  Order Now!
                </Link>
                <Link to="/aboutus" className="btn btn-outline-warning btn-lg fw-bold text-warning px-4 py-2 mb-2">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Column: Delivery Bike Image */}
            <div className="col-lg-5 text-center">
              <img
                // NEW IMAGE URL FOR TRANSPARENT BACKGROUND
                src="https://cdn.pixabay.com/photo/2017/08/20/14/36/pizza-2661933_1280.png"
                alt="Food Delivery Bike"
                className="img-fluid"
                style={{
                //   maxWidth: '100%', // Adjust size
                //   marginLeft:"150px",
                  height: '500px',
                  filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.6))', // Add a shadow to make it pop
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* --- Hero Section End --- */}

      {/* --- Features Section (Optional, can expand here) --- */}
      <section className="container my-5 text-center">
        <h2 className="text-warning fw-bold mb-4" style={{ fontFamily: 'Pacifico, cursive' }}>Why Choose FoodBar?</h2>
        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div className="p-4 rounded shadow-lg" style={{ background: '#2c3034', border: '1px solid #495057' }}>
              <h4 className="text-warning mb-3">Fast & Reliable</h4>
              <p className="text-light">Get your food delivered swiftly, right when you crave it.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow-lg" style={{ background: '#2c3034', border: '1px solid #495057' }}>
              <h4 className="text-warning mb-3">Vast Selection</h4>
              <p className="text-light">From local delicacies to international flavors, find your perfect meal.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow-lg" style={{ background: '#2c3034', border: '1px solid #495057' }}>
              <h4 className="text-warning mb-3">Easy Ordering</h4>
              <p className="text-light">A few clicks are all it takes to satisfy your hunger.</p>
            </div>
          </div>
        </div>
      </section>
      {/* --- Features Section End --- */}


      <Footer />
    </div>
  );
}