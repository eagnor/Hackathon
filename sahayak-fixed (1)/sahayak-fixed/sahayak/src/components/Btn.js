import React, { useState } from "react";

export const Btn = ({ label, icon, onClick, variant = "primary", style: s = {}, disabled = false }) => {
  const [pressed, setPressed] = useState(false);
  const variants = {
    primary: { background: "#7C6FE0", color: "#fff" },
    danger: { background: "#F05454", color: "#fff" },
    ghost: { background: "transparent", color: "#EEEAF8", border: "1px solid #2E2C45" },
    green: { background: "#4CAF7D", color: "#fff" },
    amber: { background: "#F0A500", color: "#fff" },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        ...variants[variant],
        border: variant === "ghost" ? "1px solid #2E2C45" : "none",
        borderRadius: "14px",
        padding: "14px 20px",
        fontSize: "14px",
        fontWeight: 600,
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "all 0.1s",
        ...s,
      }}
    >
      {icon && <span style={{ fontSize: "16px" }}>{icon}</span>}
      {label}
    </button>
  );
};
