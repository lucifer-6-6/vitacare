import { useState, useRef, useEffect } from "react";

const responses = {
  'headache': ['Headaches can have many causes — tension, dehydration, poor sleep, or screen time. How long have you had this headache, and is it dull/throbbing? Have you had enough water today?\n\nFor immediate relief: try resting in a dark quiet room and drinking 2 glasses of water. If the headache is severe, sudden, or with fever — please see a doctor urgently.', 'Based on your recent checkup, your BP was normal. Tension headaches are most common and often resolve with rest and hydration. If it persists >24hrs, I recommend booking with Dr. Priya Mehta.'],
  'tired': ['Fatigue can be related to your Vitamin D deficiency, borderline blood sugar, or disrupted sleep. Your sleep data shows 7.2hrs which is decent.\n\nChecklist: Have you taken your Vitamin D3 supplement this week? Eaten a balanced breakfast? I see your HbA1c is borderline — blood sugar fluctuations can cause energy dips.'],
  'chest': ['⚠️ Chest discomfort should always be evaluated. Please tell me more: Is it sharp or dull? Does it radiate to your arm/jaw? Are you short of breath?\n\nGiven your cardiac history (you had an ECG done in Nov 2025 — normal), it could be muscular or acid reflux, BUT chest pain is always worth checking. Should I connect you with Dr. Ravi Shankar for a quick teleconsult?'],
  'breath': ['Shortness of breath can range from anxiety to cardiac or pulmonary causes. Your SpO₂ is currently 98% — that is good.\n\nIs this occurring at rest or with activity? Any cough, fever, or recent travel? If severe or sudden, please call emergency services immediately.'],
  'vitals': ['Your current vitals look great today! 💚\n\n❤️ Heart Rate: 72 bpm (Normal)\n🫁 SpO₂: 98% (Optimal)\n🩸 Blood Pressure: 118/76 mmHg (Healthy)\n🔥 Calories: 1,640/2,000 kcal\n👣 Steps: 6,842/10,000\n\nOverall Health Score: 87/100. Keep it up!'],
  'medication': ['Your current medications:\n\n💊 Metformin 500mg — after breakfast (taken ✓)\n💊 Vitamin D3 60K — after lunch\n💉 Lisinopril 10mg — night\n🌿 Omega-3 — with dinner\n\nNo known drug interactions detected. Remember to take Vitamin D with a fat-containing meal for better absorption.'],
  'default': ["I understand. Can you describe your symptoms more specifically? For example:\n• When did it start?\n• Is it constant or intermittent?\n• Any other symptoms?\n\nThis helps me give you a more accurate assessment. You can also ask me about your vitals, medications, or book an appointment with a specialist."]
};

export default function AiDoctor() {
  const [messages, setMessages] = useState([
    { text: "Hello Pravallika! I'm VitaAI, your personal health assistant. I can help you assess symptoms, understand your vitals, explain medications, and guide you to the right care. How are you feeling today?", role: "bot", time: "Just now" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMsg = (textOverride) => {
    const text = textOverride || input.trim();
    if (!text) return;
    
    const now = new Date();
    const timeStr = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    setMessages(prev => [...prev, { text, role: "user", time: timeStr }]);
    if(!textOverride) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const key = Object.keys(responses).find(k => text.toLowerCase().includes(k)) || 'default';
      const arr = responses[key];
      const resp = Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr;
      
      const newNow = new Date();
      const newTimeStr = newNow.getHours() + ':' + (newNow.getMinutes() < 10 ? '0' : '') + newNow.getMinutes();
      setMessages(prev => [...prev, { text: resp, role: "bot", time: newTimeStr }]);
    }, 1400 + Math.random() * 800);
  };

  return (
    <div className="page fade-in">
      <div className="ai-doctor">
        <div className="ai-header">
          <div className="ai-avatar">🩺</div>
          <h2>VitaAI — Your Health Assistant</h2>
          <p>Powered by clinical AI · Available 24/7 · Not a replacement for professional care</p>
        </div>
        <div className="ai-disclaimer">⚠️ VitaAI provides general health information only. Always consult a qualified medical professional for diagnosis and treatment.</div>

        <div className="chat-area" ref={chatAreaRef}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="msg-bubble" dangerouslySetInnerHTML={{__html: m.text.replace(/\n/g, '<br>')}}></div>
              <div className="msg-time">{m.time}</div>
            </div>
          ))}
          {isTyping && (
            <div className="msg bot">
              <div className="msg-bubble typing-bubble">
                <div className="typing"><span></span><span></span><span></span></div>
              </div>
            </div>
          )}
          <div className="symptom-chips">
            <div className="chip" onClick={() => sendMsg("I have a headache")}>I have a headache</div>
            <div className="chip" onClick={() => sendMsg("Feeling tired")}>Feeling tired</div>
            <div className="chip" onClick={() => sendMsg("Chest discomfort")}>Chest discomfort</div>
            <div className="chip" onClick={() => sendMsg("Shortness of breath")}>Shortness of breath</div>
            <div className="chip" onClick={() => sendMsg("Check my vitals")}>Check my vitals</div>
            <div className="chip" onClick={() => sendMsg("Medication advice")}>Medication advice</div>
          </div>
        </div>

        <div className="chat-input-area">
          <textarea 
            className="chat-input" 
            placeholder="Describe your symptoms or ask a health question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter' && !e.shiftKey) { 
                e.preventDefault(); 
                sendMsg(); 
              }
            }}
          ></textarea>
          <button className="send-btn" onClick={() => sendMsg()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0e1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
