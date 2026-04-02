# 🩺 Vitacare: Full-Stack Intelligent Health Platform

## Overview
Vitacare is an advanced, AI-powered healthcare management platform designed to unify all aspects of personal health management. It transitions medical interactions from chaotic scheduling and disconnected data points into a sleek, centralized, and predictive ecosystem. Built with a modern dark-glassmorphism aesthetic, Vitacare offers an incredibly fluid user experience.

Through Vitacare, users can actively interact with an AI health assistant, monitor critical live vitals, intelligently schedule appointments based on symptoms, seamlessly review medical records via timelines, and maintain preventive wellness routines with granular daily tracking. 

---

## 🛠️ Tech Stack & Tools

### Frontend (Client-Side)
- **Framework**: React.js
- **Build Tool**: Vite
- **Routing**: React Router DOM (`react-router-dom`)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid) with extreme emphasis on Glassmorphism design aesthetics.
- **WebSockets**: Socket.IO Client (`socket.io-client`) for live vitals streaming over TCP multiplexing.

### Backend (Server-Side)
- **Environment**: Node.js
- **Framework**: Express.js
- **WebSockets**: Socket.IO for seamless duplex communication with the frontend clients.
- **Database Architecture**: **PostgreSQL**
- **ORM Module**: Sequelize (with `.sync()` automation)
- **Environment Variables**: dotenv for secure provisioning of database URI connections.

---

## 🚀 Installation & Setup Instructions

### Prerequisites
Before running the application, ensure you have:
- Node.js (v18+)
- Local or Remote PostgreSQL Database initialized
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/lucifer-6-6/vitacare.git
cd vitacare
```

### 2. Configure Backend Structure
Navigate to the `backend` folder and configure the database logic.
```bash
cd backend
npm install
```

Create a `.env` file in the root of the `backend` directory with your PostgreSQL variables:
```env
DB_NAME=vitacare
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 3. Start Backend Services
Start the server in the backend directory. Sequelize will automatically connect and create SQL database tables for the schemas immediately.
```bash
node server.js
# Output:
# PostgreSQL Connected via Sequelize.
# PostgreSQL Tables synced.
# Server running on port 5000
```

### 4. Running the React Interface
Open a new terminal window inside the root directory and boot up the Vite frontend application:
```bash
cd frontend
npm install
npm run dev
```
Visit the local url (typically `http://localhost:5173`) in your web browser. 

*(Note: The Vite setup implements an automatic proxy configuration that successfully routes `/api` REST calls directly to the Express backend port `5000` to prevent CORS issues without hardcoded base URLs).*

---

## ✨ Features

- **Personalized Health Dashboard**: Access continuous readouts on Heart Rate, SpO2, and Blood Pressure with live WebSocket streams updating securely in the charts.
- **VitaAI Assistant**: A robust interactive chat interface providing symptomatic assessment, vital analytics context, and algorithmic matching.
- **Smart Appointment Scheduling**: Time-block logic integrated doctor grid enabling precise selection across varied specialties with instantaneous SQL recording. 
- **Timeline Records Module**: Review medical history tags, lab records, prescriptions, and ECG echocardiograms chronologically in segmented categorized tabs.
- **Predictive Wellness Hub**: Daily tracking mechanics mapping hydration, BMI trajectories, caloric goals, REM sleep analytics, and behavioral tracking. 
- **Security & Glassmorphism Design**: Incorporates dark contrast layouts optimized with micro-animations creating a visually premium "health-centric" dashboard layout mimicking futuristic OS terminals.

---

## 🏗️ Technical Workflow

1. A user authenticates via the `/login` route resulting in a successful response. 
2. The user is redirected to the `/dashboard`. The frontend initiates a standard HTTP `fetch` to `/api/dashboard`, querying Node.js.
3. Node.js processes the request by executing a Sequelize `findAll` action against PostgreSQL via to obtain scheduled Appointment blocks corresponding to the connected User.
4. Concurrently, an ad-hoc Node.js `Server` Socket connection establishes. The dummy payload is simulated on `sendVitals` returning via `vitalsUpdate` dynamically adjusting state blocks in `Dashboard.jsx`.
5. Appointments execute a REST `POST` to `/api/appointments`; Sequelize triggers a model `.create()` inserting the transaction to SQL ensuring persistence.

---

## 📂 Directory Structure

```text
vitacare/
├── backend/
│   ├── .env               # Database credentials (not tracked in git)
│   ├── db.js              # Sequelize and PostgreSQL configurations
│   ├── server.js          # Express and Socket.IO initialization
│   ├── models/            # Sequelize Schemas
│   │   └── index.js       # User, Vitals, and Appointments data models
│   └── package.json
└── frontend/
    ├── src/
    │   ├── AiDoctor.jsx   # AI interaction dashboard 
    │   ├── App.jsx        # Routing and global Navbar
    │   ├── Appointments.jsx
    │   ├── Auth.jsx
    │   ├── Dashboard.jsx  # Vitals & WebSockets charts
    │   ├── Home.jsx       # Landing platform page
    │   ├── Records.jsx    # Chronological history parsing
    │   ├── Wellness.jsx
    │   ├── main.jsx
    │   └── index.css      # Core aesthetics & glassmorphism system
    ├── vite.config.js     # Dev server & HTTP backend proxy
    └── package.json
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login`: Authenticates the user and returns a mock JWT payload alongside creating a dummy test-user if they do not exist.

### Data
- `GET /api/dashboard`: Fetches limited Appointment configurations alongside active Vitacare stats payloads directly from PostgreSQL.
- `POST /api/appointments`: Ingests JSON body (`doctorName`, `specialty`, `date`) and dynamically injects appointment configurations into the database returning `Success 200/500`.

### WebSockets (WSS)
- **Emit `sendVitals`**: Pushes dummy heart-rate fluctuations up to Node.js
- **Listen `vitalsUpdate`**: Receives rebroadcast events to visualize chart oscillations down to React.

---

## 🔮 Future Roadmap
1. Connect VitaAI page directly to OpenAI GPT models.
2. Replace local HTTP tokens with robust JSON Web Token (JWT) + bcrypt encrypted middleware verification.
3. Migrate hardcoded wellness data in `Wellness.jsx` to dynamically push to PostgreSQL.
4. Scale PostgreSQL via AWS RDS or MongoDB Atlas deployments.

---

## 📄 License
This project is open-source and maintained for healthcare technology demonstrations. 
