import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RedirectButton from "./RedirectButton";
import CreateDebtModal from "../modals/CreateDebtModal";

export default function Debts() {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [createDebtModalIsOpen, setCreateDebtModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDebts = async () => {
      const token = localStorage.getItem("token");
      const cachedDebts = localStorage.getItem("debts");

      if (cachedDebts) {
        setDebts(JSON.parse(cachedDebts));
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/debts`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch debts");

          const data = await response.json();
          setDebts(data);
          localStorage.setItem("debts", JSON.stringify(data));
        } catch (error) {
          console.error("Error fetching debts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDebts();
  }, []);

  const openDebts = debts.filter((debt) => debt.status === "OPEN");
  const closedDebts = debts.filter((debt) => debt.status === "CLOSED");

  const openCreateDebtModal = () => {
    setCreateDebtModalIsOpen(true);
  };

  const closeCreateDebtModal = () => {
    setCreateDebtModalIsOpen(false);
  };

  const handleCreateDebt = (newDebt) => {
    const updatedDebts = [...debts, newDebt];
    setDebts(updatedDebts);
    localStorage.setItem("debts", JSON.stringify(updatedDebts));
  };

  if (loading) {
    return (
      <div className="fade-in">
        <div className="flex justify-evenly mb-4">
          <div
            className={`flex-1 text-center p-4 cursor-pointer bg-stone-200 ${
              activeTab === 1 ? "" : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab(1)}
          >
            <h2
              className={`text-xl font-bold ${
                activeTab === 1 ? "text-blue-500" : ""
              }`}
            >
              Open Debts
            </h2>
          </div>
          <div className="w-px bg-gray-400"></div>
          <div
            className={`flex-1 text-center p-4 cursor-pointer bg-stone-200 ${
              activeTab === 2 ? "" : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab(2)}
          >
            <h2
              className={`text-xl font-bold ${
                activeTab === 2 ? "text-blue-500" : ""
              }`}
            >
              Closed Debts
            </h2>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={openCreateDebtModal}
            className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Create Debt
          </button>
        </div>
        <div className="flex justify-center">
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
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-evenly mb-4">
        <div
          className={`flex-1 text-center p-4 cursor-pointer bg-stone-200 ${
            activeTab === 1 ? "" : "hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab(1)}
        >
          <h2
            className={`text-xl font-bold ${
              activeTab === 1 ? "text-blue-500" : ""
            }`}
          >
            Open Debts
          </h2>
        </div>
        <div className="w-px bg-gray-400"></div>
        <div
          className={`flex-1 text-center p-4 cursor-pointer bg-stone-200 ${
            activeTab === 2 ? "" : "hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab(2)}
        >
          <h2
            className={`text-xl font-bold ${
              activeTab === 2 ? "text-blue-500" : ""
            }`}
          >
            Closed Debts
          </h2>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={openCreateDebtModal}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Create Debt
        </button>
      </div>

      {activeTab === 1 ? (
        openDebts.length > 0 ? (
          <ul>
            {openDebts.map((debt) => (
              <li
                key={debt.id}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/debts/${debt.slug}`)}
              >
                <div className="flex justify-between">
                  <strong>{debt.title}</strong>{" "}
                  <strong>${debt.amountOwed} Owed</strong>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No open debts. Create one now to get started!
          </p>
        )
      ) : closedDebts.length > 0 ? (
        <>
          <ul>
            {closedDebts.map((debt) => (
              <li
                key={debt.id}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/debts/${debt.slug}`)}
              >
                <div className="flex justify-between">
                  <strong>{debt.title}</strong>{" "}
                  <strong>${debt.amountOwed} Owed</strong>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center text-gray-500">
          You currently have no closed debts. Once a debt is marked as closed,
          it will appear here.
        </p>
      )}
      <CreateDebtModal
        isOpen={createDebtModalIsOpen}
        onRequestClose={closeCreateDebtModal}
        onCreateDebt={handleCreateDebt}
      />
    </div>
  );
}
