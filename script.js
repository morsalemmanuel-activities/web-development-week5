const budgetForm = document.getElementById("budgetForm");
const monthlyBudgetInput = document.getElementById("monthlyBudget");

const monthlyBudgetValue = document.getElementById("monthlyBudgetValue");
const rentValue = document.getElementById("rentValue");
const groceriesValue = document.getElementById("groceriesValue");
const transportValue = document.getElementById("transportValue");
const entertainmentValue = document.getElementById("entertainmentValue");

const totalExpensesElement = document.getElementById("totalExpenses");
const remainingBalanceElement = document.getElementById("remainingBalance");
const budgetStatusElement = document.getElementById("budgetStatus");

let monthlyBudget = 0;

// Ask user for monthly budget when the page loads
monthlyBudget = Number(prompt("Welcome to SpendWise! Enter your monthly budget:"));

if (isNaN(monthlyBudget) || monthlyBudget <= 0) {
  monthlyBudget = 0;
  alert("Please enter a valid monthly budget greater than 0.");
}

monthlyBudgetInput.value = monthlyBudget;

// Format numbers as currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

// Add all expenses
function calculateTotalExpenses(expenses) {
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i];
  }

  return total;
}

// Compute remaining balance
function calculateRemainingBalance(budget, totalExpenses) {
  return budget - totalExpenses;
}

// Show results in console
function displayResults(budget, totalExpenses, remainingBalance) {
  console.log("SpendWise Budget Summary");
  console.log("Monthly Budget: " + formatCurrency(budget));
  console.log("Total Expenses: " + formatCurrency(totalExpenses));
  console.log("Remaining Balance: " + formatCurrency(remainingBalance));

  if (remainingBalance >= 0) {
    console.log("Status: You are within budget.");
  } else {
    console.log("Status: You have exceeded your budget.");
  }
}

// Update table and page
function updateBudgetSummary() {
  const monthlyBudgetValueNumber = Number(monthlyBudgetInput.value || 0);
  const rent = Number(document.getElementById("rent").value || 0);
  const groceries = Number(document.getElementById("groceries").value || 0);
  const transport = Number(document.getElementById("transport").value || 0);
  const entertainment = Number(document.getElementById("entertainment").value || 0);

  const expenseValues = [rent, groceries, transport, entertainment];
  const totalExpenses = calculateTotalExpenses(expenseValues);
  const remainingBalance = calculateRemainingBalance(monthlyBudgetValueNumber, totalExpenses);

  monthlyBudgetValue.textContent = formatCurrency(monthlyBudgetValueNumber);
  rentValue.textContent = formatCurrency(rent);
  groceriesValue.textContent = formatCurrency(groceries);
  transportValue.textContent = formatCurrency(transport);
  entertainmentValue.textContent = formatCurrency(entertainment);

  totalExpensesElement.textContent = formatCurrency(totalExpenses);
  remainingBalanceElement.textContent = formatCurrency(remainingBalance);

  if (remainingBalance >= 0) {
    budgetStatusElement.textContent = "Within Budget";
    budgetStatusElement.classList.remove("warning");
    budgetStatusElement.classList.add("success");
  } else {
    budgetStatusElement.textContent = "Over Budget";
    budgetStatusElement.classList.remove("success");
    budgetStatusElement.classList.add("warning");
  }

  displayResults(monthlyBudgetValueNumber, totalExpenses, remainingBalance);
}

budgetForm.addEventListener("submit", function (event) {
  event.preventDefault();
  updateBudgetSummary();
});

updateBudgetSummary();