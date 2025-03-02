import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import RedirectButton from "../Common/RedirectButton";
import { useNavigate } from "react-router-dom";
import Layout from "../Common/LayOut";

export default function CreateDebt() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amountOwed, setAmountOwed] = useState("");
  useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const debtData = {
      title,
      description,
      amountOwed: parseFloat(amountOwed),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/debts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(debtData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create debt");
      }

      const data = await response.json();

      navigate(`/debts/${data.newDebt.slug}`);
      setTitle("");
      setDescription("");
      setAmountOwed("");
    } catch (error) {
      console.error("Error creating debt:", error);
      alert("Error creating debt");
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Create a New Debt</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Debt Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <textarea
            className="w-full p-2 border rounded mb-2"
            rows="4"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="number"
            placeholder="Amount Owed"
            value={amountOwed}
            onChange={(e) => setAmountOwed(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            required
          />

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-green-500 text-white rounded"
          >
            Create Debt
          </button>
        </form>

        <RedirectButton redirectUrl={"/Dashboard"}>
          Back to Dashboard
        </RedirectButton>
      </div>
    </Layout>
  );
}
