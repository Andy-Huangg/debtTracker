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
      } catch (error) {
        console.error("Error fetching debts:", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Open Debts Owing to You</h2>
        Loading...
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
      ) : (
        closedDebts.length > 0 && (
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
        )
      )}
      <CreateDebtModal
        isOpen={createDebtModalIsOpen}
        onRequestClose={closeCreateDebtModal}
      ></CreateDebtModal>
    </div>
  );
}
