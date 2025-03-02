import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateTransactionModal from "../modals/CreateTransactionModal";
import TransactionList from "../Common/Transaction";
import CloseDebtModal from "../modals/CloseDebtModal";
import RedirectButton from "../Common/RedirectButton";
import EditDebtModal from "../modals/EditDebtModal";
import Header from "../Common/Header";
import Layout from "../Common/LayOut";

export default function DebtBySlug() {
  const { slug } = useParams();
  const [debt, setDebt] = useState(null);
  const [transactionModalIsOpen, setTransactionModalIsOpen] = useState(false);
  const [closeDebtModalIsOpen, setCloseDebtModalIsOpen] = useState(false);
  const [editDebtModalIsOpen, setEditDebtModalIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  const fetchDebtDetails = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/debts/${slug}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
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
    fetchDebtDetails();
  };

  const openEditDebtModal = () => {
    setEditDebtModalIsOpen(true);
  };

  const closeEditDebtModal = () => {
    setEditDebtModalIsOpen(false);
    fetchDebtDetails();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        setCopySuccess("Link copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy link");
      }
    );
  };

  if (!debt) {
    return (
      <div>
        <Header>Loading...</Header>
      </div>
    );
  }

  return (
    <Layout>
      <div className="flex justify-center items-start space-x-8 p-8">
        <div className="flex-grow max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
          <div>
            <div className="flex justify-between">
              <h1>
                Title: <strong>{debt.title}</strong>
              </h1>
              <h1>
                Status: <strong>{debt.status}</strong>
              </h1>
            </div>
            <pre className="font-sans">
              Description:
              <br></br>
              <strong>{debt.description}</strong>
            </pre>
            <br></br>
            <h1>
              <strong>${debt.amountOwed} </strong>Is owed to{" "}
              <strong>{debt.user.userName}</strong>
            </h1>
          </div>
          <div className="flex justify-between mt-4 mb-4">
            <h2>Transaction History</h2>
            <h2>Created on: {new Date(debt.createdAt).toLocaleString()}</h2>
          </div>
          {debt ? (
            <TransactionList transactions={debt.transactions} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="flex-shrink-0 w-96">
          {debt.currentUserId === debt.userId && (
            <div className="flex-shrink-0 w-64 bg-slate-100 p-8 rounded-2xl shadow-lg">
              <RedirectButton redirectUrl={"/dashboard"}>
                Back to Dashboard
              </RedirectButton>
              {debt.currentUserId === debt.userId && debt.status === "OPEN" && (
                <div>
                  <button
                    onClick={openEditDebtModal}
                    className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit debt details
                  </button>
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
            </div>
          )}
          <div className="mt-4 bg-slate-100 p-8 rounded-2xl shadow-lg">
            <h2 className="font-bold mb-2">Share this debt for viewing</h2>
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="w-full p-2 border rounded-l-lg"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Copy
              </button>
            </div>
            {copySuccess && (
              <p className="mt-2 text-green-500">{copySuccess}</p>
            )}
          </div>
        </div>
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
        <EditDebtModal
          isOpen={editDebtModalIsOpen}
          onRequestClose={closeEditDebtModal}
          slug={slug}
          debt={debt}
        />
      </div>
    </Layout>
  );
}
