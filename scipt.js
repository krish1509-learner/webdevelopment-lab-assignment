const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const categoryFilter = document.getElementById("category-filter");
const expenseRecord = document.getElementById("expense-record");
const totalAmount = document.getElementById("total-amount");
const formMessage = document.getElementById("form-message");

let expenses = [];
let nextId = 0;

function showExpenses() {
  expenseRecord.innerHTML = "";

  const selectedCategory = categoryFilter.value;
  const visibleExpenses = expenses.filter(function (expense) {
    return selectedCategory === "All" || expense.category === selectedCategory;
  });

  if (visibleExpenses.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = expenses.length === 0 ? "No expenses added yet." : "No expenses in this category.";
    row.appendChild(cell);
    expenseRecord.appendChild(row);
  }

  visibleExpenses.forEach(function (expense, index) {
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const categoryCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    numberCell.textContent = index + 1;
    nameCell.textContent = expense.name;
    categoryCell.textContent = expense.category;
    amountCell.textContent = "₹" + expense.amount.toFixed(2);
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";
    deleteButton.addEventListener("click", function () {
      expenses = expenses.filter(function (item) {
        return item.id !== expense.id;
      });
      showExpenses();
    });

    actionCell.appendChild(deleteButton);
    row.append(numberCell, nameCell, categoryCell, amountCell, actionCell);
    expenseRecord.appendChild(row);
  });

  const total = expenses.reduce(function (sum, expense) {
    return sum + expense.amount;
  }, 0);
  totalAmount.textContent = total.toFixed(2);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  formMessage.textContent = "";

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);

  if (name === "") {
    formMessage.textContent = "Please enter an expense name.";
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0 || !amountInput.validity.valid) {
    formMessage.textContent = "Please enter an amount greater than zero.";
    return;
  }

  expenses.push({
    id: nextId++,
    name: name,
    amount: amount,
    category: categoryInput.value
  });

  form.reset();
  categoryFilter.value = "All";
  showExpenses();
});

categoryFilter.addEventListener("change", showExpenses);

showExpenses();
