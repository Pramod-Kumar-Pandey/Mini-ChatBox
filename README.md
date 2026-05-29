# Mini ChatBox Application

A simple WhatsApp-inspired chat application built using **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **EJS**. This project demonstrates CRUD operations, MongoDB integration, server-side rendering.

## Features

* View all chats
* Create a new chat
* Edit existing messages
* Delete chats
* MongoDB database integration using Mongoose
* Custom error handling middleware
* Async error handling with `asyncWrap`
* Method Override support for PUT and DELETE requests
* EJS templating for dynamic pages

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Frontend

* EJS
* HTML
* CSS

### Additional Packages

* method-override

## Project Structure

```text
mini-chatbox/
│
├── models/
│   └── chat.js
│
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
│
├── public/
│   └── style.css
│
├── ExpressError.js
├── index.js
├── init.js
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-chatbox.git
```

### 2. Navigate to project directory

```bash
cd mini-chatbox
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running locally on:

```text
mongodb://127.0.0.1:27017/fakewhatsapp
```

### 5. Run the application

```bash
node app.js
```

or

```bash
nodemon app.js
```

### 6. Open in browser

```text
http://localhost:8080
```

## Routes

| Method | Route           | Description        |
| ------ | --------------- | ------------------ |
| GET    | /               | Home Route         |
| GET    | /chats          | Display all chats  |
| GET    | /chats/new      | Show new chat form |
| POST   | /chats          | Create a new chat  |
| GET    | /chats/:id/edit | Show edit form     |
| PUT    | /chats/:id      | Update a chat      |
| DELETE | /chats/:id      | Delete a chat      |

## Database Schema

```javascript
{
    from: String,
    to: String,
    msg: String,
    created_at: Date
}
```

## Learning Outcomes

This project helped in understanding:

* Express Routing
* CRUD Operations
* MongoDB & Mongoose
* Middleware
* Error Handling
* Async/Await
* Server-Side Rendering with EJS
* Method Override
* MVC Basics

## Future Improvements

* User Authentication
* Real-time Messaging using Socket.io
* Message Timestamps Formatting
* Chat Search Functionality
* Responsive UI
* User Profiles
* Group Chats

## Author

Pramod Kumar Pandey

B.Tech CSE Student | MERN Stack Learner

## License

This project is created for educational and learning purposes.
