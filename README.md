## Digital Trust System
Role-Based Citizen Complaint Management Platform (MERN Stack)
## Overview

The Digital Trust System is a full-stack web application designed to manage citizen complaints in a structured, transparent, and role-based manner. The system enables citizens to submit complaints, authorities to process and resolve them, and administrators to oversee operations through analytics and assignment controls.

The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and follows RESTful API design principles with secure authentication and authorization.

## Features
## Citizen

User authentication (JWT-based)

Submit complaints with category, description, location, and documents

View personal complaints and their current status

Track complaint details including remarks and uploaded files

## Authority

View complaints assigned by the administrator

Update complaint status (Open, Under Review, Resolved)

Add official remarks to complaints

## Admin

Assign and reassign complaints to authorities

View system-wide dashboard analytics

Monitor complaint lifecycle and user statistics

## Tech Stack
## Frontend

React.js

React Router

Axios

CSS (custom styling)

## Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Multer (for document uploads)

## Project Structure
digital-trust-system/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md

## API Overview
Authentication

POST /api/auth/login

POST /api/auth/register

Citizen

POST /api/complaints

GET /api/complaints/my

GET /api/complaints/:id

POST /api/complaints/:id/upload

Authority

GET /api/authority/complaints

PATCH /api/authority/complaints/:id/status

POST /api/authority/remarks/:id

Admin

PATCH /api/admin/complaints/:id/assign

GET /api/admin/dashboard

## Authentication & Authorization

JWT tokens are used for secure API access

Role-based access control for Citizen, Authority, and Admin

Protected routes on both frontend and backend

## Setup Instructions
Prerequisites

Node.js

MongoDB

Git

## Backend Setup
cd server
npm install
npm start

## Frontend Setup
cd client
npm install
npm start

## Status

This project is currently under active development and includes all core features required for a minimum viable product (MVP).

## Author

Chinmayee Reddy
