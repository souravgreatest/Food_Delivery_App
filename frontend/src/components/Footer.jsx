import React from "react";

export default function Footer() {
  return (
    <div className="bg-dark text-light mt-5 p-2">
      <div className="container py-3"> {/* Added py-3 for vertical padding */}
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 border-top border-secondary"> {/* Used Bootstrap rows/cols for better layout */}
          
          {/* Column 1: Brand & Copyright */}
          <div className="col mb-3">
            <a href="/" className="d-flex align-items-center mb-3 text-warning text-decoration-none" style={{ fontFamily: 'Pacifico, cursive', fontSize: '2.5rem' }}>
              {/* You might place a logo SVG or img here */}
              FoodBar
            </a>
            <p className="text-light" style={{ fontSize: '0.9rem' }}>
              &copy; 2025 FoodBar, Inc.
            </p>
            <p className="text-light small mt-2">
              Your daily dose of delicious delivered right to your door!
            </p>
          </div>

          <div className="col mb-3"></div> {/* Empty column for spacing on larger screens */}

          {/* Column 2: Quick Links */}
          <div className="col mb-3">
            <h5 className="text-warning mb-3">Quick Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">About Us</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Our Menu</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Privacy Policy</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col mb-3">
            <h5 className="text-warning mb-3">Get in Touch</h5>
            <ul className="list-unstyled text-light">
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill me-2"></i> {/* Placeholder for location icon */}
                123, Flavour Street, Rohtak City, India
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone-fill me-2"></i> {/* Placeholder for phone icon */}
                +91 98113 42423
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope-fill me-2"></i> {/* Placeholder for email icon */}
                support@foodbar.in
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="col mb-3">
            <h5 className="text-warning mb-3">Follow Us</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-light" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook me-2"></i> Facebook
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-light" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter me-2"></i> Twitter
                </a>
              </li>
              <li className="nav-item mb-2">
                <a className="nav-link p-0 text-light" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram me-2"></i> Instagram
                </a>
              </li>
              {/* You can add more social media links here */}
            </ul>
          </div>

        </footer>
      </div>
    </div>
  );
}