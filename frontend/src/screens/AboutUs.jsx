import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutUs() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center p-5"
      style={{
        minHeight: '100vh',
        // Dark background matching Navbar's primary color
        background: '#212529',
        color: '#f8f9fa', // Light text for dark background
        fontFamily: 'Montserrat, sans-serif',
        paddingTop: '80px',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          maxWidth: '800px',
          borderRadius: '20px',
          // Darker background for the card
          backgroundColor: '#343a40', // A slightly lighter dark gray
          border: 'none',
          color: '#f8f9fa' // Light text inside the card
        }}
      >
        <h1
          className="display-4 mb-4 text-warning" // Keep text-warning for yellow
          style={{
            fontFamily: 'Pacifico, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)' // Darker shadow for contrast
          }}
        >
          About Food Bar
        </h1>

        <p className="lead mb-4">
          Welcome to **Food Bar** – your go-to destination for delicious, freshly prepared meals.
          Located in the heart of **Rohtak**, we specialize in **Indian** and **Chinese** cuisine,
          crafted with quality ingredients and a passion for flavor.
        </p>

        <p className="mb-4">
          At Food Bar, we blend traditional recipes with modern tastes to deliver a satisfying
          dining experience—whether you're enjoying a meal in-house or ordering online.
          Our menu is designed to please every palate, and we take pride in offering fast,
          reliable delivery right to your doorstep.
        </p>

        <p className="fs-5 fw-bold text-warning mb-4"> {/* Changed text-success to text-warning */}
          Order now and taste the difference.
        </p>

        <Link
          to="/"
          className="btn btn-outline-warning mt-3 rounded-pill fw-bold" // Changed to btn-outline-warning
          style={{
            transition: 'all 0.3s ease-in-out',
            fontFamily: 'Montserrat, sans-serif',
            maxWidth: '200px',
            margin: '0 auto'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ffc107'; // Yellow background on hover
            e.currentTarget.style.color = '#212529'; // Dark text on hover
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'; // Transparent background when not hovered
            e.currentTarget.style.color = '#ffc107'; // Yellow text when not hovered
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}