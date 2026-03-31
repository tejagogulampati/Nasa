// Get references to the date inputs
const startInput = document.getElementById("startDate");
const endInput = document.getElementById("endDate");

// Set default date range to last 5 days
const today = new Date();
const past = new Date();
past.setDate(today.getDate() - 5);

startInput.value = past.toISOString().split("T")[0]; // YYYY-MM-DD
endInput.value = today.toISOString().split("T")[0];  // YYYY-MM-DD