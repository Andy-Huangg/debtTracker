import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import customStyles from "./ModalStyles";
Modal.setAppElement("#root");

export default function EditDebtModal({
  isOpen,
  onRequestClose,
  debt,
  slug,
  onEditDebt,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (debt) {
      setTitle(debt.title);
      setDescription(debt.description);
    }
  }, [debt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    const updatedData = {
      title,
      description,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/debts/${slug}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit debt");
      }

      onEditDebt(updatedData);

      onRequestClose();
    } catch (error) {
      console.error("Error editing debt:", error);
      alert("Error editing debt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Debt"
      style={customStyles}
    >
      <h2>
        <strong>Edit Debt Details</strong>
      </h2>
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
          disabled={isSubmitting}
        />
        <label htmlFor="description">Debt Description</label>
        <textarea
          id="description"
          rows="4"
          placeholder="Enter updated description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          disabled={isSubmitting}
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
      <button
        onClick={onRequestClose}
        className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        disabled={isSubmitting}
      >
        Cancel
      </button>
    </Modal>
  );
}
