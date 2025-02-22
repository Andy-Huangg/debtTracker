import React, { useState } from "react";
import Modal from "react-modal";

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

export default function CreateTransactionModal({
  isOpen,
  onRequestClose,
  slug,
}) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCREASE");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const transactionData = {
      amount: parseFloat(amount),
      type,
      description,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/debts/${slug}/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(transactionData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      setAmount("");
      setType("INCREASE");
      setDescription("");
      onRequestClose();
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Error creating transaction");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Transaction"
      style={customStyles}
    >
      <h2>Create Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="INCREASE">Increase</option>
          <option value="PAYMENT">Decrease</option>
        </select>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="4"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-green-500 text-white rounded"
        >
          Create Transaction
        </button>
      </form>
      <button
        onClick={onRequestClose}
        className="mt-4 w-full p-2 bg-red-500 text-white rounded"
      >
        Cancel
      </button>
    </Modal>
  );
}
