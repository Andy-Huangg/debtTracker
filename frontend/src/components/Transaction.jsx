import React, { useState } from "react";

export default function TransactionList({ transactions }) {
  const [expandedTransactions, setExpandedTransactions] = useState({});

  const toggleTransaction = (id) => {
    setExpandedTransactions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id} className="mb-4">
          <div
            className="cursor-pointer p-4 bg-gray-100 rounded shadow-sm hover:bg-gray-200 transition"
            onClick={() => toggleTransaction(transaction.id)}
          >
            <div className="flex items-center justify-between">
              <p
                className={`mr-2 ${
                  transaction.type === "INCREASE"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {transaction.type === "INCREASE"
                  ? "Debt Increased"
                  : "Payment Made"}{" "}
                {transaction.type === "INCREASE" ? "↑" : "↓"} $
                {transaction.amount}
              </p>
              <p className="text-gray-600">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {expandedTransactions[transaction.id] && (
            <div className="p-4 bg-gray-200 rounded mt-2 shadow-inner">
              <p className="mb-2">
                <strong>Description:</strong> {transaction.description}
              </p>
              <p className="mb-2">
                <strong>Amount:</strong> ${transaction.amount}
              </p>
              <p className="mb-2">
                <strong>Type:</strong> {transaction.type}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
