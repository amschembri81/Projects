import React, { useState } from 'react';
import '../styling/Budget.css';

function Budget() {
  const [isExpanded, setIsExpanded] = useState(false);  // State to track whether the budget container is expanded
  const [income, setIncome] = useState([]);  // State to track income entries
  const [expenses, setExpenses] = useState([]);  // State to track expense entries
  const [budgets, setBudgets] = useState({});  // State to track budget limits for categories
  const [savingsGoal, setSavingsGoal] = useState(0);  // State to track the savings goal

  // Toggle the expanded/collapsed state of the budget container
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Add a new income entry
  const addIncome = (amount, source) => {
    setIncome([...income, { amount: parseFloat(amount), source }]);
  };

  // Add a new expense entry
  const addExpense = (amount, category) => {
    setExpenses([...expenses, { amount: parseFloat(amount), category, date: new Date() }]);
  };

  // Calculate the total income
  const calculateTotalIncome = () => {
    return income.reduce((total, entry) => total + entry.amount, 0);
  };

  // Calculate the total expenses
  const calculateTotalExpenses = () => {
    return expenses.reduce((total, entry) => total + entry.amount, 0);
  };

  // Calculate the net income (income - expenses)
  const calculateNetIncome = () => {
    return calculateTotalIncome() - calculateTotalExpenses();
  };

  // Set a budget limit for a specific category
  const setBudget = (category, amount) => {
    setBudgets({ ...budgets, [category]: parseFloat(amount) });
  };

  // Check if spending in a category is within the budget
  const checkBudgetStatus = (category) => {
    const categoryExpenses = expenses
      .filter((expense) => expense.category === category)
      .reduce((total, entry) => total + entry.amount, 0);
    return categoryExpenses <= budgets[category];
  };

  // Track spending by category
  const trackSpendingByCategory = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, entry) => total + entry.amount, 0);
  };

  // Track spending by date range
  const trackSpendingByDateRange = (startDate, endDate) => {
    return expenses
      .filter(
        (expense) =>
          new Date(expense.date) >= new Date(startDate) &&
          new Date(expense.date) <= new Date(endDate)
      )
      .reduce((total, entry) => total + entry.amount, 0);
  };

  // Generate a monthly report
  const generateMonthlyReport = (month) => {
    const monthlyExpenses = expenses.filter(
      (expense) => new Date(expense.date).getMonth() + 1 === month
    );
    const totalIncome = calculateTotalIncome();
    const totalExpenses = monthlyExpenses.reduce((total, entry) => total + entry.amount, 0);
    const netIncome = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netIncome,
    };
  };

  // Generate a report for a specific category
  const generateCategoryReport = (category) => {
    return expenses.filter((expense) => expense.category === category);
  };

  // Set the savings goal amount
  const setSavingsGoalAmount = (amount) => {
    setSavingsGoal(parseFloat(amount));
  };

  // Track progress towards the savings goal
  const trackSavingsProgress = () => {
    const netIncome = calculateNetIncome();
    return (netIncome / savingsGoal) * 100;
  };

  // Send a budget alert if spending exceeds the budget
  const sendBudgetAlert = (category) => {
    const status = checkBudgetStatus(category);
    if (!status) {
      alert(`Alert: Spending in ${category} has exceeded the budget!`);
    } else {
      alert(`You are within your budget for ${category}.`);
    }
  };

  // Send a notification about progress towards the savings goal
  const sendGoalProgressNotification = () => {
    const progress = trackSavingsProgress();
    if (progress >= 100) {
      alert('Congratulations! You have achieved your savings goal.');
    } else {
      alert(`You have reached ${progress.toFixed(2)}% of your savings goal.`);
    }
  };

  return (
    <div className={`budget-container ${isExpanded ? 'expanded' : 'collapsed'}`} onClick={toggleExpand}>
      <h2>Budget Manager</h2>
      {isExpanded && ( // Conditionally render content based on the expanded state
        <div className="budget-content">
          <div className="income-section">
            <h3>Add Income</h3>
            <input type="number" placeholder="Amount" id="income-amount" />
            <input type="text" placeholder="Source" id="income-source" />
            <button
              onClick={() =>
                addIncome(
                  document.getElementById('income-amount').value,
                  document.getElementById('income-source').value
                )
              }
            >
              Add Income
            </button>
          </div>

          <div className="expense-section">
            <h3>Add Expense</h3>
            <input type="number" placeholder="Amount" id="expense-amount" />
            <input type="text" placeholder="Category" id="expense-category" />
            <button
              onClick={() =>
                addExpense(
                  document.getElementById('expense-amount').value,
                  document.getElementById('expense-category').value
                )
              }
            >
              Add Expense
            </button>
          </div>

          <div className="totals-section">
            <h3>Totals</h3>
            <p>Total Income: ${calculateTotalIncome().toFixed(2)}</p>
            <p>Total Expenses: ${calculateTotalExpenses().toFixed(2)}</p>
            <p>Net Income: ${calculateNetIncome().toFixed(2)}</p>
          </div>

          <div className="savings-section">
            <h3>Savings Goal</h3>
            <input type="number" placeholder="Goal Amount" id="savings-goal" />
            <button
              onClick={() =>
                setSavingsGoalAmount(document.getElementById('savings-goal').value)
              }
            >
              Set Savings Goal
            </button>
            <button onClick={sendGoalProgressNotification}>Check Savings Progress</button>
          </div>

          <div className="tracking-section">
            <h3>Track Spending by Category</h3>
            <input type="text" placeholder="Category" id="track-category" />
            <button
              onClick={() =>
                alert(
                  `Total spending in ${document.getElementById('track-category').value}: $${trackSpendingByCategory(
                    document.getElementById('track-category').value
                  ).toFixed(2)}`
                )
              }
            >
              Track
            </button>
          </div>

          <div className="date-range-section">
            <h3>Track Spending by Date Range</h3>
            <input type="date" id="start-date" />
            <input type="date" id="end-date" />
            <button
              onClick={() =>
                alert(
                  `Total spending from ${document.getElementById('start-date').value} to ${document.getElementById('end-date').value}: $${trackSpendingByDateRange(
                    document.getElementById('start-date').value,
                    document.getElementById('end-date').value
                  ).toFixed(2)}`
                )
              }
            >
              Track
            </button>
          </div>

          <div className="alert-section">
            <h3>Check Budget Status</h3>
            <input type="text" placeholder="Category" id="alert-category" />
            <button onClick={() => sendBudgetAlert(document.getElementById('alert-category').value)}>
              Check Budget
            </button>
          </div>

          <div className="reports-section">
            <h3>Reports</h3>
            <button onClick={() => console.log(generateMonthlyReport(new Date().getMonth() + 1))}>
              Generate Monthly Report
            </button>
            <button
              onClick={() =>
                console.log(
                  generateCategoryReport(document.getElementById('budget-category').value)
                )
              }
            >
              Generate Category Report
            </button>
          </div>
        </div>
      )}
      <div className="expand-indicator">
        {isExpanded ? 'Collapse' : 'Expand'}
      </div>
    </div>
  );
}

export default Budget;