# Notification Prioritization Engine — Backend (MERN)

## Overview

This backend implements a Notification Prioritization Engine that ingests events from multiple sources and classifies them into **NOW**, **LATER**, or **NEVER** using configurable rules, AI assistance, and fail-safe mechanisms.

The system is designed to prevent alert fatigue, detect duplicates, and remain operational even when AI services are unavailable.

---

## Live URLs 

Frontend: http://localhost:3000 
Backend API: http://localhost:5000 
Health Endpoint: http://localhost:5000/health
---

## Tech Stack

* Node.js — Backend runtime
* Express.js — REST API framework
* MongoDB — Database
* Mongoose — ODM
* OpenAI API — AI classification
* node-cron — Background scheduler
* Axios — HTTP client
* dotenv — Environment management
* CORS — Cross-origin support

---

## Features

* Event ingestion API
* Decision pipeline (NOW / LATER / NEVER)
* Runtime configurable rules engine
* Deduplication and near-duplicate detection
* Alert fatigue prevention
* AI asynchronous processing with fallback
* Circuit breaker for AI failures
* Audit logging with explainability
* Later queue with scheduler
* Health monitoring endpoint
* Metrics API

---

## Project Structure

```
src/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── services/
 ├── jobs/
 ├── middleware/
 └── utils/
```

---

## Installation & Running Locally

### Prerequisites

* Node.js >= 18
* MongoDB Atlas or Local MongoDB
* npm

### Steps

```
git clone <repo-url>
cd notification-engine-mern
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
OPENAI_API_KEY=your_openai_key
```

Run server:

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

## Environment Variables

| Variable       | Description               |
| -------------- | ------------------------- |
| PORT           | Server port               |
| MONGO_URI      | MongoDB connection string |
| OPENAI_API_KEY | OpenAI API key            |

---

## API Endpoints

### Events

```
POST /api/events
```

### Rules

```
GET /api/rules
POST /api/rules
DELETE /api/rules/:id
```

### Audit Logs

```
GET /api/audits
```

### Later Queue

```
GET /api/later
```

### Metrics

```
GET /api/metrics
```

### Health

```
GET /health
```

---

## AI Integration

* Model: gpt-4o-mini
* AI runs asynchronously
* Circuit breaker prevents repeated failures
* Fallback logic ensures classification even without AI
* AI results stored in database

---

## Fail-Safe Architecture

* Retry mechanism with failure tracking
* Circuit breaker protection
* Background job resilience
* No event loss on failure
* Health endpoint reports system status

---

## Known Limitations

* Near-duplicate detection uses simplified similarity
* Authentication is basic (mock)
* Metrics are aggregated without historical trends

---

## Deployment

Backend deployed on Render with MongoDB Atlas cloud database.

---

## Author

Your Name
