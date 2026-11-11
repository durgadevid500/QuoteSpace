const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const saveBtn = document.getElementById("saveBtn");
const copyBtn = document.getElementById("copyBtn");
const statusEl = document.getElementById("status");
const favoritesList = document.getElementById("favoritesList");
const countEl = document.getElementById("count");

let currentQuote = null;
let favorites = [];

function setStatus(message) { statusEl.textContent = message; }

async function loadQuote() {
  newQuoteBtn.disabled = true;
  setStatus("Finding a little inspiration...");
  try {
    const response = await fetch("/api/quote");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to fetch quote");
    currentQuote = data;
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = "— " + data.author;
    saveBtn.classList.remove("saved");
    saveBtn.textContent = "♡";
    setStatus("A fresh thought for you");
  } catch (error) {
    setStatus(error.message);
  } finally {
    newQuoteBtn.disabled = false;
  }
}

async function loadFavorites() {
  try {
    const response = await fetch("/api/favorites");
    favorites = await response.json();
    renderFavorites();
  } catch {
    setStatus("Could not load saved favorites.");
  }
}

function renderFavorites() {
  countEl.textContent = favorites.length;
  if (!favorites.length) {
    favoritesList.innerHTML = '<div class="empty-state"><span class="empty-icon">♡</span><strong>No favorites yet</strong><span>Tap the heart on a quote to save it here.</span></div>';
    return;
  }
  favoritesList.innerHTML = "";
  favorites.forEach(item => {
    const card = document.createElement("div");
    card.className = "favorite-item";
    const quote = document.createElement("div");
    quote.className = "favorite-quote";
    quote.textContent = "“" + item.quote + "”";
    const meta = document.createElement("div");
    meta.className = "favorite-meta";
    const author = document.createElement("span");
    author.className = "favorite-author";
    author.textContent = "— " + item.author;
    const remove = document.createElement("button");
    remove.className = "remove-btn";
    remove.textContent = "×";
    remove.title = "Remove favorite";
    remove.setAttribute("aria-label", "Remove favorite");
    remove.addEventListener("click", () => deleteFavorite(item.id));
    meta.append(author, remove);
    card.append(quote, meta);
    favoritesList.append(card);
  });
}

async function saveFavorite() {
  if (!currentQuote) return;
  try {
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote: currentQuote.quote, author: currentQuote.author })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    favorites.unshift(data);
    renderFavorites();
    saveBtn.classList.add("saved");
    saveBtn.textContent = "♥";
    setStatus("Saved to your favorites!");
  } catch (error) {
    setStatus(error.message);
  }
}

async function deleteFavorite(id) {
  try {
    const response = await fetch("/api/favorites/" + encodeURIComponent(id), { method: "DELETE" });
    if (!response.ok) throw new Error("Could not remove favorite.");
    favorites = favorites.filter(item => item.id !== id);
    renderFavorites();
    setStatus("Favorite removed.");
  } catch (error) {
    setStatus(error.message);
  }
}

async function copyQuote() {
  if (!currentQuote) return;
  const text = `“${currentQuote.quote}” — ${currentQuote.author}`;
  try {
    await navigator.clipboard.writeText(text);
    setStatus("Quote copied to clipboard!");
  } catch {
    setStatus("Clipboard access is unavailable in this browser.");
  }
}

newQuoteBtn.addEventListener("click", loadQuote);
saveBtn.addEventListener("click", saveFavorite);
copyBtn.addEventListener("click", copyQuote);

loadFavorites();
loadQuote();