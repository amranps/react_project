import { useState } from "react";
import './money.css'

function Money() {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
  const amount = Number(expense);

  if (amount > 0) {
    if (totalExpense + amount > budget) {
      alert("Expense exceeds remaining budget!");
      return;
    }

    const newExpense = {
      amount,
      category,
      date: new Date().toLocaleDateString(),
    };

    setExpenses([...expenses, newExpense]);
    setExpense("");
  }
};

  const clearAll = () => {
    setExpenses([]);
  };

  const totalExpense = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  const budget = Number(monthlyBudget) || 0;
  const remainingBudget = budget - totalExpense;

  const percentageUsed =
  budget > 0 ? (totalExpense / budget) * 100 : 0;

  let status = "Safe";
  
  if(percentageUsed>= 50) {
    status= "Use carefully";
  }

  if (percentageUsed >= 70) {
    status = "Warning";
  }

  if (percentageUsed >= 100) {
    status = "Over Budget";

  }

  return (
    <div className="container">
      <h1> Personal Budget Tracker</h1>

      <p>Date: {new Date().toLocaleDateString()}</p>

      <div className="budget-input-card">
        <h2>Set Monthly Budget</h2>

        <input
  type="number"
  min="0"
  placeholder="Enter Monthly Budget"
  value={monthlyBudget}
  onChange={(e) =>
    setMonthlyBudget(
      e.target.value === "" ? "" : Math.max(0, Number(e.target.value))
    )
  }
  className="input-field"
/>
      </div>

      <div className="cards-container">
        <div className="card">
          <h2>Monthly Budget</h2>

          <h3>₹{budget}</h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: Math.min(percentageUsed,100) + "%"
              }}
            ></div>
          </div>

          <p><strong>Total Expenses:</strong> ₹{totalExpense}</p>

          <p><strong>Remaining Budget:</strong> ₹{remainingBudget}</p>

          <p><strong>Budget Used:</strong> {percentageUsed.toFixed(1)}%</p>

          <p>
  <strong>Status:</strong>{" "}
  <span
    className={
      status === "Use carefully"
        ? "status-caution"
        : status === "Warning"
        ? "status-warning"
        : status === "Over Budget"
        ? "status-overbudget"
        : "status-safe"
    }
  >
    {status}
  </span>
</p>
        </div>

        <div className="card">
          <h2>Add Expense</h2>

          <input
          type="number"
          min="0"
          placeholder="Enter Amount"
          value={expense}
          onChange={(e) =>
          setExpense(
          e.target.value === "" ? "" : Math.max(0, Number(e.target.value))
    )
  }
  className="input-field"
/>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Bills</option>
          </select>

          <button onClick={addExpense} className="btn">
            Add Expense
          </button>

          <button onClick={clearAll} className="btn">
            Clear All
          </button>
        </div>
      </div>

      <div className="history-card">
        <h2>Expense History</h2>

        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.category}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Money;