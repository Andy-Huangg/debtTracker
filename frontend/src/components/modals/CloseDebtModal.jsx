import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import customStyles from "./ModalStyles";
Modal.setAppElement("#root");

export default function CloseDebtModal({
  isOpen,
  onRequestClose,
  slug,
  onCloseDebt,
}) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/debts/${slug}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ status: "CLOSED" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to close debt");
      }

      const debt = await response.json();
      onRequestClose();
      onCloseDebt(debt);
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
      <p>
        <p>
          <strong>
            <u>Are you sure you want to close this debt?</u>
          </strong>
          <br></br> This action is irreversible and will prevent further edits
          or transactions.
        </p>
      </p>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleSubmit}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
        >
          Yes, Close Debt
        </button>
        <button
          onClick={onRequestClose}
          className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
