# BRASA Website Frontend

This repository contains the frontend for the BRASA at UofT website.

It is a React + TypeScript single-page application (SPA) with:

- Cognito authentication through AWS Amplify
- Integration with a backend API (NestJS exposed via API Gateway + Lambda)
- Internationalization support for English and Portuguese

## Tech stack

- React 18 + TypeScript
- Vite
- React Router
- AWS Amplify (Auth)
- Tailwind CSS, Material UI, Ant Design, styled-components

## Project architecture

The codebase is organized by feature and role:

- `src/pages`: Route-level screens (Home, Contact, Login, Register, Account, etc.)
- `src/components`: Reusable UI components
- `src/contexts`: Global state/providers (auth and locale)
- `src/services`: API integration layer (users, auth registration bridge, contact)
- `src/resources`: Translation dictionaries (`en-US`, `pt-BR`)
- `src/types`: Domain and shared TypeScript types

At runtime, the app flow is:

1. `src/index.tsx` bootstraps the app and initializes Amplify config from `src/aws.ts`.
2. `LocaleProvider` provides text dictionary access and locale persistence.
3. `AuthProvider` manages Cognito session lifecycle and authenticated requests.
4. Route pages call service functions in `src/services` to reach backend endpoints.

## Authentication and user lifecycle

Authentication is handled with AWS Cognito via `aws-amplify/auth`.

High-level signup/login flow:

1. User signs up in Cognito (`signUp`) with standard and custom attributes.
2. User confirms account with verification code (`confirmSignUp`).
3. Frontend signs user in and retrieves ID token (`fetchAuthSession`).
4. Frontend calls backend `/users/register` with `Authorization: Bearer <idToken>`.
5. App fetches user profile from `/users/me`.

This keeps identity managed by Cognito while user profile/domain data lives in the backend.

## Backend integration

This frontend is designed to work with a backend API that:

- Is implemented in NestJS
- Is deployed behind AWS API Gateway
- Runs as AWS Lambda functions
- Validates Cognito JWT tokens for protected endpoints

Current frontend API usage includes:

- `GET /users/me`
- `POST /users/register`
- `POST /contact`

The backend base URL is configured with environment variables.

## AWS integration summary

### Cognito

Configured in `src/aws.ts` through Amplify Auth:

- User Pool ID
- App Client ID

These values are read from environment variables and used by auth flows in `src/contexts/auth`.

### API Gateway + Lambda (NestJS)

The frontend sends Cognito bearer tokens to protected endpoints. The API is responsible for token verification and authorization rules.

### S3 + CloudFront

Recommended hosting model for this SPA:

1. Build static assets with `npm run build`
2. Upload `dist/` artifacts to an S3 bucket
3. Serve through CloudFront distribution
4. Configure SPA fallback (rewrite/redirect to `index.html`) for client-side routes

Typical production behavior:

- Immutable static assets served from CloudFront edge cache
- `index.html` served with shorter cache policy
- API requests routed directly to API Gateway domain

## Environment variables

Create a `.env` file at the project root:

```env
VITE_AWS_COGNITO_USER_POOL_ID=your_user_pool_id
VITE_AWS_COGNITO_CLIENT_ID=your_cognito_app_client_id
VITE_USERS_API_BASE_URL=https://your-api-id.execute-api.region.amazonaws.com
```

Notes:

- Preferred prefix is `VITE_`.
- `REACT_APP_` variables are still accepted for backward compatibility.
- Do not commit secrets.

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

App runs at `http://localhost:5173` by default.

## Scripts

- `npm start`: run development server
- `npm run dev`: run development server
- `npm run build`: create production build
- `npm run preview`: preview production build locally
- `npm test`: run tests

## Deployment checklist

Before production deployment:

1. Verify Cognito IDs and API base URL are set for the target environment.
2. Ensure backend CORS allows your frontend domain.
3. Confirm CloudFront/S3 SPA fallback to `index.html` is configured.
4. Validate login, register, account load, and contact form flows.
