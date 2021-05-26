const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//Show New Quote
function newQuote() {
  loading();
  //Pick a random quote from API
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //update to page
  //check if author field is blank nd repace with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set quote and hide the loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quote from API
async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

//tweet the quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuotes();
