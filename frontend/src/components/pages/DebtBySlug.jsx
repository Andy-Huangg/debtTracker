import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DebtBySlug() {
  const { slug } = useParams();
  const [debt, setDebt] = useState(null);

  useEffect(() => {
    const fetchDebtDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:5000/api/debts/${slug}`,
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

    fetchDebtDetails();
  }, [slug]);

  if (!debt) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <h1>Your Debt</h1>
      <ul>
        <li key={debt.id}>
          {debt.title}
          {debt.description}
          <br></br>
          Owing user ID: {debt.userId}${debt.amountOwed}
        </li>
      </ul>
    </div>
  );
}
