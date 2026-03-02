# Notification Prioritization Engine — Spring Boot Stack

## Overview

This implementation provides the same Notification Prioritization Engine using **Java Spring Boot** backend with a **Next.js frontend**.

The system demonstrates identical architecture and behavior as the MERN implementation, ensuring consistency across stacks.

---

## Live URLs

* Frontend (Vercel): http://localhost:3000/
* Backend API: http://localhost:5000/
* Health Endpoint: http://localhost:3000/health

---

## Mock Credentials

Admin:
Email: [admin@example.com](mailto:admin@test.com)
Password: admin123

Operator:
Email: [operator@example.com](mailto:operator@test.com)
Password: operator123

---

## Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Hibernate
* PostgreSQL / MySQL (RDS)
* Scheduler (Spring @Scheduled)
* RestTemplate / WebClient for AI

### Frontend

* Next.js
* Tailwind / Material UI
* Axios
* Chart libraries

---

## Architecture

Layers:

1. Controller Layer
2. Service Layer
3. Decision Engine
4. AI Integration Service
5. Repository Layer
6. Scheduler Worker
7. Audit Logging

Flow:

UI → Controller → Decision Engine → AI Worker → Database → Response

---

## Features

* Notification classification
* Duplicate prevention
* Fatigue control
* Configurable rules
* Async AI processing
* Scheduler queue
* Audit logging
* Metrics dashboard
* Health monitoring

---

## AI Integration

* External LLM API
* Async processing using background executor
* Retry with exponential backoff
* Circuit breaker fallback

Fallback logic ensures system works even when AI unavailable.

---

## Database Design

Relational schema includes:

* Notifications
* Audit Logs
* Rules
* Users
* Queue Records

Soft deletes enabled for recoverability.

Audit log is append-only.

Migrations handled via Flyway / Liquibase.

---

## Setup Instructions

### Prerequisites

* Java 17+
* Maven / Gradle
* PostgreSQL / MySQL
* Node.js (frontend)

---

### Backend Setup

```bash
git clone <repo>
cd backend
mvn clean install
```

Configure `application.properties`:

```
spring.datasource.url=...
spring.datasource.username=...
spring.datasource.password=...
AI_API_KEY=...
```

Run:

```
mvn spring-boot:run
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Scheduler

Deferred notifications processed periodically using Spring scheduler.

---

## Fail-Safe Architecture

* AI retry logic
* Circuit breaker
* Fallback classification
* Persistent failure storage
* Health endpoint monitoring

---

## Known Limitations

* Simplified similarity detection
* Fixed scheduler interval
* Limited load testing

---

## Future Improvements

* Distributed queue (Kafka)
* ML-based ranking
* Auto-scaling microservices
* Advanced monitoring

---

## Author

<Your Name>


