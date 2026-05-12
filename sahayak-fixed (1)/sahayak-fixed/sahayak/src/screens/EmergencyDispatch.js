import React, { useState, useEffect } from "react";
import { TopBar } from "../components/TopBar";
import { Btn } from "../components/Btn";
import { T } from "../utils/translations";

export const EmergencyDispatch = ({ patient, assessment, onBack, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  const [coords, setCoords] = useState(null);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      pos => setCoords({ lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) }),
      () => setCoords({ lat: "24.8829", lng: "85.1167" })
    );
  }, []);

  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("emergency")} onBack={onBack} theme={t} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ background: t.redBg, border: `2px solid ${t.red}`, borderRadius: "16px", padding: "16px", textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🚨</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: t.red }}>CRITICAL CASE</div>
          <div style={{ fontSize: "13px", color: t.textSub, marginTop: "4px" }}>{patient.name} · {patient.village}</div>
        </div>
        <div style={{
          background: t.mapBg, borderRadius: "16px", height: "160px", border: `1px solid ${t.border}`,
          display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 20px,rgba(124,111,224,0.05) 20px,rgba(124,111,224,0.05) 21px)" }} />
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(124,111,224,0.05) 20px,rgba(124,111,224,0.05) 21px)" }} />
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: t.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", zIndex: 1 }}>📍</div>
          <div style={{ fontSize: "13px", color: t.textSub, zIndex: 1 }}>{coords ? `${coords.lat}° N, ${coords.lng}° E` : tx("gpsCoords")}</div>
          <div style={{ fontSize: "11px", color: t.textMuted, zIndex: 1 }}>{tx("eta")}: 12–15 {tx("minutes")}</div>
        </div>
        <div style={{ background: t.surfaceHigh, borderRadius: "14px", padding: "14px", border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: t.text, marginBottom: "6px" }}>{tx("dispatching")}</div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.green, animation: "geminiPulseOuter 1s infinite" }} />
            <span style={{ fontSize: "12px", color: t.textSub }}>108 Ambulance · {patient.village} PHC</span>
          </div>
        </div>
        <Btn label={dispatched ? tx("ambulanceDispatched") : `🚑 ${tx("dispatchAmbulance")}`} variant="danger" onClick={() => setDispatched(true)} disabled={dispatched} />
        <div style={{ background: t.surfaceHigh, borderRadius: "12px", padding: "10px 14px", border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: "11px", color: t.textMuted, lineHeight: "1.5" }}>
            <strong style={{ color: t.text }}>Patient:</strong> {patient.name}, {patient.age}y · {assessment.condition}<br/>
            <strong style={{ color: t.text }}>Symptom:</strong> {assessment.severity}<br/>
            <strong style={{ color: t.text }}>Action:</strong> {assessment.action}
          </div>
        </div>
      </div>
    </div>
  );
};
