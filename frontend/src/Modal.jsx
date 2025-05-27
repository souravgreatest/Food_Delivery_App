import React from "react";
import ReactDom from "react-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "#2c3034", // Darker background for the modal content
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "90%",
  width: "90%",
  borderRadius: "8px", // Rounded corners for consistency
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)", // Enhanced shadow
  display: "flex", // Use flex for better content control
  flexDirection: "column",
  padding: "20px", // Add some padding inside the modal
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .85)", // Slightly darker overlay for more contrast
  zIndex: 999, // Z-index slightly lower than modal
};

export default function Modal({ children, onClose }) {
  // Ensure the cart-root element exists in your public/index.html
  const modalRoot = document.getElementById("cart-root");
  if (!modalRoot) {
    console.error("Element with id 'cart-root' not found. Modal will not render.");
    return null; // Don't render if the root element isn't there
  }

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className="btn btn-warning fs-5 fw-bold text-dark" // Styled with theme colors
          style={{
            position: "absolute", // Position relative to modal
            top: "10px", // Adjust positioning
            right: "10px", // Adjust positioning
            padding: "5px 12px", // Adjust padding for a smaller 'X' button
            borderRadius: "50%", // Make it circular
            width: "35px", // Fixed width for circular shape
            height: "35px", // Fixed height for circular shape
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1", // Align 'X' perfectly
            border: "none", // Remove border
          }}
          onClick={onClose}
        >
          X
        </button>
        <div style={{ flexGrow: 1, overflowY: "auto" }}> {/* Allow content to scroll if it overflows */}
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
}