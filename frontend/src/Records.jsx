import { useState } from "react";

export default function Records() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="page fade-in">
      <div className="records">
        <div className="appt-header" style={{marginBottom: "1.5rem"}}>
          <div>
            <div className="section-label">Health Records</div>
            <div className="section-title" style={{fontSize: "1.5rem"}}>Medical History</div>
          </div>
          <button className="btn-primary" style={{fontSize: "0.82rem", padding: "0.6rem 1.25rem"}}>Upload Records ↑</button>
        </div>
        
        <div className="records-tabs">
          <button className={`rec-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Records</button>
          <button className={`rec-tab ${activeTab === 'lab' ? 'active' : ''}`} onClick={() => setActiveTab('lab')}>Lab Results</button>
          <button className={`rec-tab ${activeTab === 'rx' ? 'active' : ''}`} onClick={() => setActiveTab('rx')}>Prescriptions</button>
          <button className={`rec-tab ${activeTab === 'img' ? 'active' : ''}`} onClick={() => setActiveTab('img')}>Imaging</button>
        </div>
        
        <div className="timeline">
          {(activeTab === 'all' || activeTab === 'rx') && (
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="tl-date">March 28, 2026 · Dr. Priya Mehta</div>
                <div className="tl-title">Annual Health Checkup</div>
                <div className="tl-doctor">General Physician · Apollo Clinic, Kurnool</div>
                <p style={{fontSize: "0.82rem", color: "var(--text2)", marginTop: "0.5rem", lineHeight: "1.6"}}>All vitals within normal range. Slight elevation in blood sugar (103 mg/dL fasting). Recommended dietary modification and follow-up in 3 months. Vitamin D deficiency noted.</p>
                <div className="tl-tags">
                  <span className="tag tag-green">Routine</span>
                  <span className="tag tag-blue">Completed</span>
                  <span className="tag tag-red">Vitamin D Deficient</span>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'lab') && (
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="tl-date">Jan 15, 2026 · Lab Results</div>
                <div className="tl-title">HbA1c + Lipid Panel</div>
                <div className="tl-doctor">Vijaya Diagnostics, Kurnool</div>
                <p style={{fontSize: "0.82rem", color: "var(--text2)", marginTop: "0.5rem", lineHeight: "1.6"}}>HbA1c: 5.8% (Pre-diabetic borderline). LDL: 112 mg/dL. HDL: 58 mg/dL. Triglycerides: 134 mg/dL. Total Cholesterol: 198 mg/dL.</p>
                <div className="tl-tags">
                  <span className="tag tag-blue">Lab Report</span>
                  <span className="tag tag-red">Pre-diabetic Flag</span>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'img') && (
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="tl-date">Nov 10, 2025 · Dr. Ravi Shankar</div>
                <div className="tl-title">ECG + Echo Consultation</div>
                <div className="tl-doctor">Cardiologist · Care Hospitals</div>
                <p style={{fontSize: "0.82rem", color: "var(--text2)", marginTop: "0.5rem", lineHeight: "1.6"}}>ECG shows normal sinus rhythm. Echocardiogram within normal limits. EF: 62%. No structural abnormalities detected. Continue current medications.</p>
                <div className="tl-tags">
                  <span className="tag tag-green">Cardiac</span>
                  <span className="tag tag-blue">Normal</span>
                  <span className="tag tag-green">EF 62%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
