import React from "react";
import { TopBar } from "../components/TopBar";
import { Btn } from "../components/Btn";
import { T } from "../utils/translations";

export const Prescription = ({ patient, assessment, onBack, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("prescription")} onBack={onBack} theme={t} />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <div style={{ background: t.surfaceHigh, borderRadius: "16px", padding: "20px" }}>
          <h3 style={{ margin: "0 0 16px", color: t.text }}>{patient.name}</h3>
          <p><strong>{tx("diagnosis")}:</strong> {assessment?.condition || "Fever & Cough"}</p>
          <p><strong>{tx("dosage")}:</strong> Tab. Paracetamol 500mg — 1 tab thrice daily × 5 days</p>
          <p><strong>{tx("instructions")}:</strong> Take with food. Plenty of fluids.</p>
        </div>

        <Btn label={tx("sendRx")} onClick={() => alert(tx("orderPlaced") || "Order Placed!")} style={{ marginTop: "20px" }} />
        <Btn label={tx("shareWhatsApp")} variant="ghost" style={{ marginTop: "12px" }} />
      </div>
    </div>
  );
};
