import React from "react";
import { T } from "../utils/translations";

export const OfflineBanner = ({ lang }) => (
  <div style={{
    background: "#221800",
    borderBottom: "1px solid #F0A500",
    padding: "6px 20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  }}>
    <span style={{ fontSize: "12px" }}>📡</span>
    <span style={{ fontSize: "11px", color: "#F0A500", fontWeight: 600 }}>
      {T[lang]?.offline || T.en.offline}
    </span>
  </div>
);
