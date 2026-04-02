import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page fade-in">
      <div className="hero">
        <div className="hero-badge"><span className="pulse-dot"></span>AI-Powered Healthcare Platform</div>
        <h1>Your Health,<br /><em>Intelligently</em> Managed</h1>
        <p>A unified platform combining real-time vitals, AI diagnostics, smart scheduling, and predictive wellness — designed for the future of personalized medicine.</p>
        <div className="hero-actions">
          <Link to="/dashboard" className="btn-primary">Open Dashboard</Link>
          <button className="btn-ghost" onClick={() => alert('AI Doctor coming soon!')}>Talk to AI Doctor</button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">98.7%</div><div className="stat-label">Accuracy Rate</div></div>
        <div className="stat-item"><div className="stat-num">2.4M+</div><div className="stat-label">Patients Served</div></div>
        <div className="stat-item"><div className="stat-num">4,800+</div><div className="stat-label">Verified Doctors</div></div>
        <div className="stat-item"><div className="stat-num">&lt;2min</div><div className="stat-label">Avg Response Time</div></div>
      </div>

      <div className="section">
        <div className="section-label">Platform Features</div>
        <div className="section-title">Everything Healthcare,<br />In One Place</div>
        <div className="section-sub">Advanced features designed for patients, caregivers, and clinicians</div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon fi-green">🧠</div>
            <h3>AI Symptom Diagnosis</h3>
            <p>Conversational AI trained on clinical data provides intelligent triage and symptom assessment, 24/7.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon fi-purple">📊</div>
            <h3>Real-time Vitals Monitoring</h3>
            <p>Live tracking of heart rate, SpO₂, blood pressure, and glucose with anomaly detection alerts.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon fi-pink">📅</div>
            <h3>Smart Scheduling</h3>
            <p>AI-matched appointments based on symptoms, doctor speciality, and availability in real time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon fi-amber">🗂️</div>
            <h3>Unified Health Records</h3>
            <p>Complete medical history, lab results, prescriptions, and imaging — encrypted and accessible.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
