import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Orders = () => {
  const [ordersGroupedByDate, setOrdersGroupedByDate] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      let email;
      const storedUser = localStorage.getItem("user");

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

      const fetchedOrders = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      const processedIndividualOrders = fetchedOrders
        .filter((order) => order.email === email)
        .map((order) => {
          const rawOrderItems = Array.isArray(order.order_data)
            ? order.order_data.flat()
            : [];

          const filteredItems = rawOrderItems.filter(item => {
            const productName = (item.product || item.name || '').trim();
            const quantity = parseInt(item.quantity);
            const price = parseFloat(item.price);

            return productName && productName.toLowerCase() !== "n/a" && quantity > 0 && price > 0;
          });

          const orderTotal = filteredItems.reduce(
            (sum, item) => sum + (parseFloat(item.price) || 0),
            0
          );

          // Attempt to create a Date object from order.createdAt
          const orderTimestamp = new Date(order.createdAt);
          // Check if the created Date object is valid
          const isValidDate = !isNaN(orderTimestamp.getTime());

          return {
            _id: order._id,
            // If date is invalid, use today's date for display, otherwise format the order's date
            displayDate: isValidDate ? orderTimestamp.toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
            displayTime: isValidDate ? orderTimestamp.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            // Always store a valid Date object for rawDate for consistent sorting.
            // If original date is invalid, use current timestamp for sorting this 'invalid' order.
            rawDate: isValidDate ? orderTimestamp : new Date(),
            total: orderTotal.toFixed(2),
            items: filteredItems.map((item) => ({
              product: item.product || item.name || "N/A",
              quantity: item.quantity || 0,
              size: item.size || "N/A",
              price: parseFloat(item.price) || 0,
              status: item.status || "Pending",
            })),
          };
        })
        .filter(order => order.items.length > 0);

      const groupedOrders = processedIndividualOrders.reduce((acc, order) => {
        const dateKey = order.displayDate; // Use the (potentially adjusted) formatted date as the key
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(order);
        return acc;
      }, {});

      for (const date in groupedOrders) {
        groupedOrders[date].sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
      }

      const sortedDateKeys = Object.keys(groupedOrders).sort((a, b) => {
        const [aDay, aMonth, aYear] = a.split('/').map(Number);
        const [bDay, bMonth, bYear] = b.split('/').map(Number);
        const dateA = new Date(aYear, aMonth - 1, aDay);
        const dateB = new Date(bYear, bMonth - 1, bDay);
        return dateB.getTime() - dateA.getTime();
      });

      const finalGroupedOrders = {};
      sortedDateKeys.forEach(key => {
        finalGroupedOrders[key] = groupedOrders[key];
      });

      setOrdersGroupedByDate(finalGroupedOrders);
    } catch (e) {
      console.error("Fetch error:", e);
      setError(
        "Unable to load orders, please try again. " +
          (e.message || "Unknown error") +
          (e.response?.data?.message ? ` (Server: ${e.response.data.message})` : '')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-GB');

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#212529",
        color: "#f8f9fa",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Navbar />

      <div className="container mt-5 py-5">
        <div className="mb-4">
          <Link to="/menu" className="btn btn-link text-warning text-decoration-none fs-5">
            ← Back to Home
          </Link>
        </div>

        <h3
          className="fs-2 fw-bold mb-4 text-warning"
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
        ) : Object.keys(ordersGroupedByDate).length > 0 ? (
          <div>
            {Object.keys(ordersGroupedByDate).map(date => (
              <div key={date} className="mb-5">
                <h4 className="text-center text-info mb-4 p-2 rounded" style={{ backgroundColor: '#495057', border: '1px solid #ffc107' }}>
                  {date === todayFormatted ? "Today's Orders" : `Orders on ${date}`}
                </h4>
                <div className="row row-cols-1 g-4">
                  {ordersGroupedByDate[date].map((order) => (
                    <div className="col-12" key={order._id}>
                      <div
                        className="card text-white mb-3"
                        style={{ backgroundColor: "#343a40", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
                      >
                        <div className="card-header border-bottom border-warning d-flex justify-content-between align-items-center py-3 px-4">
                          <h5 className="mb-0 text-warning">
                            Order ID: <span className="text-white">{order._id.substring(0, 8)}...</span>
                          </h5>
                          {/* Use order.displayTime directly, as displayDate is handled by the group header */}
                          <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
                            {order.displayTime}
                          </span>
                        </div>
                        <div className="card-body px-4 py-3">
                          <h6 className="card-subtitle mb-3 text-warning fw-bold">
                            Order Items:
                          </h6>
                          <ul className="list-group list-group-flush">
                            {order.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                style={{ backgroundColor: "#495057", color: "#f8f9fa", borderBottom: '1px solid rgba(255,255,255,0.1)' }}
                              >
                                <div>
                                  <strong className="text-white">{item.product}</strong>{" "}
                                  <span className="text-muted">
                                    ({item.size}, Qty: {item.quantity})
                                  </span>
                                </div>
                                <span className="badge bg-success rounded-pill fs-6 px-3 py-2">
                                  ₹{item.price.toFixed(2)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center bg-dark border-top border-warning py-3 px-4">
                          <strong className="text-warning fs-5">
                            Order Total:
                          </strong>
                          <span className="text-success fs-4 fw-bold">
                            ₹{order.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center mt-4">No orders to display or all items were invalid.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;