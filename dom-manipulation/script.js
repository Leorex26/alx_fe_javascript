// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", category: "Inspiration" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>- ${randomQuote.category}</strong></p>`;
  }
  
  // Function to add a new quote to the array
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
  
      // Update the DOM to display the new quote immediately
      showRandomQuote();
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      alert('Quote added successfully!');
    } else {
      alert('Please fill out both fields.');
    }
  }
  
  // Function to create the "Add Quote" form dynamically
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    `;
  
    // Append the form to the body or a specific section
    document.body.appendChild(formContainer);
  
    // Add event listener to the "Add Quote" button
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
  }
  
  // Event listener to show a random quote when the button is clicked
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Call the function to dynamically create the "Add Quote" form
  createAddQuoteForm();
  