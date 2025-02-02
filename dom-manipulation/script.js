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
      populateCategories(); // Update categories dynamically
      filterQuotes(); // Reapply filtering
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
    fileReader.onload = function (a){}
}

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

function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    const categories = [...new Set(quotes.map(q => q.category))]; // Get unique categories
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore last selected filter
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
      categoryFilter.value = lastSelectedCategory;
      filterQuotes(); // Apply filter on page load
    }
  }

  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save selection
  
    const filteredQuotes = selectedCategory === "all" 
      ? quotes 
      : quotes.filter(q => q.category === selectedCategory);
  
    displayQuotes(filteredQuotes);
  }
  
  function displayQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = "";
  
    filteredQuotes.forEach(q => {
      const quoteElement = document.createElement("p");
      quoteElement.textContent = q.text;
      quoteDisplay.appendChild(quoteElement);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    filterQuotes();
});
    