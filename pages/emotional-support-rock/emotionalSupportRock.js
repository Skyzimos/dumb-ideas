const quotes = [
    "You rock!",
    "You're boulder than you think.",
    "Take things for granite — it's okay sometimes.",
    "Keep rolling, stone.",
    "I'm just here to pebble you with kindness.",
    "You’ve got some real slate moves.",
    "Feeling a little rough around the edges? Same.",
];

let recentQuotes = []; // Stores the indexes of the last few quotes
const maxHistory = 4;  // Don't repeat any of the last 4

function getQuote() {
    const quoteEl = document.getElementById('quote');
    
    let availableIndexes = quotes
        .map((_, i) => i)
        .filter(i => !recentQuotes.includes(i));

    // If all quotes are in recent history, reset the history
    if (availableIndexes.length === 0) {
        recentQuotes = [];
        availableIndexes = quotes.map((_, i) => i);
    }

    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const selectedQuote = quotes[randomIndex];

    quoteEl.textContent = selectedQuote;

    // Update history
    recentQuotes.push(randomIndex);
    if (recentQuotes.length > maxHistory) {
        recentQuotes.shift(); // Remove the oldest
    }
}