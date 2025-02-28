import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Debts() {
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
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

  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Open Debts Owing to You</h2>
        Loading...
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-evenly mb-4">
        <h2
          className={`text-xl font-bold cursor-pointer ${
            activeTab === 1 ? "text-blue-500 " : "hover:bg-blue-100 rounded"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Open Debts
        </h2>
        <h2
          className={`text-xl font-bold cursor-pointer ${
            activeTab === 2 ? "text-blue-500" : "hover:bg-blue-100 rounded"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Closed Debts
        </h2>
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
                  <strong>{debt.title}</strong> - ${debt.amountOwed} Owed
                </li>
              ))}
            </ul>
          </>
        )
      )}
    </div>
  );
}
