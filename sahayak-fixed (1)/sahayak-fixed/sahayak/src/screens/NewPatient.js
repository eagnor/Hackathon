import React, { useState } from "react";
import { Btn } from "../components/Btn";
import { TopBar } from "../components/TopBar";
import { T } from "../utils/translations";

export const NewPatient = ({ onStart, onBack, t, lang }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [village, setVillage] = useState("Rampur");
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;

  const field = (label, val, set, placeholder, type = "text") => (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ fontSize: "12px", fontWeight: 600, color: t.textSub, marginBottom: "5px" }}>{label}</div>
      <input
        type={type} value={val} onChange={e => set(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", background: t.surfaceHigh, border: `1px solid ${t.border}`,
          borderRadius: "12px", padding: "12px 14px", fontSize: "14px", color: t.text,
          outline: "none", boxSizing: "border-box",
        }}
      />
    </div>
  );

  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("newPatient")} onBack={onBack} theme={t} />
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        {field(tx("patientName"), name, setName, "e.g. Savitri Devi")}
        {field(tx("age"), age, setAge, "e.g. 45", "number")}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: t.textSub, marginBottom: "5px" }}>{tx("village")}</div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["Rampur", "Satna", "Other"].map(v => (
              <button key={v} onClick={() => setVillage(v)} style={{
                flex: 1, padding: "10px", borderRadius: "10px",
                border: `1px solid ${village === v ? t.accent : t.border}`,
                background: village === v ? t.accentBg : t.surfaceHigh,
                color: village === v ? t.accentLight : t.textSub,
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
              }}>{v}</button>
            ))}
          </div>
        </div>
        <Btn
          label={tx("startAssessment")}
          onClick={() => name && age && onStart({
            id: Date.now(), name, age: parseInt(age), village,
            severity: "green", symptom: "", time: "Now", history: [],
          })}
          disabled={!name || !age}
        />
      </div>
    </div>
  );
};
