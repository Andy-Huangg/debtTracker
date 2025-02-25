import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateTransactionModal from "../modals/CreateTransactionModal";
import TransactionList from "../Transaction";
import CloseDebtModal from "../modals/CloseDebtModal";
import RedirectButton from "../RedirectButton";

export default function DebtBySlug() {
  const { slug } = useParams();
  const [debt, setDebt] = useState(null);
  const [transactionModalIsOpen, setTransactionModalIsOpen] = useState(false);
  const [closeDebtModalIsOpen, setCloseDebtModalIsOpen] = useState(false);

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

  const openTransactionModal = () => {
    setTransactionModalIsOpen(true);
  };

  const closeTransactionModal = () => {
    setTransactionModalIsOpen(false);
    fetchDebtDetails();
  };

  const openCloseDebtModal = () => {
    setCloseDebtModalIsOpen(true);
  };

  const closeDebtModal = () => {
    setCloseDebtModalIsOpen(false);
  };

  if (!debt) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-start space-x-8 p-8">
      <div className="flex-grow max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <div>
          <h1>Title: {debt.title}</h1>
          <h1>Status: {debt.status}</h1>
          <pre>
            Description:
            <br></br>
            {debt.description}
          </pre>
          <br></br>
          <h1>
            <strong>${debt.amountOwed} </strong>Is owed to {debt.user.name}
          </h1>
        </div>
        <h2>Transaction History</h2>
        <TransactionList transactions={debt.transactions} />
      </div>
      {debt.currentUserId === debt.userId && debt.status === "OPEN" && (
        <div className="flex-shrink-0 w-64 bg-slate-100 p-8 rounded-2xl shadow-lg">
          <button
            onClick={openTransactionModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Create Transaction
          </button>
          <button
            onClick={openCloseDebtModal}
            className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close debt
          </button>
        </div>
      )}

      <CreateTransactionModal
        isOpen={transactionModalIsOpen}
        onRequestClose={closeTransactionModal}
        slug={slug}
      />
      <CloseDebtModal
        isOpen={closeDebtModalIsOpen}
        onRequestClose={closeDebtModal}
        slug={slug}
      />
    </div>
  );
}
