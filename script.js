// Get references to HTML elements
const display = document.getElementById('calc-display');
const historyList = document.getElementById('history-list');

// Initialize history from localStorage
let history = JSON.parse(localStorage.getItem('history')) || [];

// Function to append a value to the display
function appendToDisplay(value) {
  display.value += value;
}

// Function to clear the display
function clearDisplay() {
  display.value = '';
}

// Function to calculate the expression
function calculate() {
  try {
    // Evaluate the expression
    const result = eval(display.value);
    
    if (result !== undefined) {
      // Save the calculation with its result in the history
      saveToHistory(display.value + ' = ' + result);
      display.value = result;  // Show the result on the display
    }
  } catch (error) {
    // If there's an error (e.g., syntax error), display "Error"
    display.value = 'Error';
  }
}

// Function to save the calculation to history
function saveToHistory(calculation) {
  history.push(calculation);
  localStorage.setItem('history', JSON.stringify(history));
  renderHistory();
}

// Function to render history on the page
function renderHistory() {
  historyList.innerHTML = '';  // Clear the current list of history items
  history.forEach((item, index) => {
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `${item} <button onclick="deleteHistoryItem(${index})">Delete</button>`;
    historyList.appendChild(historyItem);
  });
}

// Function to delete a specific history item
function deleteHistoryItem(index) {
  history.splice(index, 1);  // Remove the history entry at the specified index
  localStorage.setItem('history', JSON.stringify(history));  // Update localStorage
  renderHistory();  // Re-render the history list
}

// Function to clear all history
function clearHistory() {
  history = [];
  localStorage.removeItem('history');
  renderHistory();
}

// Render the history on initial load
renderHistory();
