import React from "react";
import { Pill } from "../components/Pill";
import { Btn } from "../components/Btn";
import { T } from "../utils/translations";
import { patients } from "../utils/mockData";
import { severityMap } from "../utils/helpers";

export const Dashboard = ({ onNewCase, onPatient, onSettings, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  const sm = severityMap(t);
  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "4px 20px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: "13px", color: t.textSub }}>{tx("goodMorning")}</p>
          <h1 style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: 700, color: t.text }}>Priya (ASHA Worker)</h1>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: t.textMuted }}>Rampur & Satna villages · 48 registered</p>
        </div>
        <button onClick={onSettings} style={{
          background: t.surfaceHigh, border: `1px solid ${t.border}`, borderRadius: "10px",
          width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "16px", flexShrink: 0,
        }}>⚙️</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", padding: "0 20px 16px" }}>
        {[["48", tx("registered")], ["6", tx("thisWeek")], ["1", tx("critical")]].map(([num, lbl]) => (
          <div key={lbl} style={{ background: t.surfaceHigh, borderRadius: "14px", padding: "12px", border: `1px solid ${t.border}` }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: t.text }}>{num}</div>
            <div style={{ fontSize: "11px", color: t.textSub, marginTop: "2px" }}>{lbl}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 20px 12px" }}><Btn label={tx("newCase")} onClick={onNewCase} /></div>
      <div style={{ padding: "0 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>{tx("recentCases")}</span>
        <span style={{ fontSize: "12px", color: t.accent }}>{tx("seeAll")}</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {patients.map(p => (
          <div key={p.id} onClick={() => onPatient(p)} style={{
            background: t.surfaceHigh, borderRadius: "16px", padding: "12px 14px",
            border: `1px solid ${t.border}`, cursor: "pointer",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%", background: t.accentBg,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
              flexShrink: 0, fontWeight: 700, color: t.accentLight,
            }}>{p.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: t.text }}>{p.name}</span>
                <Pill label={sm[p.severity]?.label || "Mild"} color={sm[p.severity]?.color} bg={sm[p.severity]?.bg} />
              </div>
              <div style={{ fontSize: "12px", color: t.textSub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {p.symptom} · {p.village}
              </div>
            </div>
            <span style={{ fontSize: "11px", color: t.textMuted, flexShrink: 0 }}>{p.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
