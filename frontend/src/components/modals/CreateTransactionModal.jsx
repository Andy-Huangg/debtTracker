import React, { useState } from "react";
import Modal from "react-modal";
import customStyles from "./ModalStyles";

Modal.setAppElement("#root");

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
        `${import.meta.env.VITE_API_URL}/api/debts/${slug}/transactions`,
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
        <label>Transaction Amount</label>
        <input
          type="number"
          placeholder="Enter the transaction amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <label>Transaction Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="PAYMENT">Payment</option>
          <option value="INCREASE">Increase Debt</option>
        </select>
        <label>Description</label>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="4"
          placeholder="Enter a description for the transaction"
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
