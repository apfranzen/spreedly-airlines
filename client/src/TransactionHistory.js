import React, { useState, useEffect } from "react";
import { fetchSpreedly } from "./api";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    async function loadResults() {
      const result = await fetchSpreedly("/transactions", "GET");
      setTransactions(result);
    }
    loadResults();
  }, []);
  return (
    <div>
      <h1>TransactionHistory</h1>
      <ul>
        {transactions &&
          transactions.map((transaction, idx) => (
            <li>
              {`type: ${transaction.transaction_type}, token: ${
                transaction.token
              }, succeeded: ${transaction.succeeded ? "yes" : "no"}, message: ${
                transaction.message
              }`}
            </li>
          ))}
      </ul>
    </div>
  );
}

function TransactionHistory() {
  const [view, setView] = useState(false);
  return (
    <div>
      <button
        onClick={e => {
          setView(!view);
        }}
      >
        Load Transaction History
      </button>

      {view && <TransactionList />}
    </div>
  );
}

export default TransactionHistory;
