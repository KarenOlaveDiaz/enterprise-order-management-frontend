# OrderFlow — Enterprise Order Management

A full-stack order management application built as a professional software engineering portfolio project.

OrderFlow demonstrates the implementation of a modern frontend architecture integrated with a REST API, including authentication, role-based authorization, persistent data management, automated testing, containerization, continuous integration, and cloud deployment.

## Live Demo

**Application:**  
https://orderflow-frontend-qlvh.onrender.com

### Demo Credentials

Use the following read-only account to explore the application:

```text
Email: demo@orderflow.dev
Password: Demo123!
```

The DEMO role provides access to order visualization, search, filtering, sorting, and pagination while protecting administrative operations.

> The backend is hosted on Render's free tier. If the service has been inactive, the first request may take a short time while the backend starts.

---

## Features

### Authentication

- JWT-based authentication
- Protected application routes
- Persistent authenticated sessions
- Automatic session restoration
- Secure logout flow
- Authentication error handling

### Order Management

- View persisted orders
- Create new orders
- Update order status
- Delete orders with confirmation
- Search orders
- Filter orders by status
- Sort order data
- Paginate results
- Order summary statistics

### Role-Based User Experience

OrderFlow implements two application roles:

| Capability | ADMIN | DEMO |
|---|:---:|:---:|
| View orders | ✅ | ✅ |
| Search orders | ✅ | ✅ |
| Filter and sort | ✅ | ✅ |
| Use pagination | ✅ | ✅ |
| Create orders | ✅ | ❌ |
| Update order status | ✅ | ❌ |
| Delete orders | ✅ | ❌ |

The frontend adapts the available actions according to the authenticated user's role.

Authorization is also enforced independently by the backend API.

### User Experience

- Responsive interface
- Loading states
- Error states
- Empty states
- Success and error notifications
- Confirmation dialogs for destructive actions
- Status badges
- Dashboard-style order summaries

---


## Architecture

OrderFlow follows a separated frontend/backend architecture:

```text
┌─────────────────────────────┐
│          Browser            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      React Frontend         │
│                             │
│ React + TypeScript + Vite   │
│ Authentication Context      │
│ Feature-based UI            │
└──────────────┬──────────────┘
               │
               │ HTTPS / REST
               ▼
┌─────────────────────────────┐
│        NestJS API           │
│                             │
│ Authentication              │
│ Authorization / RBAC        │
│ Orders API                  │
│ Validation                  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         Prisma ORM          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│     Neon PostgreSQL         │
└─────────────────────────────┘
```

The frontend and backend are maintained in separate repositories and deployed independently.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS
- Fetch API

### Testing

- Vitest
- React Testing Library
- Testing Library User Event
- V8 Coverage

### Quality & Tooling

- ESLint
- TypeScript
- Git
- GitHub
- GitHub Actions

### Infrastructure

- Docker
- Nginx
- Render

---

## Project Structure

The application is organized around features and shared responsibilities.

```text
src/
├── auth/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   └── services/
│
├── orders/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   └── services/
│
├── notifications/
│   ├── components/
│   ├── context/
│   └── hooks/
│
├── components/
│
├── App.tsx
└── main.tsx
```

This separation keeps authentication, order management, notifications, API communication, and reusable UI concerns isolated.

---

## Backend Integration

The frontend communicates with the OrderFlow REST API.

Production API:

```text
https://orderflow-backend-5nsn.onrender.com/api
```

The API URL is configured using:

```env
VITE_API_URL=http://localhost:3000/api
```

For the deployed application, the variable points to the production backend.

API communication is kept outside presentation components through dedicated services and hooks.

The authentication token is managed by the authentication layer and provided to API operations that require authorization.

---

## Authentication Flow

```text
User
 │
 │ credentials
 ▼
Login Page
 │
 ▼
Auth Service
 │
 │ POST /api/auth/login
 ▼
NestJS API
 │
 ▼
JWT + User
 │
 ▼
Auth Context
 │
 ├── stores authentication state
 ├── restores sessions
 └── exposes authenticated user
 │
 ▼
Protected Application
```

Authenticated requests send the JWT using:

```http
Authorization: Bearer <access_token>
```

---

## Order Flow

Order data is retrieved from the backend instead of being stored as frontend-only mock data.

```text
Orders Page
     │
     ▼
useOrders
     │
     ▼
Orders Service
     │
     ▼
REST API
     │
     ▼
NestJS
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

After write operations, the frontend synchronizes its state with the backend so the UI reflects persisted data.

---

## Testing

The frontend includes automated tests for important user behavior.

Coverage includes scenarios such as:

- Rendering persisted orders
- Searching orders
- Filtering by status
- Displaying summary information
- Creating orders
- Updating order status
- Deleting orders after confirmation
- Role-based UI behavior

Run the test suite with:

```bash
npm run test:run
```

Run tests with coverage:

```bash
npm run test:coverage
```

---

## Continuous Integration

GitHub Actions automatically validates changes targeting the `main` branch.

The frontend CI pipeline executes:

```text
Pull Request / Push to main
            │
            ▼
       npm ci
            │
            ▼
         ESLint
            │
            ▼
      Vitest Tests
            │
            ▼
        Coverage
            │
            ▼
    Production Build
            │
            ▼
        CI Success
