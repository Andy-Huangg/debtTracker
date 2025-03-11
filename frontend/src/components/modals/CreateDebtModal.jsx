import React, { useState } from "react";
import Modal from "react-modal";
import customStyles from "./ModalStyles";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

export default function CreateDebtModal({
  isOpen,
  onRequestClose,
  onCreateDebt,
}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amountOwed, setAmountOwed] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    const debtData = {
      title,
      description,
      amountOwed: parseFloat(amountOwed),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/debts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(debtData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create debt");
      }

      const data = await response.json();

      navigate(`/debts/${data.newDebt.slug}`);
      setTitle("");
      setDescription("");
      setAmountOwed("");
      onCreateDebt(data.newDebt);
      onRequestClose();
    } catch (error) {
      console.error("Error creating debt:", error);
      alert("Error creating debt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Debt"
      style={customStyles}
    >
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create a New Debt</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Debt Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
            disabled={isSubmitting}
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows="4"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          ></textarea>
          <input
            type="number"
            placeholder="Amount Owed"
            value={amountOwed}
            onChange={(e) => setAmountOwed(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
            disabled={isSubmitting}
          />

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Debt"}
          </button>
          <button
            onClick={onRequestClose}
            className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
}
