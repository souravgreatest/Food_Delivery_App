import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Cart() {
  const navigate=useNavigate();
  const data = useCart();
  const dispatch = useDispatchCart();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleRemoveItem = (index) => {
    dispatch({ type: "Remove", index });
    toast.info("Item removed from cart!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handleCheckOut = () => {
    setShowPaymentModal(true); // Show dummy payment modal
  };

  const handleDummyPayment = async () => {
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
        toast.success("🎉 Payment successful! Order placed.", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });
        navigate("/myorder");
      } else {
        toast.error("Failed to place order. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error during dummy checkout:", error);
      toast.error("Server error. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setShowPaymentModal(false); // Close the modal after payment
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

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
        <ToastContainer />
        <div className="m-5 text-center fs-3 text-amber-300">
          Your Cart is Empty! Add some deliciousness!
        </div>
      </div>
    );
  }

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
      <ToastContainer />
      <div
        className="container p-4 rounded"
        style={{
          backgroundColor: "#343a40",
          boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
        }}
      >
        <h3 className="fs-2 fw-bold mb-4 text-warning text-center">
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
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Z" />
                      <path d="M8 5.5A.5.5 0 0 1 8.5 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Z" />
                      <path d="M10.5 5.5A.5.5 0 0 1 11 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H2.5a1 1 0 0 1 0-2h3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1ZM4.118 4H11.88L12 4.06V13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4.06L4.118 4Z" />
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
          <button
            className="btn btn-warning btn-lg fw-bold text-dark mt-3"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>

      {/* Dummy Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Dummy Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <p>Total to pay: ₹{totalPrice.toFixed(2)}</p>
          <p>This is a dummy payment screen. Click "Pay Now" to simulate success.</p>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleDummyPayment}>
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
