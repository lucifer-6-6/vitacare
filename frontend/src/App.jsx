import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Auth from "./Auth";
import AiDoctor from "./AiDoctor";
import Appointments from "./Appointments";
import Records from "./Records";
import Wellness from "./Wellness";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? " active" : "";
  
  if (location.pathname === "/") return null;

  return (
    <nav>
      <Link to="/home" className="nav-logo">vita<span>care</span></Link>
      <div className="nav-links">
        <Link to="/home" className={"nav-link" + isActive('/home')}>Home</Link>
        <Link to="/dashboard" className={"nav-link" + isActive('/dashboard')}>Dashboard</Link>
        <Link to="/ai-doctor" className={"nav-link" + isActive('/ai-doctor')}>AI Doctor</Link>
        <Link to="/appointments" className={"nav-link" + isActive('/appointments')}>Appointments</Link>
        <Link to="/records" className={"nav-link" + isActive('/records')}>Records</Link>
        <Link to="/wellness" className={"nav-link" + isActive('/wellness')}>Wellness</Link>
      </div>
      <Link to="/dashboard" className="nav-btn">My Health →</Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-doctor" element={<AiDoctor />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/records" element={<Records />} />
        <Route path="/wellness" element={<Wellness />} />
      </Routes>
    </BrowserRouter>
  );
}
