import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

export default function Dashboard() {
  const [data, setData] = useState({ vitals: { heartRate: "---", spo2: "---", bp: "---" }, appointments: [] });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);

    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("vitalsUpdate", (vitalsData) => {
      setData(prev => ({ ...prev, vitals: { ...prev.vitals, ...vitalsData } }));
    });

    return () => newSocket.close();
  }, []);

  return (
    <div className="page fade-in" id="page-dashboard">
      <div className="dashboard">
        <div className="dash-header">
          <div className="dash-greeting">
            <h2>Good morning, Pravallika 👋</h2>
            <p>Your health score is excellent today. Status: {data.msg || "Loading..."}</p>
          </div>
          <div className="health-score">
            <div className="score-ring">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
                <circle cx="30" cy="30" r="24" fill="none" stroke="#00d4aa" strokeWidth="6" strokeDasharray="131" strokeDashoffset="20" strokeLinecap="round"/>
              </svg>
              <div className="score-val">87</div>
            </div>
            <div className="score-info">
              <strong>Health Score</strong>
              <p>+3 from last week</p>
            </div>
          </div>
        </div>

        <div className="dash-grid">
          <div className="card">
            <div className="card-title">Heart Rate</div>
            <div className="metric-big">{data.vitals.heartRate}<span className="metric-unit">bpm</span></div>
            <div className="metric-trend trend-up">↑ Normal range</div>
          </div>
          <div className="card">
            <div className="card-title">Blood Oxygen (SpO₂)</div>
            <div className="metric-big">{data.vitals.spo2}<span className="metric-unit">%</span></div>
            <div className="metric-trend trend-up">↑ Optimal</div>
          </div>
          <div className="card">
            <div className="card-title">Blood Pressure</div>
            <div className="metric-big">{data.vitals.bp}<span className="metric-unit">mmHg</span></div>
            <div className="metric-trend trend-up">↑ Healthy</div>
          </div>
        </div>

        <div className="dash-grid-wide">
          <div className="card">
            <div className="card-title">Upcoming Appointments</div>
            {data.appointments.map((a, i) => (
              <div className="appointment" key={i}>
                <div className="appt-time">{a.date}</div>
                <div className="appt-dot" style={{background: "#00d4aa"}}></div>
                <div className="appt-info"><p>{a.doctor}</p></div>
                <div className="appt-status status-confirm">{a.status}</div>
              </div>
            ))}
            <button className="btn-primary" style={{marginTop: "1rem", padding: "0.6rem 1.25rem", fontSize: "0.82rem", width: "100%"}}>Book New Appointment →</button>
          </div>

          <div className="card">
            <div className="card-title">Today's Medications</div>
            <div className="med-item"><div className="med-icon">💊</div><div><div className="med-name">Metformin 500mg</div><div className="med-dose">After breakfast</div></div></div>
            <div className="med-item"><div className="med-icon">🩺</div><div><div className="med-name">Vitamin D3 60K</div><div className="med-dose">After lunch</div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
