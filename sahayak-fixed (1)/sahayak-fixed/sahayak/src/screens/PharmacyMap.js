import React from "react";
import { TopBar } from "../components/TopBar";
import { T } from "../utils/translations";

export const PharmacyMap = ({ onBack, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("pharmacyMap") || "Nearby Pharmacies"} onBack={onBack} theme={t} />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <div style={{ background: t.surfaceHigh, borderRadius: "16px", padding: "20px", textAlign: "center" }}>
          <p style={{ fontSize: "48px", margin: "20px 0" }}>🗺️</p>
          <h3>Nearby Jan Aushadhi & Pharmacies</h3>
          <p style={{ color: t.textSub }}>Map view would appear here</p>
        </div>
      </div>
    </div>
  );
};
