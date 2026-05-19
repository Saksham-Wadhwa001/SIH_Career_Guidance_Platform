# 🎓 CareerSync - SIH Career Guidance Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

CareerSync is a comprehensive, AI-powered career guidance platform designed to help students discover the right educational paths, colleges, and career opportunities based on their interests and personality. Built as a solution for the Smart India Hackathon (SIH).

## 🚀 Key Features

- **🧠 CareerSync Interest Mapper**: A specialized assessment tool that evaluates student interests, skills, and personality types to recommend the most suitable career streams and subjects.
- **🗺️ Course to Career Mapping**: Detailed breakdowns of degree programs, subjects, required exams, and the high-paying career paths they unlock.
- **🏫 College Directory**: Explore and filter institutions, view complete details on courses, facilities, cut-offs, and contact information via beautifully designed interactive modals.
- **🤖 AI Career Advisor (Powered by Google Gemini)**: A smart, context-aware conversational chatbot that provides personalized advice on exams, scholarships, and career doubts in real-time.
- **🗓️ Dynamic Timeline & Roadmap**: Visually track important milestones like admission deadlines, entrance exams, and scholarship dates.
- **🔒 Secure Authentication**: Robust user registration and login system protected by encrypted passwords and JSON Web Tokens (JWT).

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (via Vite for lightning-fast builds)
- **Vanilla CSS / Tailwind CSS** (for responsive, premium UI design)
- **Lucide React** (beautiful, lightweight iconography)
- **React Router** (for seamless client-side navigation)

### Backend
- **Node.js & Express.js** (REST API)
- **MongoDB & Mongoose** (Database)
- **JWT (JSON Web Tokens)** (Authentication & Authorization)
- **Bcrypt.js** (Password hashing)
- **Google GenAI SDK** (For the Gemini AI integration)

---

## 📁 Project Structure

```text
SIH_Career_Guidance_Platform/
├── client/                 # React Frontend Application
│   ├── public/             # Static assets
│   ├── src/                # Frontend source code
│   │   ├── components/     # Reusable React components (Chatbot, Directory, etc.)
│   │   ├── context/        # React Context (User state management)
│   │   ├── utils/          # API utility functions
│   │   ├── App.css         # Global styling and premium UI tokens
│   │   └── App.jsx         # Main application routing
│   └── package.json        # Frontend dependencies
│
└── server/                 # Node.js/Express Backend API
    ├── src/
    │   ├── controllers/    # Request handling logic (Users, Chat)
    │   ├── middlewares/    # Custom middlewares (Auth, Error Handling)
    │   ├── models/         # Mongoose database schemas
    │   ├── routes/         # API endpoint definitions
    │   └── utils/          # Helpers (ApiError, ApiResponse, AsyncHandler)
    ├── index.js            # Backend entry point
    └── package.json        # Backend dependencies
```

---

## ⚙️ Local Setup & Installation

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** (Node Package Manager)
- **MongoDB** (Local instance or MongoDB Atlas URI)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/SIH_Career_Guidance_Platform.git
cd SIH_Career_Guidance_Platform
```

### 2. Setup the Backend
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder with the following variables:
```env
PORT=8000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_super_secret_access_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
REFRESH_TOKEN_EXPIRY=10d
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend development server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window and navigate to the `client` directory:
```bash
cd client
npm install
```

*(Note: The frontend is configured to automatically detect the environment and connect to `http://127.0.0.1:8000/api/v1` locally, and your production URL when built).*

Start the frontend development server:
```bash
npm run dev
```
The application will usually be available at `http://localhost:5173`.

---

## 🌐 Deployment
- **Frontend**: The `client` folder is optimized for deployment on [Vercel](https://vercel.com).
- **Backend**: The `server` folder is optimized for deployment on [Render](https://render.com) (Node Web Service).

Ensure that CORS origins in `server/src/app.js` are updated to include your deployed frontend URL.

---

## 📄 License
This project is licensed under the ISC License.
