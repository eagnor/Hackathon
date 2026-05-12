import React, { useState, useEffect } from "react";
import { TopBar } from "../components/TopBar";
import { Pill } from "../components/Pill";
import { Btn } from "../components/Btn";
import { T } from "../utils/translations";
import { mockDoctors } from "../utils/mockData";

export const Teleconsult = ({ patient, assessment, onBack, onEnd, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  const [connected, setConnected] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [timer, setTimer] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    let interval;
    if (connected) {
      interval = setInterval(() => setTimer(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [connected]);

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const handleConnect = (doc) => {
    setSelectedDoctor(doc);
    setTimeout(() => setConnected(true), 2000);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { from: "asha", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, { from: "doc", text: "Noted. Please continue with the assessment." }]);
    }, 1500);
  };

  if (!connected) {
    return (
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TopBar title={tx("teleconsult")} onBack={onBack} theme={t} />
        <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ background: t.accentBg, borderRadius: "16px", padding: "14px", border: `1px solid ${t.accent}` }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: t.accentLight }}>{patient?.name}, {patient?.age} · {patient?.village}</div>
            <div style={{ fontSize: "12px", color: t.textSub, marginTop: "4px" }}>{assessment?.condition}</div>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: t.text, marginBottom: "4px" }}>{tx("availableDoctors")}</div>
          {mockDoctors.map(doc => (
            <div key={doc.id} onClick={() => handleConnect(doc)} style={{
              background: t.surfaceHigh, borderRadius: "14px", padding: "12px 14px",
              border: `1px solid ${t.border}`, cursor: "pointer",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: doc.status === "online" ? t.greenBg : t.amberBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: 700, color: doc.status === "online" ? t.green : t.amber,
              }}>{doc.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>{doc.name}</div>
                <div style={{ fontSize: "11px", color: t.textSub }}>{doc.specialty}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Pill label={tx(doc.status)} color={doc.status === "online" ? t.green : doc.status === "busy" ? t.amber : t.textMuted} bg={doc.status === "online" ? t.greenBg : doc.status === "busy" ? t.amberBg : t.surfaceHigh} />
                <div style={{ fontSize: "11px", color: t.textMuted, marginTop: "4px" }}>{tx("waitTime")}: {doc.wait}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", background: "#000" }}>
      <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0f0f1a 100%)" }} />
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #7C6FE0, #A99DF5)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 12px",
          }}>{selectedDoctor?.avatar}</div>
          <div style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>{selectedDoctor?.name}</div>
          <div style={{ fontSize: "12px", color: "#8B87A8", marginTop: "4px" }}>{selectedDoctor?.specialty}</div>
          <div style={{ fontSize: "14px", color: "#4CAF7D", marginTop: "8px", fontVariantNumeric: "tabular-nums" }}>{formatTime(timer)}</div>
        </div>
        <div style={{
          position: "absolute", bottom: "16px", right: "16px",
          width: "80px", height: "110px", borderRadius: "12px",
          background: "#1A1928", border: "2px solid #2E2C45",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: "24px" }}>👤</span>
        </div>
        <div style={{
          position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)",
          background: "rgba(76,175,125,0.2)", border: "1px solid #4CAF7D", borderRadius: "20px", padding: "4px 12px",
        }}>
          <span style={{ fontSize: "11px", color: "#4CAF7D", fontWeight: 600 }}>● {tx("connectedDoctor")}</span>
        </div>
      </div>

      <div style={{ height: "140px", background: t.surface, borderTop: `1px solid ${t.border}`, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {chatMessages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.from === "asha" ? "flex-end" : "flex-start",
              background: m.from === "asha" ? t.accent : t.surfaceHigh,
              color: t.text, borderRadius: "10px", padding: "6px 10px", fontSize: "12px", maxWidth: "80%",
            }}>{m.text}</div>
          ))}
        </div>
        <div style={{ padding: "6px 12px", display: "flex", gap: "8px", borderTop: `1px solid ${t.border}` }}>
          <input
            value={chatInput} onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSendChat()}
            placeholder="Type note..."
            style={{
              flex: 1, background: t.surfaceHigh, border: `1px solid ${t.border}`,
              borderRadius: "8px", padding: "8px 10px", fontSize: "12px", color: t.text, outline: "none",
            }}
          />
          <button onClick={handleSendChat} style={{
            background: t.accent, border: "none", borderRadius: "8px",
            padding: "8px 12px", color: "#fff", fontSize: "12px", fontWeight: 600, cursor: "pointer",
          }}>Send</button>
        </div>
      </div>

      <div style={{ padding: "12px 20px", display: "flex", gap: "12px", justifyContent: "center", background: t.surface }}>
        <button style={{
          width: "48px", height: "48px", borderRadius: "50%", background: t.surfaceHigh,
          border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "18px",
        }}>🎤</button>
        <button style={{
          width: "48px", height: "48px", borderRadius: "50%", background: t.surfaceHigh,
          border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "18px",
        }}>📹</button>
        <button onClick={onEnd} style={{
          flex: 1, background: t.red, border: "none", borderRadius: "12px",
          padding: "12px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer",
        }}>{tx("endCall")}</button>
      </div>
    </div>
  );
};
