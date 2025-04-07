const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
  ];
  
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteDisplay.innerText = quotes[randomIndex].text;
      sessionStorage.setItem("lastViewedQuote", quotes[randomIndex].text);
    }
  }
  
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
  
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;
  
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
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

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Replace with real server if available

async function postQuoteToServer(quote) {
try {
const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
method: "POST",  // ✅ Ensure POST method is used
headers: {
    "Content-Type": "application/json",  // ✅ Correct headers
},
body: JSON.stringify(quote),  // ✅ Convert to JSON format
});

if (!response.ok) throw new Error("Failed to post quote");

const newQuote = await response.json();
console.log("Quote successfully posted to server:", newQuote);
} catch (error) {
console.error("Error posting quote:", error);
}
}

async function syncQuotes() {
console.log("Syncing quotes with the server...");
await fetchQuotesFromServer();  // ✅ Fetch quotes from the mock API
setTimeout(syncQuotes, 30000);  // ✅ Sync every 30 seconds
}

// ✅ Start syncing on page load
document.addEventListener("DOMContentLoaded", syncQuotes);

async function fetchQuotesFromServer() {
try {
const response = await fetch("https://jsonplaceholder.typicode.com/posts");
if (!response.ok) throw new Error("Failed to fetch server data");

const serverQuotes = await response.json();
mergeServerQuotes(serverQuotes);  // ✅ Merge new quotes into local storage
} catch (error) {
console.error("Error fetching quotes:", error);
}
}

function startSyncingQuotes() {
    console.log("Starting periodic quote sync...");
    fetchQuotesFromServer();  // ✅ Fetch immediately on load
    setInterval(fetchQuotesFromServer, 30000);  // ✅ Fetch every 30 seconds
  }
  
  // ✅ Start syncing when the page loads
  document.addEventListener("DOMContentLoaded", startSyncingQuotes);
  

function updateLocalStorageWithServerData(serverQuotes) {
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
  
    // Filter out duplicate quotes to prevent conflicts
    const newQuotes = serverQuotes.filter(sq => 
      !localQuotes.some(lq => lq.text === sq.text && lq.category === sq.category)
    );
  
    if (newQuotes.length > 0) {
      localQuotes.push(...newQuotes);
      localStorage.setItem("quotes", JSON.stringify(localQuotes));
      notifyUser(`✅ ${newQuotes.length} new quotes added from the server.`);
      populateCategories();  // ✅ Refresh category dropdown
      filterQuotes();  // ✅ Refresh displayed quotes
    }
  }
  
  function notifyUser(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "10px";
    notification.style.right = "10px";
    notification.style.background = "#4CAF50";  // ✅ Green for success
    notification.style.color = "white";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";
    notification.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);  // ✅ Auto-dismiss after 5 sec
  }
  
  function fetchQuotesFromServer() {
    fetch("https://jsonplaceholder.typicode.com/posts")  // ✅ Mock API
      .then(response => response.json())
      .then(data => {
        updateLocalStorageWithServerData(data);
        notifyUser("✅ Quotes synced with server!");  // ✅ Add UI notification
      })
      .catch(error => console.error("Error fetching quotes:", error));
  }
  