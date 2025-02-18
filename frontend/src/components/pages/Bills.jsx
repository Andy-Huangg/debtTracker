import { useState, useEffect } from "react";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/bills/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Attaching the token here
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bills");

        const data = await res.json();
        setBills(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBills();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Your Bills</h1>
      <ul>
        {bills.map((bill) => (
          <li key={bill.id}>
            {bill.title}
            <br></br>
            {bill.description} - ${bill.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}
