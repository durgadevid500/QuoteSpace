# QuoteSpace — Quote Generator with History

A responsive full-stack quote generator. It fetches random quotes from a public API, lets users save favorites to a backend JSON datastore, displays saved history, and copies quotes to the clipboard.

## Features
- Fetch a random quote from the DummyJSON public Quotes API
- Save favorite quotes to backend persistent JSON storage
- View saved favorites and remove them from history
- Copy quote and author to clipboard
- Responsive desktop and mobile interface

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Storage: SQLite database (`data/favorites.sqlite`, powered by sql.js)
- External API: https://dummyjson.com/quotes/random

## Run locally
1. Install Node.js 18 or later.
2. Open this project folder in a terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm start
   ```
5. Open http://localhost:3000

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/quote` | Fetch a random quote |
| GET | `/api/favorites` | Get saved favorites |
| POST | `/api/favorites` | Save a favorite |
| DELETE | `/api/favorites/:id` | Remove a favorite |
| GET | `/health` | Health check |

## Storage note
Favorites are stored in a real SQLite database at `data/favorites.sqlite`. On hosting platforms with ephemeral filesystems, saved data may reset after a restart/redeploy; attach a persistent disk or use a managed database for production.

## Deployment
Deploy as a Node web service. Build command: `npm install`. Start command: `npm start`. Set the health check path to `/health` if the platform supports it.

## Author
Add your name and GitHub profile here.
