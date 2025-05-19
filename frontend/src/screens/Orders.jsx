import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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

      const response = await axios.get(
        "http://localhost:5000/api/auth/orders",
        {
          params: { email },
        }
      );

      const orders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      // Filter by user email
      const userOrders = orders.filter((order) => order.email === email);

      // Flatten nested order_data arrays
      const flattened = userOrders.flatMap((order) => {
        const orderItems = Array.isArray(order.order_data)
          ? order.order_data.flat() // flatten outer array
          : [];

        return orderItems.map((item, idx) => {
          console.log("Flattened item:", item); // ✅ DEBUG

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
      setError("Unable to load orders, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearOrders = () => {
    setItems([]);
    setError(null);
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <Link to="/" className="btn btn-link p-0">
          ← Home
        </Link>
      </div>

      <h3>Your Orders</h3>

      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? "Loading..." : "Check Orders"}
        </button>
        <button
          className="btn btn-secondary"
          onClick={clearOrders}
          disabled={loading}
        >
          Clear Orders
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {items.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
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
                  <td>{item.orderId}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{item.size}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-muted">No orders to display.</p>
      )}
    </div>
  );
};

export default Orders;
