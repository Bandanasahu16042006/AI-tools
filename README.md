# 🤖 AI Login Web Application

## 📌 Project Description

The **AI Login Web Application** is a backend web application developed using **Node.js and Express.js** that provides a **user registration and login system** with **AI-powered responses using Google Generative AI**.

This application stores user information in **MongoDB** and allows users to interact with an AI model through the server. The project demonstrates how to integrate **authentication, database management, and AI APIs** in a backend system.

This project helps in understanding **backend development, database connectivity, and AI API integration**.

---

# 🚀 Features

* User **Registration System**
* User **Login Authentication**
* **MongoDB database integration**
* **AI response generation**
* Backend API using **Express.js**
* Environment variables using **dotenv**

---

# 🛠️ Technologies Used

| Technology               | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| Node.js                  | Runtime environment for running JavaScript |
| Express.js               | Backend web framework                      |
| MongoDB                  | Database for storing user data             |
| Mongoose                 | MongoDB object modeling                    |
| Google Generative AI API | AI response generation                     |
| JavaScript               | Programming language                       |
| dotenv                   | Environment variable management            |

---

# ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/project-name.git
```

### 2️⃣ Navigate to the Project Folder

```bash
cd project-name
```

### 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Setup

Create a **.env file** in the root directory and add the following:

```
API_KEY=your_google_generative_ai_api_key
PORT=3001
```

The **API key** is required to connect with the **Google Generative AI service**.

---

# ▶️ How to Run the Project

Run the following command to start the server:

```bash
node src/index.js
```

or

```bash
npm start
```

After running the command, the server will start at:

```
http://localhost:3001
```

---

# 🗄️ Database

The project uses **MongoDB** to store user information.

Example fields stored in the database:

* **Name**
* **Password**
* **Mobile Number**

Make sure **MongoDB is running locally** before starting the project.

---

# 📌 Future Improvements

Some improvements that can be added in the future:

* Password encryption using **bcrypt**
* **JWT authentication** for secure login
* Adding a **frontend interface**
* Deploying the project on **cloud platforms**

---

# 📚 Learning Outcomes

This project helps in learning:

* Backend development with **Node.js**
* Database connection with **MongoDB**
* **REST API development**
* **AI API integration**
* Environment variable management
