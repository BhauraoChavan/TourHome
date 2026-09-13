# 🏠 TourHome

**TourHome** is a full-stack MERN web application inspired by Airbnb. It allows users to discover, view, create, and manage accommodation listings through a modern web platform.

> 🚧 **Project Status:** Currently under development

---

## 📌 About the Project

TourHome is a full-stack accommodation listing and booking platform built using the **MERN stack**.

The main goal of this project is to build a real-world web application with features such as user authentication, accommodation listings, image handling, reviews, and booking functionality.

The project is also being developed as a practical learning project to understand how frontend, backend, database, authentication, APIs, and deployment work together in a production-style application.

---

## ✨ Features

### 👤 User Authentication

* User registration and login
* Secure authentication
* User logout
* Email verification
* Password reset
* Protected routes

### 🏡 Listings

* Create accommodation listings
* View all listings
* View listing details
* Edit listings
* Delete listings
* Add listing images
* Add price, location, country, and description

### 🔎 Search & Discovery

* Browse available accommodations
* Search listings
* Filter listings by different criteria
* View detailed information about each property

### ⭐ Reviews & Ratings

* Add reviews
* View reviews
* Rating system
* Delete your own reviews

### 📅 Booking

* Select booking dates
* Check availability
* Create bookings
* View booking details
* Manage bookings

### 👨‍💼 User Dashboard

* Manage profile
* View your listings
* Manage bookings
* Manage reviews

---

## 🛠️ Technologies Used

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Bootstrap / CSS
* Axios

### Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* bcrypt

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* MongoDB Compass
* GitHub Actions

---

## 🏗️ Project Architecture

```text
TourHome
│
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/                 # Node.js + Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

> The folder structure may change as the project develops.

---

## 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  │ HTTP Requests
  ▼
Express.js REST API
  │
  ▼
Node.js Backend
  │
  ▼
Mongoose
  │
  ▼
MongoDB
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/BhauraoChavan/TourHome.git
```

### 2. Navigate to the project

```bash
cd TourHome
```

### 3. Install dependencies

If frontend and backend are separate:

```bash
cd server
npm install
```

Then:

```bash
cd ../client
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend/server directory.

Example:

```env
PORT=8080

MONGO_URI=mongodb://127.0.0.1:27017/TourHome

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
```

> ⚠️ Never upload your `.env` file or passwords, API keys, database credentials, or secrets to GitHub.

Add this to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

or:

```bash
node app.js
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application will normally be available at:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
```

---

## 🗄️ Database

TourHome uses **MongoDB** as its database.

Example local MongoDB connection:

```text
mongodb://127.0.0.1:27017/TourHome
```

Mongoose is used to define schemas and interact with MongoDB.

### Main Collections

Possible collections include:

* Users
* Listings
* Reviews
* Bookings

---

## 🔑 Authentication

TourHome uses authentication to protect user-specific features.

Authentication flow:

```text
Register
   ↓
Login
   ↓
Authentication
   ↓
Access Protected Routes
   ↓
Create / Edit / Delete User Data
```

Passwords should never be stored as plain text. They should be securely hashed before being stored in the database.

---

## 📡 API

Example API endpoints:

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Listings

```http
GET    /api/listings
GET    /api/listings/:id
POST   /api/listings
PUT    /api/listings/:id
DELETE /api/listings/:id
```

### Reviews

```http
GET    /api/listings/:id/reviews
POST   /api/listings/:id/reviews
DELETE /api/reviews/:id
```

### Bookings

```http
GET    /api/bookings
POST   /api/bookings
GET    /api/bookings/:id
DELETE /api/bookings/:id
```

> API routes may change as development progresses.

---

## 🧪 API Testing

APIs can be tested using **Postman**.

Testing includes:

* GET requests
* POST requests
* PUT/PATCH requests
* DELETE requests
* Authentication
* Request validation
* Error handling
* Protected routes

---

## 📸 Screenshots

Screenshots of the application will be added here as the UI is completed.

### Home Page

*Add screenshot here*

### Listing Page

*Add screenshot here*

### Login Page

*Add screenshot here*

### User Dashboard

*Add screenshot here*

---

## 🚀 Future Improvements

Planned features include:

* [ ] Complete user authentication
* [ ] Email verification
* [ ] Password reset
* [ ] Image upload
* [ ] Search functionality
* [ ] Advanced filters
* [ ] Reviews and ratings
* [ ] Booking system
* [ ] Payment integration
* [ ] User dashboard
* [ ] Admin dashboard
* [ ] Responsive design
* [ ] API documentation
* [ ] Automated testing
* [ ] Playwright end-to-end testing
* [ ] CI/CD with GitHub Actions
* [ ] Cloud deployment

---

## 🔒 Security

The application will follow basic security practices such as:

* Password hashing
* Environment variables
* Protected API routes
* Authentication middleware
* Input validation
* Authorization
* Secure error handling

---

## 🧑‍💻 Development

This project is being developed step-by-step to understand real-world full-stack development.

The development process includes:

```text
Frontend
   ↓
Backend
   ↓
REST APIs
   ↓
Database
   ↓
Authentication
   ↓
Testing
   ↓
CI/CD
   ↓
Deployment
```

---

## 📚 Learning Goals

Through this project, I am learning and practicing:

* Full-stack web development
* MERN stack
* React.js
* Node.js
* Express.js
* MongoDB
* Mongoose
* REST APIs
* Authentication & Authorization
* Git & GitHub
* API testing
* Automated testing
* CI/CD
* Deployment

---

## 🌐 Live Demo

Coming soon...

```text
Live Website: Coming Soon
```

---

## 📂 Repository

GitHub:

https://github.com/BhauraoChavan/TourHome

---

## 🤝 Contributing

This is currently a learning and personal development project.

Suggestions, improvements, and feedback are welcome.

If you want to contribute:

```bash
git fork
git clone
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

Then create a Pull Request.

---

## 📄 License

This project is currently intended for educational and learning purposes.

---

## 👨‍💻 Author

**Bhaurao Chavan**

GitHub:
https://github.com/BhauraoChavan

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

### 🚀 TourHome

**Discover. Stay. Explore.**
