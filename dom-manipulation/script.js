const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
  ];
  
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteDisplay.innerText = quotes[randomIndex].text;
      sessionStorage.setItem("lastViewedQuote", quotes[randomIndex].text);
    }
  }
  
  function addQuote() {
    const text = document.getElementById("newQuoteText").value;
    const category = document.getElementById("newQuoteCategory").value;
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
    }
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  // Load last viewed quote from session storage
  document.addEventListener("DOMContentLoaded", () => {
    const lastViewedQuote = sessionStorage.getItem("lastViewedQuote");
    if (lastViewedQuote) {
      document.getElementById("quoteDisplay").innerText = lastViewedQuote;
    }
  });

  function exportToJson() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
function importFromJsonFile(event) {
const fileReader = new FileReader();
fileReader.onload = function (

function importFromJsonFile(event) {
const file = event.target.files[0];
if (!file) {
alert("No file selected.");
return;
}

const fileReader = new FileReader();

fileReader.onload = function (e) {
try {
const importedQuotes = JSON.parse(e.target.result);

if (!Array.isArray(importedQuotes)) {
throw new Error("Invalid JSON format. Expected an array.");
}

// Validate each quote object
const validQuotes = importedQuotes.filter(q => q.text && q.category);
if (validQuotes.length === 0) {
throw new Error("No valid quotes found in the file.");
}

// Merge with existing quotes and update local storage
quotes.push(...validQuotes);
saveQuotes();

// Provide feedback and update the UI
alert(`Successfully imported ${validQuotes.length} quotes!`);
showRandomQuote();  // Optionally refresh the displayed quote
} catch (error) {
alert("Error importing quotes: " + error.message);
}
};

fileReader.readAsText(file);
}
             