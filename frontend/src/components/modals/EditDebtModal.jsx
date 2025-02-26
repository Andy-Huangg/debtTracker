import React, { useState, useEffect } from "react";
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
export default function EditDebtModal({ isOpen, onRequestClose, debt, slug }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (debt) {
      setTitle(debt.title);
      setDescription(debt.description);
    }
  }, [debt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updatedData = {
      title,
      description,
    };
    try {
      const response = await fetch(`http://localhost:5000/api/debts/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to edit debt");
      }
      onRequestClose();
    } catch (error) {
      console.error("Error editing debt:", error);
      alert("Error editing debt");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Debt"
      style={customStyles}
    >
      <h2>Edit Debt Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Debt Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter updated title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded mb-2"
        />
        <label htmlFor="description">Debt Description</label>
        <textarea
          id="description"
          rows="4"
          placeholder="Enter updated description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-green-500 text-white rounded"
        >
          Save Changes
        </button>
      </form>
      <button
        onClick={onRequestClose}
        className="mt-4 w-full p-2 bg-gray-300 text-black rounded"
      >
        Cancel
      </button>
    </Modal>
  );
}
