import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateTransactionModal from "../modals/CreateTransactionModal";
import TransactionList from "../Common/Transaction";
import CloseDebtModal from "../modals/CloseDebtModal";
import RedirectButton from "../Common/RedirectButton";
import EditDebtModal from "../modals/EditDebtModal";
import Layout from "../Common/LayOut";

export default function DebtBySlug() {
  const { slug } = useParams();
  const [debt, setDebt] = useState(null);
  const [transactionModalIsOpen, setTransactionModalIsOpen] = useState(false);
  const [closeDebtModalIsOpen, setCloseDebtModalIsOpen] = useState(false);
  const [editDebtModalIsOpen, setEditDebtModalIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [fabOpen, setFabOpen] = useState(false);

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
      <Layout>
        <div className="flex justify-center items-center flex-grow">
          <div role="status" className="mt-8">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex h-screen xl:flex-row flex-col">
        <div className="xl:w-1/5"></div>
        <div className="flex-grow p-4 bg-white shadow-md rounded-lg ">
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
        <div className="xl:w-1/3 hidden xl:block ">
          <div className="flex-shrink-0 w-96 ml-5">
            {debt.currentUserId === debt.userId && (
              <div className="flex-shrink-0 w-64 bg-slate-100 p-8 rounded-2xl shadow-lg">
                <RedirectButton redirectUrl={"/dashboard"}>
                  Back to Dashboard
                </RedirectButton>
                {debt.currentUserId === debt.userId &&
                  debt.status === "OPEN" && (
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
      </div>

      {/* Floating Action Button for Mobile */}

      {debt.currentUserId === debt.userId && (
        <div className="fixed bottom-4 right-4 block xl:hidden">
          <button
            onClick={() => setFabOpen(!fabOpen)}
            className={`bg-blue-500 text-white w-16 h-16 shadow-lg hover:bg-blue-600 transition flex items-center justify-center text-4xl ${
              fabOpen ? "rounded-lg" : "rounded-full"
            }`}
          >
            {fabOpen ? "×" : "+"}
          </button>
          {fabOpen && (
            <div className="mt-2 space-y-2">
              <button
                onClick={openEditDebtModal}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Edit debt details
              </button>
              <button
                onClick={openTransactionModal}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Create Transaction
              </button>
              <button
                onClick={copyToClipboard}
                className={`w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
                  copySuccess ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {copySuccess ? "Link Copied!" : "Share Debt"}
              </button>
              <button
                onClick={openCloseDebtModal}
                className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Close debt
              </button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
