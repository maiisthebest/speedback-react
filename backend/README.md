# 🌀 Speedback (Backend)

This workspace contains the backend for Speedback.

## 🛠️ Tech Stack

- Node.js
- Vite
- Vitest

## Getting Started

**1. Install the magic**

```bash
npm install
```

**2. Start the server on port 3000**

```bash
npm run start
```

**3. Run the tests**

```bash
npm run test
```

## API Endpoints

- `GET /api/feedback-prompts`: Returns a list of feedback prompts.

### Rate Limiting

To prevent abuse, the API endpoints are rate-limited (5 requests / min 😉). If you exceed the rate limit, you will receive a `429 Too Many Requests` response.

## 🗂️ Backend Structure

```
backend/
├── api/
│   ├── feedback-prompts.js     # Entry point for serverless function
│   └── feedback-prompts.test.js
├── src/
│   ├── generateFeedbackPrompts.js
│   ├── generateFeedbackPrompts.test.js
│   ├── local/
│   │   ├── config.js
│   │   ├── server.js
│   │   └── server.test.js
│   └── requestHandlers/
│       ├── handleFeedbackPromptsRequest.js
│       └── handleFeedbackPromptsRequest.test.js
├── .env.example
├── package.json
└── README.md
```
