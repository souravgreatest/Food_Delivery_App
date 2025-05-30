import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const navigate=useNavigate();

  if (data.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#212529",
          color: "yellow",
          fontFamily: "Montserrat, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <div className="m-5 text-center fs-3 text-amber-300">Your Cart is Empty! Add some deliciousness!</div>
      </div>
    );
  }

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
        toast.success("Order placed successfully! 🎉", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => navigate("/myorder")
        });
      } else {
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

  const handleRemoveItem = (index) => {
    dispatch({ type: "Remove", index });
    toast.info("Item removed from cart!", {
      position: "top-right",
      autoClose: 2000,
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
        background: "#212529",
        color: "#f8f9fa",
        fontFamily: "Montserrat, sans-serif",
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <div className="container p-4 rounded" style={{ backgroundColor: "#343a40", boxShadow: "0 5px 15px rgba(0,0,0,0.4)" }}>
        <h3
          className="fs-2 fw-bold mb-4 text-warning text-center"
          style={{ fontFamily: 'Pacifico, cursive', textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
        >
          Your Shopping Cart
        </h3>

        <div className="table-responsive">
          <table className="table table-dark table-striped table-hover table-bordered mt-3">
            <thead className="table-warning">
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
                  <td>₹{food.price.toFixed(2)}</td>
                  <td>
                    <svg
                      onClick={() => handleRemoveItem(index)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash text-danger"
                      viewBox="0 0 16 16"
                      style={{ cursor: "pointer", transition: "color 0.2s ease" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "#dc3545")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "#dc3545")}
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

        <h3 className="mt-4 fs-4 fw-bold text-end text-warning">
          Total Price: ₹{totalPrice.toFixed(2)}/-
        </h3>

        <div className="d-flex justify-content-end">
          <button className="btn btn-warning btn-lg fw-bold text-dark mt-3" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}