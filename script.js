// Select display and history elements
const display = document.getElementById("display");
const historyList = document.getElementById("history-list");

// Load history from localStorage
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
renderHistory();

// Function to update the input field
function input(value) {
  display.value += value;
}

// Function to calculate the result
function calculate() {
  try {
    const result = eval(display.value);

    if (!isNaN(result)) {
      let formattedResult = result;

      // Convert large numbers to scientific notation
      if (result.toString().length > 15) {
        formattedResult = result.toExponential(5); // Show 5 decimal places in scientific notation
      }

      const entry = `${display.value} = ${formattedResult}`;
      history.push(entry);
      localStorage.setItem("calcHistory", JSON.stringify(history));
      renderHistory();
      display.value = formattedResult;
    }
  } catch {
    display.value = "Error";
  }
}


// Clear the display field
function clearDisplay() {
  display.value = "";
}

// Delete the last character in the input
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Render the history list
function renderHistory() {
  historyList.innerHTML = "";
  history.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${entry}</span>
      <button onclick="deleteHistory(${index})">X</button>
    `;
    historyList.appendChild(li);
  });
}

// Clear the history
function clearHistory() {
  history = [];
  localStorage.removeItem("calcHistory");
  renderHistory();
}

// Delete an individual history entry
function deleteHistory(index) {
  history.splice(index, 1);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
}

// Allow keyboard input for the calculator
document.addEventListener("keydown", (event) => {
  const allowedKeys = "0123456789+-*/().";
  if (allowedKeys.includes(event.key)) {
    input(event.key);
  } else if (event.key === "Enter") {
    calculate();
  } else if (event.key === "Backspace") {
    backspace();
  } else if (event.key === "Escape") {
    clearDisplay();
  }
});
