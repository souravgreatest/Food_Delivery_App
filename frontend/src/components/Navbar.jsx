import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from 'react-bootstrap/Badge';
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screens/Cart";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const loadCart = () => {
    setCartView(true);
  };

  const getNavLinkStyle = (isActive) => ({
    transition: 'color 0.3s ease-in-out, font-weight 0.3s ease-in-out, text-shadow 0.3s ease-in-out, border-bottom 0.3s ease-in-out, padding-bottom 0.3s ease-in-out',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: isActive ? 'bold' : '500',
    color: '#ffc107', // Always yellow color
    borderBottom: isActive ? '2px solid #ffc107' : 'none',
    paddingBottom: isActive ? '2px' : '0'
  });

  const handleNavLinkMouseOver = (e) => {
    e.currentTarget.style.color = '#ffc107';
    e.currentTarget.style.fontWeight = 'bold';
    e.currentTarget.style.textShadow = '0 0 8px rgba(255, 193, 7, 0.7)';
    e.currentTarget.style.borderBottom = '2px solid #ffc107';
    e.currentTarget.style.paddingBottom = '2px';
  };

  const handleNavLinkMouseOut = (e, isActive) => {
    if (!isActive) {
      // If not active, revert to default yellow color, 500 weight, no shadow, no underline
      e.currentTarget.style.color = '#ffc107';
      e.currentTarget.style.fontWeight = '500';
      e.currentTarget.style.textShadow = 'none';
      e.currentTarget.style.borderBottom = 'none';
      e.currentTarget.style.paddingBottom = '0';
    } else {
      // If active, only remove hover-specific shadow, keep active styles
      e.currentTarget.style.textShadow = 'none';
      e.currentTarget.style.color = '#ffc107';
      e.currentTarget.style.fontWeight = 'bold';
      e.currentTarget.style.borderBottom = '2px solid #ffc107';
      e.currentTarget.style.paddingBottom = '2px';
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark position-sticky"
        style={{
          backgroundColor: '#212529',
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.7)",
          zIndex: "10",
          width: "100%",
          top: 0,
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <div className="container px-4">
          <Link
            className="navbar-brand fs-1 fst-italic text-warning"
            to="/"
            style={{
              transition: 'transform 0.3s ease-in-out',
              display: 'inline-block',
              fontFamily: 'Pacifico, cursive',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            FoodBar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"
              style={{
                transition: 'transform 0.3s ease-in-out',
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
              }}></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-4"
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                  to="/"
                  style={getNavLinkStyle(location.pathname === '/')}
                  onMouseOver={handleNavLinkMouseOver}
                  onMouseOut={(e) => handleNavLinkMouseOut(e, location.pathname === '/')}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 mx-4"
                  aria-current={location.pathname === '/aboutus' ? 'page' : undefined}
                  to="/aboutus"
                  style={getNavLinkStyle(location.pathname === '/aboutus')}
                  onMouseOver={handleNavLinkMouseOver}
                  onMouseOut={(e) => handleNavLinkMouseOut(e, location.pathname === '/aboutus')}
                >
                  About Us
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-5 mx-4"
                    aria-current={location.pathname === '/myorder' ? 'page' : undefined}
                    to="/myorder"
                    style={getNavLinkStyle(location.pathname === '/myorder')}
                    onMouseOver={handleNavLinkMouseOver}
                    onMouseOut={(e) => handleNavLinkMouseOut(e, location.pathname === '/myorder')}
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("token") ? (
              <div className="d-flex ms-auto">
                <Link className="btn btn-outline-warning mx-1 rounded-pill fw-bold" to="/login"
                  style={{
                    transition: 'all 0.3s ease-in-out',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  onMouseOver={e => {e.currentTarget.style.backgroundColor='#ffc107'; e.currentTarget.style.color='#212529';}}
                  onMouseOut={e => {e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color='#ffc107';}}
                >
                  Login
                </Link>
                <Link className="btn btn-warning mx-1 rounded-pill fw-bold" to="/register"
                  style={{
                    transition: 'all 0.3s ease-in-out',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  onMouseOver={e => {e.currentTarget.style.backgroundColor='#e0a800';}}
                  onMouseOut={e => {e.currentTarget.style.backgroundColor='#ffc107';}}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center ms-auto">
                <button
                  className="btn btn-success mx-1 rounded-pill fw-bold position-relative"
                  onClick={loadCart}
                  style={{
                    display:"flex",
                    paddingLeft: "5px",
                    transition: 'all 0.3s ease-in-out',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  onMouseOver={e => {e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow='0 0 10px rgba(0,255,0,0.5)';}}
                  onMouseOut={e => {e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none';}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cart-fill me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  My Cart
                  {items.length > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle"
                      style={{ transition: 'transform 0.3s ease-in-out', transformOrigin: 'center', animation: 'bounce 0.8s infinite' }}
                    >
                      {items.length}
                    </Badge>
                  )}
                </button>

                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}

                <button
                  onClick={handleLogout}
                  className="btn btn-danger mx-2 rounded-pill fw-bold"
                  style={{
                    transition: 'all 0.3s ease-in-out',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                  onMouseOver={e => {e.currentTarget.style.backgroundColor='#dc3545'; e.currentTarget.style.transform='scale(1.05)';}}
                  onMouseOut={e => {e.currentTarget.style.backgroundColor='#dc3545'; e.currentTarget.style.transform='scale(1)';}}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}