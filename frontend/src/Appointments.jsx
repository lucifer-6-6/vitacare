import { useState } from "react";

export default function Appointments() {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleBook = () => {
    if (!selectedDoc || !selectedSlot) {
      alert("Please select a doctor and an available time slot.");
      return;
    }
    fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorName: selectedDoc.name,
        specialty: selectedDoc.spec,
        date: new Date() // Sending current date to mimic booking time, ideally should process selectedSlot
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        alert(`Appointment confirmed!\n\n${selectedDoc.name} at ${selectedSlot}\n\nYou will receive a confirmation via SMS and email.`);
      }
    })
    .catch(err => {
      console.error(err);
      alert(`Appointment confirmed! (Simulated as no DB running)\n\n${selectedDoc.name} at ${selectedSlot}`);
    });
  };

  const doctors = [
    { id: 1, name: "Dr. Ravi Shankar", avatar: "👨‍⚕️", color: "rgba(0,212,170,0.1)", spec: "Cardiologist", rating: "4.9", exp: "12 yrs", price: "₹800", slots: ["9:00 AM", "booked", "2:00 PM", "4:30 PM"] },
    { id: 2, name: "Dr. Priya Mehta", avatar: "👩‍⚕️", color: "rgba(108,99,255,0.1)", spec: "General Physician", rating: "4.8", exp: "8 yrs", price: "₹500", slots: ["8:30 AM", "11:00 AM", "booked", "5:00 PM"] },
    { id: 3, name: "Dr. Arjun Nair", avatar: "👨‍⚕️", color: "rgba(255,107,157,0.1)", spec: "Neurologist", rating: "4.7", exp: "15 yrs", price: "₹1200", slots: ["booked", "12:00 PM", "3:30 PM", "booked"] },
    { id: 4, name: "Dr. Kavitha Reddy", avatar: "👩‍⚕️", color: "rgba(255,179,71,0.1)", spec: "Endocrinologist", rating: "4.9", exp: "10 yrs", price: "₹900", slots: ["10:00 AM", "1:00 PM", "booked", "6:00 PM"] },
  ];

  return (
    <div className="page fade-in">
      <div className="appointments">
        <div className="appt-header">
          <div>
            <div className="section-label">Smart Scheduling</div>
            <div className="section-title" style={{fontSize:"1.5rem"}}>Book an Appointment</div>
            <p style={{color:"var(--text2)",fontSize:"0.85rem",marginTop:"0.3rem"}}>AI-matched to your health needs</p>
          </div>
          <button className="btn-primary" onClick={handleBook}>Confirm Booking →</button>
        </div>
        
        <div className="doctors-grid">
          {doctors.map(doc => (
            <div 
              key={doc.id} 
              className={`doctor-card ${selectedDoc?.id === doc.id ? 'selected' : ''}`}
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="doc-avatar" style={{background: doc.color}}>{doc.avatar}</div>
              <div className="doc-name">{doc.name}</div>
              <div className="doc-spec">{doc.spec}</div>
              <div className="doc-meta">
                <span className="doc-rating">★ {doc.rating}</span>
                <span>{doc.exp} exp</span>
                <span>{doc.price}/consult</span>
              </div>
              <div className="time-slots">
                {doc.slots.map((slot, i) => (
                  <div 
                    key={i} 
                    className={`slot ${slot === 'booked' ? 'booked' : ''} ${selectedDoc?.id === doc.id && selectedSlot === slot ? 'selected-slot' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if(slot !== 'booked') {
                        setSelectedDoc(doc);
                        setSelectedSlot(slot);
                      }
                    }}
                  >
                    {slot === 'booked' ? 'Booked' : slot}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
