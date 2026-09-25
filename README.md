README Structure:

# Project Name
Lost Items Website

## Overview
Campus Lost & Found is a web application designed to help students report, find, and recover lost items on campus. Users can create accounts, post lost or found items, view item details, and submit claims for items they believe belong to them. Item owners can manage their posted items and review claims submitted by other users.


## Screenshots

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- JavaScript
- CSS


## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

Clone the repository from GitHub:

```bash
git clone https://github.com/Sayed-2003/Lost-Items.git
```

Then move into the project folder:

```bash
cd Project2-Lost-Items
```

### 2. Install Dependencies

Install all required packages:

```bash
npm i
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project.
Add your environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=3000
```

Replace the values with your own MongoDB connection string and session secret.

**Important:** Never upload your `.env` file to GitHub. so make sure u add it in .gitignore

### 4. Start the Application

Start the server with:

```bash
nodemon server.js
```

### 5. Open the Application

Once the server is running, open your browser and go to:

```text
http://localhost:3000
```

The Campus Lost & Found application should now be running.

## Requirements

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed
- npm installed
- MongoDB database
- Git installed


## User Stories
1. As a user, I want to create an account and sign in so that I can use the application.

2. As a signed-in user, I want to create a lost or found item so that I can add it to the platform.

3. As a user, I want to view all lost and found items so that I can look for an item.

4. As a user, I want to view the details of an item so that I can see more information about it.

5. As an item owner, I want to edit my item so that I can update its information.

6. As an item owner, I want to delete my item so that it is no longer displayed.

7. As a user, I want to submit a claim for an item so that I can explain why I believe it belongs to me.

8. As an item owner, I want to receive claims for my item so that I can review them.

## Database Design
1. Lost Items ERD
![Lost Items ERD](./erd/lost-items-erd.png)


## Routes

### Index

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Render homepage |

### Auth

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/auth/sign-up` | Render sign-up form |
| POST | `/auth/sign-up` | Create a new user |
| GET | `/auth/sign-in` | Render sign-in form |
| POST | `/auth/sign-in` | Authenticate user and start session |
| GET | `/auth/sign-out` | Destroy session and sign out |

### Items

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/items` | Redirect to all items |
| GET | `/items/create` | Render create-item form *(auth required)* |
| POST | `/items/create` | Create a new item *(auth required)* |
| GET | `/items/all-items` | Display all non-deleted items |
| GET | `/items/:id` | Display a single item's details |
| GET | `/items/:id/edit` | Render edit form for an item *(auth + owner required)* |
| PUT | `/items/:id` | Update an item *(auth + owner required)* |
| DELETE | `/items/:id` | Soft-delete an item *(auth + owner required)* |

### Claims

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/claims/create/:itemId` | Render claim form for an item *(auth required)* |
| POST | `/claims/create/:itemId` | Submit a claim on an item *(auth required)* |
| GET | `/claims/requests` | View pending claims on items you own *(auth required)* |
| PUT | `/claims/:id/accept` | Approve a claim *(auth required)* |
| PUT | `/claims/:id/reject` | Reject a claim *(auth required)* |
| GET | `/claims/my-claims` | View claims you've submitted *(auth required)* |

## Features

- User registration and sign-in
- Session-based authentication
- Create lost and found item listings
- Upload images for items
- View item details
- Edit and delete your own items
- Submit claims for items
- View your submitted claims
- View claims for your own items
- Approve or reject claims
- Sign out


## Future Enhancements


## Credits