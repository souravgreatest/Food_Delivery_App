import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  // Handle empty cart display with consistent styling
  if (data.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#212529", // Dark theme background
          color: "#f8f9fa",     // Light text color
          fontFamily: "Montserrat, sans-serif",
          display: "flex", // Use flexbox to center content
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" /> {/* ToastContainer for notifications */}
        <div className="m-5 text-center fs-3 text-muted">The Cart is Empty!</div>
      </div>
    );
  }

  // --- Horizontal Rule ---

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("user");

    try {
      let response = await axios.post(
        "http://localhost:5000/api/auth/orderData",
        {
          order_data: data,
          email: userEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        dispatch({ type: "Drop" });
        // Success toast notification
        toast.success("Order placed successfully! 🎉", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
         // Handle non-201 success codes if any
         toast.error("Failed to place order. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      
    } catch (error) {
      console.error("Error during checkout:", error); 
      // Error toast notification
      toast.error("Failed to place order. Server error.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // --- Horizontal Rule ---

  // Function to handle item removal and show toast
  const handleRemoveItem = (index) => {
    dispatch({ type: "Remove", index });
    toast.info("Item removed from cart!", {
      position: "top-right",
      autoClose: 2000, // Shorter autoClose for removal
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#212529", // Dark theme background
        color: "#f8f9fa",     // Light text color
        fontFamily: "Montserrat, sans-serif",
        paddingTop: "5rem", // Add padding to account for potential fixed navbar
        paddingBottom: "5rem", // Add padding for footer area
      }}
    >
      {/* ToastContainer must be rendered once in your app, typically at the root or component where toasts are triggered */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <div className="container p-4 rounded" style={{ backgroundColor: "#343a40", boxShadow: "0 5px 15px rgba(0,0,0,0.4)" }}> {/* Card-like container */}
        <h3
          className="fs-2 fw-bold mb-4 text-warning text-center" // Centered and styled heading
          style={{ fontFamily: 'Pacifico, cursive', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
        >
          Your Shopping Cart
        </h3>

        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover table-bordered mt-3">
            <thead className="table-warning"> {/* Yellow header */}
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((food, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{food.size}</td>
                  <td>₹{food.price.toFixed(2)}</td> {/* Indian Rupee symbol, 2 decimal places */}
                  <td>
                    <svg
                      onClick={() => handleRemoveItem(index)} // Call the new handler
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash text-danger" // Default red color for trash icon
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer", transition: "color 0.2s ease" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#dc3545")} // Darker red on hover
                      onMouseOut={(e) => (e.currentTarget.style.color = "#dc3545")} // Reset to default red
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-4 fs-4 fw-bold text-end text-warning"> {/* Right-aligned total price */}
          Total Price: ₹{totalPrice.toFixed(2)}/-
        </h3>

        <div className="d-flex justify-content-end"> {/* Right-aligned button */}
          <button className="btn btn-warning btn-lg fw-bold text-dark mt-3" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}