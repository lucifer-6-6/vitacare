require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const { sequelize, connectDB } = require('./db');
const { User, Appointment, Vitals } = require('./models/index');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.post("/api/auth/login", async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      // Auto-create a dummy user for demo purposes if they don't exist
      user = await User.create({ name: 'Pravallika', email: req.body.email || 'test@test.com', password: 'demo' });
    }
    res.json({ token: "demo-jwt", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    // In a real app we fetch appointments for a specific userId via JWT
    const appointments = await Appointment.findAll({ limit: 5 });
    res.json({
      msg: "System Active - PostgreSQL Connected",
      vitals: { heartRate: 72, spo2: 98, bp: "118/76" },
      appointments: appointments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const appt = await Appointment.create({
      doctorName: req.body.doctorName,
      specialty: req.body.specialty,
      date: req.body.date,
      status: "Confirmed"
    });
    res.json({ success: true, appointment: appt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("sendVitals", async (data) => {
    io.emit("vitalsUpdate", data);
  });
});

const PORT = process.env.PORT || 5000;

// Connect to DB and let Sequelize sync tables if they don't exist
connectDB().then(() => {
  sequelize.sync({ alter: true }).then(() => {
    console.log("PostgreSQL Tables synced.");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
});
