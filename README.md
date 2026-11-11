# QuoteSpace — Quote Generator with History

A responsive full-stack web application that helps users discover inspiring quotes, save their favorite quotes, view their saved history, and copy quotes to the clipboard.

## Features

- **Random Quote Generator:** Fetch random inspirational quotes using a public API.
- **Save Favorites:** Save your favorite quotes to the database.
- **Quote History:** View all previously saved favorite quotes.
- **Remove Favorites:** Delete quotes from your favorites list.
- **Copy to Clipboard:** Copy quotes and author names with one click.
- **Responsive Design:** Works on desktop and mobile devices.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite (sql.js)
- **API:** DummyJSON Quotes API

## Project Structure

```text
QuoteSpace/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── data/
├── server.js
├── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/durgadevid500/QuoteSpace.git
```

2. Navigate to the project directory:

```bash
cd QuoteSpace
```

3. Install dependencies:

```bash
npm install
```

4. Start the application:

```bash
npm start
```

5. Open your browser:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/quote | Fetch random quote |
| GET | /api/favorites | Get saved favorites |
| POST | /api/favorites | Save a favorite quote |
| DELETE | /api/favorites/:id | Remove a favorite |
| GET | /health | Check server status |

## External API

[DummyJSON Quotes API](https://dummyjson.com/quotes/random)

## Future Improvements

- Search quotes by author.
- Add quote categories.
- Share quotes on social media.
- Add user authentication.

## Author

**Durga Devi**

GitHub: [@durgadevid500](https://github.com/durgadevid500)

---

⭐ If you like this project, consider giving it a star!
