import React from "react";
import { TopBar } from "../components/TopBar";
import { Btn } from "../components/Btn";
import { T } from "../utils/translations";

export const PatientProfile = ({ patient, onBack, t, lang, onStartAssessment }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("patientProfile")} onBack={onBack} theme={t} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ textAlign: "center", padding: "30px 20px", background: t.surfaceHigh, borderRadius: "16px" }}>
          <div style={{ fontSize: "56px", marginBottom: "12px" }}>👤</div>
          <h2 style={{ margin: "0 0 8px", color: t.text }}>{patient.name}</h2>
          <p style={{ color: t.textSub, fontSize: "15px" }}>{patient.age} years • {patient.village}</p>
        </div>

        <Btn label={tx("startAssessment")} onClick={() => onStartAssessment(patient)} />

        <div style={{ background: t.surfaceHigh, borderRadius: "16px", padding: "16px" }}>
          <div style={{ fontWeight: 600, marginBottom: "12px", color: t.text }}>{tx("caseHistory")}</div>
          {patient.history?.length > 0 ? (
            patient.history.map((h, i) => (
              <div key={i} style={{ padding: "12px", background: t.bg, borderRadius: "10px", marginBottom: "8px", fontSize: "13px" }}>
                <strong>{h.date}</strong> — {h.symptom} ({h.severity})
              </div>
            ))
          ) : (
            <p style={{ color: t.textMuted, fontStyle: "italic" }}>{tx("noHistory")}</p>
          )}
        </div>
      </div>
    </div>
  );
};
