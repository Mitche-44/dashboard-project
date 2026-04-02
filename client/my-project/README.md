# TaskMaster Pro - Full Stack Task Management Application

## Project Overview

TaskMaster Pro is a full-stack task management application that allows users to create, track, and manage their daily tasks efficiently. The application features user authentication, task CRUD operations, and a modern responsive user interface.

## Technology Stack

### Frontend
- React 18 with Vite
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for API communication
- React Icons for visual elements

### Backend
- Flask (Python web framework)
- Flask-SQLAlchemy for database ORM
- Flask-Migrate for database migrations
- Flask-JWT-Extended for authentication
- Flask-Bcrypt for password hashing
- Flask-CORS for cross-origin requests
- SQLite database (development)

## Features

### Authentication
- User registration with email and password
- Secure login with JWT token generation
- Protected routes for authenticated users
- Token-based authentication for API requests

### Task Management
- Create new tasks with title and description
- View all tasks for logged-in user
- Mark tasks as complete or pending
- Delete tasks
- Real-time task list updates
- Task status tracking

### User Interface
- Responsive design for mobile and desktop
- Modern gradient color scheme
- Animated landing page with illustrations
- Interactive task cards with status indicators
- Task statistics dashboard
- Clean and intuitive navigation

## Installation Guide

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager
- pip package manager

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:

Windows:
```bash
venv\Scripts\activate
```

Mac/Linux:
```bash
source venv/bin/activate
```

4. Install Python dependencies:
```bash
pip install flask flask-cors flask-sqlalchemy flask-migrate flask-bcrypt flask-jwt-extended python-dotenv
```

5. Create a .env file in the server directory:
```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///app.db
```

6. Initialize the database:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

7. Start the Flask server:
```bash
python app.py
```

The backend will run on http://127.0.0.1:5000

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client/my-project
```

2. Install Node dependencies:
```bash
npm install
```

3. Create a .env file in the client/my-project directory:
```env
VITE_API_URL=http://127.0.0.1:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Authentication Routes (prefix: /auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Register a new user |
| POST | /login | Authenticate user and receive JWT token |

### Task Routes (prefix: /tasks)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Get all tasks for authenticated user |
| POST | / | Create a new task |
| PATCH | /:id | Update task status or details |
| DELETE | /:id | Delete a task |

## Project Structure

```
dashboard-project/
├── server/
│   ├── models/
│   │   ├── user.py
│   │   └── task.py
│   ├── routes/
│   │   ├── auth.py
│   │   └── tasks.py
│   ├── extensions.py
│   ├── config.py
│   └── app.py
└── client/
    └── my-project/
        ├── src/
        │   ├── components/
        │   │   ├── Navbar.jsx
        │   │   ├── Footer.jsx
        │   │   ├── TaskForm.jsx
        │   │   └── TaskList.jsx
        │   ├── pages/
        │   │   ├── Landing.jsx
        │   │   ├── Login.jsx
        │   │   ├── Signup.jsx
        │   │   └── Dashboard.jsx
        │   ├── services/
        │   │   └── api.js
        │   ├── App.jsx
        │   └── main.jsx
        └── package.json
```

## Environment Variables

### Backend (.env)
- `SECRET_KEY`: Flask application secret key
- `JWT_SECRET_KEY`: JWT token encryption key
- `DATABASE_URL`: Database connection string

### Frontend (.env)
- `VITE_API_URL`: Backend API base URL

## Usage Guide

1. Open your browser and navigate to http://localhost:5173
2. Click "Get Started" or "Sign Up" to create a new account
3. Enter your email and password to register
4. Log in with your credentials
5. Add tasks using the form on the dashboard
6. Mark tasks as complete by checking the checkbox
7. Delete tasks using the delete button
8. Logout using the logout button in the navigation bar

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens are used for authentication
- Protected routes require valid tokens
- CORS is configured to only accept requests from the frontend origin
- Environment variables are used for sensitive configuration

## Development Notes

- The application uses SQLite for development; PostgreSQL is recommended for production
- All API requests require a valid JWT token in the Authorization header
- The frontend automatically includes the token in all authenticated requests
- Database migrations should be run whenever models are changed

## Troubleshooting

### Common Issues

1. CORS errors: Ensure the backend CORS configuration includes your frontend URL
2. Database errors: Run flask db upgrade to apply migrations
3. Module not found errors: Activate virtual environment and install dependencies
4. Token errors: Clear localStorage and log in again

### Useful Commands

Backend:
```bash
flask db migrate -m "migration message"
flask db upgrade
flask db downgrade
```

Frontend:
```bash
npm run build
npm run preview
npm run dev
```

## Deployment Considerations

For production deployment:

1. Use PostgreSQL instead of SQLite
2. Set DEBUG=False in Flask configuration
3. Use environment variables for all sensitive data
4. Enable HTTPS for secure communication
5. Use a production-grade WSGI server like Gunicorn
6. Build the frontend and serve static files
7. Configure proper CORS settings for production domains

## License

This project is for educational purposes.

## Contact

GitHub: Mitche-44

## Acknowledgments

- unDraw for illustrations
- React Icons for icon set
- Tailwind CSS for styling framework