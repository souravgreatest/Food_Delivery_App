import axios from "axios";
import React, { useState, useEffect } from "react"; // Import useEffect
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 

const Orders = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      let email;
      const storedUser = localStorage.getItem("user");

      // Parse user from localStorage
      try {
        const parsed = JSON.parse(storedUser);
        email = parsed?.email || parsed;
      } catch {
        email = storedUser;
      }

      if (!email) {
        setError("User email not found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/auth/orders",
        {
          params: { email },
        }
      );

      const orders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      // Filter by user email (already done by backend if email param works, but good for robustness)
      const userOrders = orders.filter((order) => order.email === email);

      // Flatten nested order_data arrays
      const flattened = userOrders.flatMap((order) => {
        const orderItems = Array.isArray(order.order_data)
          ? order.order_data.flat() // flatten outer array
          : [];

        return orderItems.map((item, idx) => {
          // console.log("Flattened item:", item); // DEBUG

          return {
            orderId: order._id,
            product: item.product || item.name || "N/A",
            quantity: item.quantity || 0,
            size: item.size || "N/A",
            price: parseFloat(item.price) || 0,
            status: item.status || "Pending",
            date: item.Order_date || order.createdAt?.split("T")[0] || "Unknown",
          };
        });
      });

      setItems(flattened);
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Unable to load orders, please try again. " + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  const clearOrders = () => {
    setItems([]);
    setError(null);
  };

  // Fetch orders automatically on component mount
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#212529", // Dark theme background
        color: "#f8f9fa",     // Light text color
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Navbar /> {/* Include Navbar */}

      <div className="container mt-5 py-5"> {/* Added vertical padding */}
        <div className="mb-4"> {/* Increased margin-bottom */}
          <Link to="/menu" className="btn btn-link text-warning text-decoration-none fs-5"> {/* Styled Home link */}
            ← Back to Home
          </Link>
        </div>

        <h3
          className="fs-2 fw-bold mb-4 text-warning" // Matching heading style
          style={{ fontFamily: 'Pacifico, cursive', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
        >
          Your Orders
        </h3>


        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your orders...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover table-bordered mt-3"> {/* Applied dark theme table styles */}
              <thead className="table-warning"> {/* Yellow header */}
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.orderId.substring(0, 8)}...</td> {/* Truncate Order ID for display */}
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>{item.size}</td>
                    <td>₹{item.price.toFixed(2)}</td> {/* Indian Rupee symbol */}
                    <td>{item.status}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted text-center mt-4">No orders to display.</p>
        )}
      </div>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default Orders;