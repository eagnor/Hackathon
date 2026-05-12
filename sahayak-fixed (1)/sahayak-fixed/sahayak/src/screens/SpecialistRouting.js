import React from "react";
import { TopBar } from "../components/TopBar";
import { T } from "../utils/translations";

export const SpecialistRouting = ({ onBack, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("specialistRouting") || "Specialist Referral"} onBack={onBack} theme={t} />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto", textAlign: "center" }}>
        <p style={{ fontSize: "48px", margin: "40px 0" }}>🏥</p>
        <h3>Specialist Routing</h3>
        <p style={{ color: t.textSub }}>Referral to nearest facility / Tele-Specialist</p>
      </div>
    </div>
  );
};
