import { useState, useEffect } from "react";

export default function BillShares() {
  const [billShares, setBills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/billShares/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Attaching the token here
          },
        });

        if (!res.ok) throw new Error("Failed to fetch billShares");
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
      <h1>Your Billshares</h1>
      <ul>
        {billShares.map((billShare) => (
          <li key={billShare.id}>
            {billShare.bill.title}
            <br></br>
            {billShare.bill.description}
            <br></br>
            Owing user ID: {billShare.bill.createdByUserId}
            <p>My User ID {billShare.userId}</p>
            {billShare.status} - ${billShare.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
