import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Debts() {
  const [debts, setDebts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDebts = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5000/api/debts/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch debts");

        const data = await response.json();
        setDebts(data);
      } catch (error) {
        console.error("Error fetching debts:", error);
      }
    };

    fetchDebts();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Debts owing to you</h2>
      <ul>
        {debts.map((debt) => (
          <li
            key={debt.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/debts/${debt.slug}`)}
          >
            <strong>{debt.title}</strong> - ${debt.amountOwed} Owed
          </li>
        ))}
      </ul>
    </div>
  );
}
