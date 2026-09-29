# Shorty

A URL shortener built with React, Node.js, Express and MongoDB.

The idea is simple: paste a long URL, get a short link, and use that link to redirect to the original URL. The app also keeps a small history of created links and tracks how many times each link has been opened.

 1. Features

1. Shorten long URLs
2. Redirect short URLs
3. View recent URL history
4. Copy short URLs
5. Track clicks
6. Delete URLs from history
7. Light and dark mode
8. Responsive UI
9. MongoDB index for short codes

 2. Tech Stack

1. React + Vite
2. SCSS
3. Axios
4. Node.js
5. Express.js
6. MongoDB
7. Mongoose

 3. Project Structure

```text
url-shortener/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── config/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

The backend and frontend are kept separate so that the API logic and UI can be developed independently.

 4. How it works

When a URL is submitted, the frontend sends it to the backend:

```text
POST /api/shorten
```

The backend generates a random short code and saves the URL in MongoDB.

For example:

```text
Original URL
https://example.com/some/long/path

Short code
a82f91c2

Short URL
http://localhost:3000/a82f91c2
```

When the short URL is opened, Express gets the code from the route:

```text
GET /:shortcode
```

It looks up the matching document in MongoDB, increases the click count, and redirects to the original URL.

 5. MongoDB

Each URL stores:

```js
{
    originalUrl,
    shortCode,
    clicks,
    createdAt,
    updatedAt
}
```

The `shortCode` field has a unique index:

```js
urlSchema.index(
    { shortCode: 1 },
    { unique: true }
);
```

This prevents duplicate short codes and allows MongoDB to look up short codes efficiently.

 6. API Routes

 6.1 Create a short URL

```http
POST /api/shorten
```

Request:

```json
{
    "originalUrl": "https://example.com"
}
```

 6.2 Get URL history

```http
GET /api/history
```

Returns the most recently created URLs.

 6.3 Redirect

```http
GET /:shortcode
```

Example:

```text
GET /a82f91c2
```

 6.4 Delete a URL

```http
DELETE /api/history/:id
```

Here `id` is the MongoDB document `_id`.

 7. Running the Project

 7.1 Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Start the server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

 7.2 Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite.

 8. Testing

The API can be tested using Postman.

1. Create a short URL

```text
POST /api/shorten
```

2. Get URL history

```text
GET /api/history
```

3. Test a short URL

```text
GET /:shortcode
```

4. Delete a URL

```text
DELETE /api/history/:id
```

MongoDB Compass can be used to view the stored URL documents and indexes.

9. Frontend Flow

The frontend keeps the UI, state and API calls separated.

For example, shortening a URL follows this flow:

```text
UrlForm
   ↓
useShortenUrl
   ↓
urlService
   ↓
apiClient
   ↓
Express API
```

The same service layer is used for loading history and deleting URLs.

 10. Future Improvements

1. Custom short codes
2. URL expiry
3. User authentication
4. Per-user history
5. QR code generation
6. More detailed analytics
7. Rate limiting
8. Production deployment with a custom domain

 11. Author

**Ritika Sharma**

GitHub: https://github.com/ritikasharma2006
"# url-shortener" 
