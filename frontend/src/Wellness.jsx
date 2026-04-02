import { useEffect } from "react";

export default function Wellness() {
  const initHabits = () => {
    const patterns = [
      [3,4,2,3,4,1,3,4,3,2,4,3,1,4,3,2,4,4,3,2,3,4,2,3,4,3,1,4],
      [4,3,3,4,2,4,3,4,3,4,2,3,4,3,4,2,3,4,3,4,3,2,4,3,4,3,4,2],
      [2,1,3,2,4,3,2,1,3,2,4,1,2,3,2,3,4,2,3,2,1,3,2,4,2,3,1,3],
      [3,4,3,4,2,3,4,3,2,4,3,4,3,4,3,2,4,3,4,3,4,2,3,4,3,4,3,4]
    ];
    const days = ['M','T','W','T','F','S','S'];
    const generateGrid = (gridIndex) => {
      return patterns[gridIndex].map((val, i) => (
        <div key={i} className={`habit-day habit-${val}`} title={days[i%7]}></div>
      ));
    };
    return {
      exercise: generateGrid(0),
      hydration: generateGrid(1),
      meditation: generateGrid(2),
      sleep: generateGrid(3)
    };
  };

  const handleSOS = () => {
    if(window.confirm('Send SOS alert to your emergency contacts and nearest hospital?\n\nYour location will be shared.')){
        alert('SOS sent! Emergency services and contacts have been notified.\n\nNearest: Kurnool Government Hospital (2.3 km)');
    }
  };

  return (
    <div className="page fade-in">
      <div className="wellness">
        <div className="section-label">Wellness Hub</div>
        <div className="section-title" style={{fontSize: "1.5rem", marginBottom: "0.5rem"}}>Your Wellness Dashboard</div>
        <p style={{color: "var(--text2)", fontSize: "0.85rem", marginBottom: "1.5rem"}}>Personalized health insights and lifestyle tracking</p>

        <div className="emergency-bar">
          <div style={{flex: 1}}>
            <strong>Emergency SOS</strong>
            <p>Tap to instantly alert emergency contacts and nearest hospital. Location is shared automatically.</p>
          </div>
          <button className="sos-btn" onClick={handleSOS}>SOS</button>
        </div>

        <div className="wellness-grid">
          <div className="wellness-card">
            <div className="wc-icon">⚖️</div>
            <div className="wc-label">Body Weight</div>
            <div className="wc-val" style={{color: "var(--accent)"}}>58.4 kg</div>
            <div className="wc-sub">−0.6 kg this month</div>
            <div className="bmi-meter"><div className="bmi-needle" style={{left: "38%"}}></div></div>
            <div style={{fontSize: "0.7rem", color: "var(--text2)", display: "flex", justifyContent: "space-between"}}>
                <span>Underweight</span><span>Normal</span><span>Obese</span>
            </div>
            <div style={{fontSize: "0.8rem", marginTop: "0.5rem"}}>
                <span style={{color: "var(--accent)", fontWeight: "600"}}>BMI: 21.4</span> — Normal
            </div>
          </div>
          
          <div className="wellness-card">
            <div className="wc-icon">🔥</div>
            <div className="wc-label">Calories Today</div>
            <div className="wc-val" style={{color: "var(--accent4)"}}>1,640</div>
            <div className="wc-sub">Goal: 2,000 kcal</div>
            <div className="progress-bar" style={{marginTop: "0.75rem"}}>
                <div className="progress-fill" style={{width: "82%", background: "linear-gradient(90deg,#ffb347,#ff6b9d)"}}></div>
            </div>
            <div style={{fontSize: "0.75rem", color: "var(--text2)", marginTop: "0.5rem"}}>Protein 78g · Carbs 210g · Fat 52g</div>
          </div>
          
          <div className="wellness-card">
            <div className="wc-icon">🧘</div>
            <div className="wc-label">Stress Level</div>
            <div className="wc-val" style={{color: "#a59dff"}}>Low</div>
            <div className="wc-sub">HRV: 48ms · Good recovery</div>
            <div className="progress-bar" style={{marginTop: "0.75rem"}}>
                <div className="progress-fill" style={{width: "25%", background: "linear-gradient(90deg,#6c63ff,#a59dff)"}}></div>
            </div>
            <div style={{fontSize: "0.75rem", color: "var(--text2)", marginTop: "0.5rem"}}>Mindfulness streak: 7 days 🔥</div>
          </div>
        </div>

        <div className="card" style={{marginBottom: "1rem"}}>
          <div className="card-title">Habit Tracker — Last 28 Days</div>
          <div style={{display: "grid", gridTemplateColumns: "80px 1fr", gap: "0.75rem", alignItems: "center"}}>
            <div style={{fontSize: "0.78rem", color: "var(--text2)"}}>Exercise</div>
            <div className="habits-grid">{initHabits().exercise}</div>
            
            <div style={{fontSize: "0.78rem", color: "var(--text2)"}}>Hydration</div>
            <div className="habits-grid">{initHabits().hydration}</div>
            
            <div style={{fontSize: "0.78rem", color: "var(--text2)"}}>Meditation</div>
            <div className="habits-grid">{initHabits().meditation}</div>
            
            <div style={{fontSize: "0.78rem", color: "var(--text2)"}}>Sleep 7h+</div>
            <div className="habits-grid">{initHabits().sleep}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">AI Wellness Recommendations</div>
          <div style={{display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem"}}>
            <div style={{display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem", background: "var(--bg2)", borderRadius: "8px"}}>
              <div style={{fontSize: "1.2rem", flexShrink: 0}}>🥗</div>
              <div>
                  <div style={{fontSize: "0.85rem", fontWeight: "500", marginBottom: "0.2rem"}}>Reduce refined carbohydrates</div>
                  <div style={{fontSize: "0.78rem", color: "var(--text2)"}}>Your HbA1c is borderline. Reducing rice portions and adding fiber can help normalize blood sugar.</div>
              </div>
            </div>
            <div style={{display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem", background: "var(--bg2)", borderRadius: "8px"}}>
              <div style={{fontSize: "1.2rem", flexShrink: 0}}>🏃</div>
              <div>
                  <div style={{fontSize: "0.85rem", fontWeight: "500", marginBottom: "0.2rem"}}>Add 20-min evening walk</div>
                  <div style={{fontSize: "0.78rem", color: "var(--text2)"}}>You're averaging 6,800 steps. A short evening walk will help reach your 10,000 step goal and improve insulin sensitivity.</div>
              </div>
            </div>
            <div style={{display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.75rem", background: "var(--bg2)", borderRadius: "8px"}}>
              <div style={{fontSize: "1.2rem", flexShrink: 0}}>☀️</div>
              <div>
                  <div style={{fontSize: "0.85rem", fontWeight: "500", marginBottom: "0.2rem"}}>Morning sunlight exposure</div>
                  <div style={{fontSize: "0.78rem", color: "var(--text2)"}}>Your Vitamin D is deficient. 15 minutes of morning sun exposure along with your supplement will aid absorption.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
