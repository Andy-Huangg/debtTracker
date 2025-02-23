import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateTransactionModal from "../CreateTransactionModal";

export default function DebtBySlug() {
  const { slug } = useParams();
  const [debt, setDebt] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchDebtDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/debts/${slug}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDebt(data);
    } catch (error) {
      console.error("Error fetching debt details", error);
    }
  };

  useEffect(() => {
    fetchDebtDetails();
  }, [slug]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchDebtDetails();
  };

  if (!debt) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start space-x-8 p-8">
      <div className="flex-grow max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <div>
          <h1>Title: {debt.title}</h1>
          <p>Description: {debt.description}</p>
          <br></br>
          <h1>
            <strong>${debt.amountOwed} </strong>Is owed to {debt.user.name}
          </h1>
        </div>
        {/** Add transaction history here*/}
        <h2>Transaction History</h2>
        <ul>
          <br></br>
          <br></br>
          {debt.transactions.map((transaction) => (
            <li key={transaction.id}>
              <p>Amount: ${transaction.amount}</p>
              <p>Type: {transaction.type}</p>
              <p>Description: {transaction.description}</p>
              <p>Date: {new Date(transaction.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
        <div></div>
      </div>
      {debt.currentUserId === debt.userId && (
        <div className="flex-shrink-0 w-64 bg-slate-100 p-8 rounded-2xl shadow-lg">
          <button
            onClick={openModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Create Transaction
          </button>
        </div>
      )}

      <CreateTransactionModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        slug={slug}
      />
    </div>
  );
}
