import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    backgroundColor: "white",
    width: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};
export default function CloseDebtModal({ isOpen, onRequestClose, slug }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/debts/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status: "CLOSED" }),
      });

      if (!response.ok) {
        throw new Error("Failed to close debt");
      }

      onRequestClose();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error closing debt:", error);
      alert("Error closing debt");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Close Debt"
      style={customStyles}
    >
      <h2>Confirm Debt Closure</h2>
      <p>
        Are you sure you want to close this debt? This action cannot be undone.
      </p>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleSubmit}
          className="p-2 bg-red-500 text-white rounded"
        >
          Yes, Close Debt
        </button>
        <button
          onClick={onRequestClose}
          className="p-2 bg-gray-300 text-black rounded"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