```

This helps prevent code that fails linting, automated tests, coverage validation, or production compilation from being accepted unnoticed.

Workflow:

```text
.github/workflows/frontend-ci.yml
```

---

## Docker

The frontend also supports containerized execution.

The production container builds the React application and serves the generated static assets through Nginx.

### Build the image

```bash
docker build -t orderflow-frontend .
```

### Run the container

```bash
docker run --rm -p 8080:80 orderflow-frontend
```

The application will be available at:

```text
http://localhost:8080
```

---

## Local Development

### Requirements

Install:

- Node.js
- npm
- Git

Docker is optional for local development.

### Clone the repository

```bash
git clone <frontend-repository-url>
cd enterprise-order-management-frontend
```

### Install dependencies

```bash
npm ci
```

### Configure environment variables

Create:

```text
.env
```

Add:

```env
VITE_API_URL=http://localhost:3000/api
```

The OrderFlow backend must be running on port `3000` when using this configuration.

### Start development server

```bash
npm run dev
```

Vite will display the local application URL in the terminal.

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Lint

```bash
npm run lint
```

Runs ESLint.

### Tests

```bash
npm run test:run
```

Runs the complete Vitest suite once.

### Coverage

```bash
npm run test:coverage
```

Runs the automated test suite and generates coverage information.

### Production Build

```bash
npm run build
```

Runs TypeScript validation and generates the optimized production application.

### Preview

```bash
npm run preview
```

Locally previews the production build.

---

## Deployment

The production frontend is deployed as a static application on Render.

Deployment flow:

```text
Developer
    │
    ▼
Feature Branch
    │
    ▼
Pull Request
    │
    ▼
GitHub Actions CI
    │
    ▼
main
    │
    ▼
Render Auto-Deploy
    │
    ▼
npm ci && npm run build
    │
    ▼
dist/
    │
    ▼
Production
```

Render automatically deploys changes committed to `main`.

React Router routes are supported in production using a rewrite rule:

```text
/* → /index.html
```

---

## Production Infrastructure

```text
                    Internet
                       │
                       ▼
             ┌──────────────────┐
             │ Render           │
             │ Static Frontend  │
             └────────┬─────────┘
                      │
                      │ HTTPS
                      ▼
             ┌──────────────────┐
             │ Render           │
             │ NestJS Backend   │
             │ Docker           │
             └────────┬─────────┘
                      │
                      │ TLS
                      ▼
             ┌──────────────────┐
             │ Neon             │
             │ PostgreSQL       │
             └──────────────────┘
```

---

## Security

The frontend participates in a broader security model implemented across both applications.

The project includes:

- JWT authentication
- Protected routes
- Role-aware UI
- Backend-enforced RBAC
- Request validation
- Restricted CORS configuration
- Security headers
- API rate limiting
- Environment-based configuration
- Secrets excluded from source control

Frontend role restrictions are treated as a user-experience feature rather than the primary authorization boundary.

Sensitive authorization decisions are enforced by the backend.

---

## Backend

OrderFlow uses a separate NestJS backend repository.

The backend provides:

- REST API
- JWT authentication
- Role-based authorization
- PostgreSQL persistence
- Prisma ORM
- DTO validation
- Rate limiting
- Security headers
- Swagger/OpenAPI documentation
- Unit tests
- End-to-end tests
- Docker deployment
- GitHub Actions CI

### Production API

```text
https://orderflow-backend-5nsn.onrender.com/api
```

### Swagger

```text
https://orderflow-backend-5nsn.onrender.com/api/docs
```

Add the GitHub backend repository link here:

```text
https://github.com/KarenOlaveDiaz/enterprise-order-management-backend
```

---

## Engineering Workflow

Development follows a feature-branch workflow:

```text
main
 │
 ├── feature/*
 │      │
 │      ▼
 │   Development
 │      │
 │      ▼
 │   Local Validation
 │      │
 │      ▼
 │   Pull Request
 │      │
 │      ▼
 │   GitHub Actions
 │      │
 │      ▼
 └──── Merge
```

Changes are developed independently and validated before being integrated into `main`.

---

## Project Goals

OrderFlow was created to demonstrate practical experience across the complete software development lifecycle:

- Frontend engineering
- Backend integration
- API consumption
- Authentication
- Authorization
- Persistent databases
- Automated testing
- Security practices
- Containerization
- Continuous integration
- Cloud deployment
- Git-based development workflows

The goal is not only to demonstrate a working React interface, but also how a frontend application fits into a production-oriented full-stack architecture.

---

## Author

**Karen Olave**

Frontend / Full-Stack Software Engineer

Technologies represented in this project include React, TypeScript, NestJS, PostgreSQL, Prisma, Docker, automated testing, CI/CD, and cloud deployment.