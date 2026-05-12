import React from "react";
import { TopBar } from "../components/TopBar";
import { Btn } from "../components/Btn";
import { Pill } from "../components/Pill";
import { T } from "../utils/translations";
import { severityMap } from "../utils/helpers";

export const TriageResult = ({ patient, assessment, onBook, onBack, onSpecialist, onEmergency, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  const sev = assessment.severity?.toLowerCase().includes("critical") ? "red"
    : assessment.severity?.toLowerCase().includes("moderate") ? "amber" : "green";
  const sm = severityMap(t);
  const sevStyle = sm[sev] || sm.green;
  const needsSpecialist = /cardiac|heart|cardio|orthop|gynec|neuro|cancer/i.test(assessment.condition || "");

  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("assessmentResult")} onBack={onBack} theme={t} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ background: sevStyle.bg, border: `1px solid ${sevStyle.color}`, borderRadius: "16px", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{ fontSize: "22px" }}>{sev === "red" ? "🚨" : sev === "amber" ? "⚠️" : "✅"}</span>
            <div>
              <Pill label={assessment.severity || "Mild"} color={sevStyle.color} bg={sevStyle.bg} />
              <div style={{ fontSize: "13px", color: t.text, marginTop: "4px", fontWeight: 600 }}>{assessment.condition}</div>
            </div>
          </div>
          <div style={{ fontSize: "13px", color: t.textSub, lineHeight: "1.5" }}>
            <strong style={{ color: t.text }}>{tx("recommended")} </strong>{assessment.action}
          </div>
        </div>
        <div style={{ background: t.surfaceHigh, borderRadius: "16px", padding: "14px", border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: t.accentLight, letterSpacing: "0.06em", marginBottom: "8px" }}>{tx("doctorBrief")}</div>
          <p style={{ margin: 0, fontSize: "13px", color: t.textSub, lineHeight: "1.6" }}>{assessment.doctorBrief}</p>
        </div>
        <div style={{ background: t.surfaceHigh, borderRadius: "16px", padding: "14px", border: `1px solid ${t.border}` }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: t.green, letterSpacing: "0.06em", marginBottom: "8px" }}>{tx("careAdvice")}</div>
          <p style={{ margin: 0, fontSize: "13px", color: t.textSub, lineHeight: "1.6" }}>{assessment.careAdvice}</p>
        </div>
        <div style={{ background: t.amberBg, borderRadius: "12px", padding: "10px 14px", border: `1px solid ${t.amber}`, display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px" }}>🏛️</span>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: t.amber }}>{tx("ayushman")}</div>
            <div style={{ fontSize: "11px", color: t.textSub }}>{tx("ayushmanSub")}</div>
          </div>
        </div>
        {needsSpecialist && (
          <div style={{ background: t.redBg, borderRadius: "12px", padding: "10px 14px", border: `1px solid ${t.red}`, display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "14px" }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: t.red }}>{tx("specialistNeeded")}</div>
              <div style={{ fontSize: "11px", color: t.textSub }}>{tx("noSpecialist")}</div>
            </div>
            <button onClick={onSpecialist} style={{ background: t.red, color: "#fff", border: "none", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>{tx("refer")}</button>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {sev === "green" && <Btn label={`💊 ${tx("pharmacyMap")}`} onClick={onBook} />}
          {sev === "amber" && <Btn label={tx("bookTeleconsult")} onClick={onBook} />}
          {sev === "red" && <Btn label={tx("dispatchAmbulance")} variant="danger" onClick={onEmergency} />}
        </div>
      </div>
    </div>
  );
};
