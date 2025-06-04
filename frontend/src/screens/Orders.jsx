import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Helper function to safely extract number from MongoDB extended JSON or direct value
const getNumberValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    if (value.$numberInt !== undefined) {
      return parseInt(value.$numberInt, 10);
    }
    if (value.$numberDouble !== undefined) {
      return parseFloat(value.$numberDouble);
    }
  }
  // Fallback for direct numbers or string numbers if not in extended JSON format
  return parseFloat(value);
};

const Orders = () => {
  const [orderedItemGroups, setOrderedItemGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let email = null;
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          email = typeof parsed === "object" && parsed !== null && parsed.email
            ? parsed.email
            : String(parsed);
        } catch (e) {
          email = storedUser;
        }
      }

      if (!email) {
        setError("User email not found. Please log in to view your orders.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/auth/orders", {
        params: { email },
      });

      const fetchedBackendOrders = Array.isArray(response.data)
        ? response.data
        : response.data?.orders || [];

      const allItemGroups = [];

      fetchedBackendOrders
        .filter(order => order.email === email)
        .forEach(order => {
          const orderDate = new Date(order.createdAt);
          const validDate = !isNaN(orderDate.getTime());

          const displayDate = validDate ? orderDate.toLocaleDateString("en-GB") : null;
          const displayTime = validDate
            ? orderDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
            : null;

          if (Array.isArray(order.order_data)) {
            order.order_data.forEach((itemGroupArray, groupIndex) => {
              // --- ADDED CHECK HERE ---
              if (!Array.isArray(itemGroupArray)) {
                console.warn(`Skipping non-array element in order_data for order ID ${order._id}:`, itemGroupArray);
                return; // Skip this iteration if itemGroupArray is not an array
              }
              // --- END ADDED CHECK ---

              const validItemsInGroup = [];
              let groupTotal = 0;

              itemGroupArray.forEach(item => {
                const quantity = getNumberValue(item.quantity);
                const price = getNumberValue(item.price);
                const productName = (item.product || item.name || "").trim();
                const size = item.size || null;

                if (
                  productName &&
                  productName.toLowerCase() !== "n/a" &&
                  !isNaN(quantity) && quantity > 0 &&
                  !isNaN(price) && price > 0
                ) {
                  validItemsInGroup.push({
                    id: item.id,
                    product: productName,
                    quantity: quantity,
                    size: size,
                    price: price,
                  });
                  groupTotal += price;
                }
              });

              if (validItemsInGroup.length > 0) {
                allItemGroups.push({
                  key: `${order._id}-${groupIndex}`,
                  originalOrderId: order._id,
                  groupItems: validItemsInGroup,
                  groupTotal: groupTotal.toFixed(2),
                  displayDate: displayDate,
                  displayTime: displayTime,
                  rawDate: validDate ? orderDate : new Date(),
                });
              }
            });
          }
        });

      allItemGroups.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

      setOrderedItemGroups(allItemGroups);
    } catch (e) {
      console.error("Error fetching orders:", e);
      setError(
        "Unable to load orders. Please try again. " +
        (e.response?.data?.message || e.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
          style={{ fontFamily: "Pacifico, cursive", textShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
        >
          Your Purchases
        </h3>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading your purchases...</p>
          </div>
        ) : orderedItemGroups.length > 0 ? (
          <div className="row row-cols-1 g-4">
            {orderedItemGroups.map((itemGroup, index) => (
              <div className="col-12" key={itemGroup.key}>
                <div
                  className="card text-white mb-3"
                  style={{ backgroundColor: "#343a40", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
                >
                  <div className="card-header border-bottom border-warning d-flex justify-content-between align-items-center py-3 px-4">
                    <h5 className="mb-0 text-warning">
                      Purchase #{index + 1}
                    </h5>
                    {itemGroup.displayDate && (
                      <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
                        {itemGroup.displayDate} {itemGroup.displayTime}
                      </span>
                    )}
                  </div>
                  <div className="card-body px-4 py-3">
                    <h6 className="card-subtitle mb-3 text-warning fw-bold">Items in this purchase:</h6>
                    <ul className="list-group list-group-flush">
                      {itemGroup.groupItems.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="list-group-item d-flex justify-content-between align-items-center"
                          style={{ backgroundColor: "#495057", color: "#f8f9fa", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          <div>
                            <strong className="text-white">{item.product}</strong>{" "}
                            <span className="text-muted">
                              ({item.size ? item.size : "N/A Size"}, Qty: {item.quantity})
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
                    <strong className="text-warning fs-5">Total for this Purchase:</strong>
                    <span className="text-success fs-4 fw-bold">₹{itemGroup.groupTotal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center mt-4">No valid purchases to display.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;