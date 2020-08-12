const quoteText = document.getElementById('quote');
const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading bar
function showLoadingBar() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading bar
function removeLoadingBar() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API http://api.forismatic.com/api/1.0/
async function getQuote() {
    showLoadingBar();
    // proxy is need to avoid error from fetching free forismatic API
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        // response will not be set unitl fetch finishes
        const response = await fetch(proxyUrl + apiUrl);
        // data will not be set until response.json finishes
        const data = await response.json();
        console.log(data);
        // if Author is blank, replace blank author with 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor; // data.quoteAuthor is json recieved from API
        }
        // Reduce font size for longer quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText; // data.quoteText is json recieved from API
        // Stop Loader and show the quote
        removeLoadingBar();
    } catch (error) {
        getQuote();
        console.log('No quote', error)
    }
}
// Function to tweet quotes
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();
