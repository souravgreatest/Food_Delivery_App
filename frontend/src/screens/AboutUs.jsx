import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutUs() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center p-5"
      style={{
        minHeight: '100vh',
        background: '#212529',
        color: '#f8f9fa',
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
          backgroundColor: '#343a40',
          border: 'none',
          color: '#f8f9fa'
        }}
      >
        <h1
          className="display-4 mb-4 text-warning"
          style={{
            fontFamily: 'Pacifico, cursive',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          About Food Bar
        </h1>

        <p className="lead mb-4">
          Welcome to <strong>Food Bar</strong> – your go-to destination for delicious, freshly prepared meals.
          Located in the heart of <strong>Rohtak</strong>, we specialize in <strong>Indian</strong> and <strong>Chinese</strong> cuisine,
          crafted with quality ingredients and a passion for flavor.
        </p>

        <p className="mb-4">
          At Food Bar, we blend traditional recipes with modern tastes to deliver a satisfying
          dining experience—whether you're enjoying a meal in-house or ordering online.
          Our menu is designed to please every palate, and we take pride in offering fast,
          reliable delivery right to your doorstep.
        </p>

        <p className="mb-4">
          This project is thoughtfully created by <strong>Sourav Jain</strong> and <strong>Vikas</strong>,
          blending a love for food with a flair for technology to bring you an exceptional digital dining experience.
        </p>

        <p className="fs-5 fw-bold text-warning mb-4">
          Order now and taste the difference.
        </p>
        <div >
          <Link
            to="/"
            className="btn btn-outline-warning mt-3 rounded-pill fw-bold"
            style={{

              transition: 'all 0.3s ease-in-out',
              fontFamily: 'Montserrat, sans-serif',
              maxWidth: '200px',
              marginRight: '50px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ffc107';
              e.currentTarget.style.color = '#212529';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffc107';
            }}
          >
            Back to Home
          </Link>
          <Link
            to="/menu"
            className="btn btn-outline-warning mt-3 rounded-pill fw-bold"
            style={{
              transition: 'all 0.3s ease-in-out',
              fontFamily: 'Montserrat, sans-serif',
              maxWidth: '200px',
              margin: '0 auto'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ffc107';
              e.currentTarget.style.color = '#212529';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffc107';
            }}
          >
            Show Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
