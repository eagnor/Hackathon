import React from "react";

export const TopBar = ({ title, onBack, right, theme: t }) => (
  <div style={{ padding: "8px 20px 12px", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
    {onBack && (
      <button
        onClick={onBack}
        style={{
          background: t.surfaceHigh,
          border: "none",
          borderRadius: "10px",
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: t.text,
          fontSize: "18px",
          flexShrink: 0,
        }}
      >
        ‹
      </button>
    )}
    <span style={{ fontSize: "16px", fontWeight: 600, color: t.text, flex: 1 }}>{title}</span>
    {right}
  </div>
);
