import React from "react";

export const Pill = ({ label, color, bg }) => (
  <span style={{
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: "20px",
    background: bg,
    color,
    letterSpacing: "0.03em",
  }}>
    {label}
  </span>
);
