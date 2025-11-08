# LLM Tournament Assignment

A full-stack web application for practicing prompt engineering through tournaments. Users can vote on prompts for different questions and see which prompts perform best.

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLModel** - SQL database ORM built on SQLAlchemy and Pydantic
- **SQLite** - Lightweight database
- **Passlib + Argon2** - Password hashing
- **Python-JOSE** - JWT token authentication

### Frontend
- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Mantine** - Component library
- **Zustand** - State management
- **Axios** - HTTP client
- **React Router** - Client-side routing

## Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **npm** or **yarn**

## Project Structure

```
llm_tournament_assignment/
├── backend/          # FastAPI backend
│   ├── api/         # API endpoints
│   ├── core/        # Core configuration and utilities
│   ├── models/      # Database models
│   ├── main.py      # Application entry point
│   └── requirements.txt
├── frontend/         # React frontend
│   ├── src/
│   │   ├── api/     # API client
│   │   ├── components/  # React components
│   │   ├── routes/  # Page components
│   │   ├── store/   # Zustand state management
│   │   └── types/   # TypeScript types
│   └── package.json
└── README.md
```

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create and activate virtual environment
```bash
# Create virtual environment
python -m venv venv

# Activate on Linux/Mac
source venv/bin/activate

# Activate on Windows
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Create environment file
Create a `.env` file in the `backend` directory:
```env
SECRET_KEY=SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DEBUG=True
DATABASE_URL=sqlite:///database.sqlite3
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 5. Run the backend server
```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

API Documentation will be available at `http://localhost:8000/docs`

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Running the Full Application

### Option 1: Run in separate terminals

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Database

The application uses SQLite for data storage. The database file (`database.sqlite3`) will be automatically created in the `backend` directory when you first run the backend server.

### Database Schema
- **Users** - User accounts with authentication
- **Questions** - Tournament questions
- **Prompts** - Prompt submissions for questions
- **Tournaments** - User votes and tournament results

The database is automatically seeded with sample questions and prompts on first run.

## Features

- 🔐 **User Authentication** - JWT-based authentication with secure password hashing
- 📝 **Question Management** - View and browse different prompt engineering questions
- 🎯 **Prompt Voting** - Vote on prompts you think perform best
- 🏆 **Winner Tracking** - See which prompts have the most votes
- 👤 **User Dashboard** - Track your votes and participation
- 📊 **Real-time Updates** - See vote counts update after submission

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get access token

### Questions
- `GET /questions` - List all questions with prompts
- `GET /questions/{question_id}` - Get specific question with vote status

### Tournaments
- `POST /tournaments` - Submit a vote for a prompt