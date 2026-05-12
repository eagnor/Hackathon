import React from "react";
import { langLabel } from "../utils/translations";

// ── Gemini-style animated orb mic ─────────────────────────────
export const GeminiOrb = ({ state, onClick, disabled, lang, tx }) => {
  const isActive = state !== "idle";
  const gradients = {
    idle:       "conic-gradient(from 0deg at 50% 50%, #4285F4 0deg, #9C27B0 90deg, #F4511E 180deg, #34A853 270deg, #4285F4 360deg)",
    listening:  "conic-gradient(from 0deg at 50% 50%, #F4511E 0deg, #FF7043 90deg, #FFCA28 180deg, #F4511E 360deg)",
    processing: "conic-gradient(from 0deg at 50% 50%, #FFCA28 0deg, #FFD54F 90deg, #FFF176 180deg, #FFCA28 360deg)",
    speaking:   "conic-gradient(from 0deg at 50% 50%, #34A853 0deg, #66BB6A 90deg, #A5D6A7 180deg, #34A853 360deg)",
  };
  const labels = {
    idle:       tx("tapToSpeak"),
    listening:  tx("tapToStop"),
    processing: tx("processing"),
    speaking:   "AI SPEAKING",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <div style={{ position: "relative", width: "92px", height: "92px" }}>
        {isActive && (
          <>
            <div style={{
              position: "absolute", inset: "-16px", borderRadius: "50%",
              background: state === "listening" ? "radial-gradient(circle, rgba(244,81,30,0.2) 0%, transparent 70%)"
                : state === "processing" ? "radial-gradient(circle, rgba(255,202,40,0.2) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(52,168,83,0.2) 0%, transparent 70%)",
              animation: "geminiPulseOuter 2s ease-in-out infinite",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", inset: "-8px", borderRadius: "50%",
              background: state === "listening" ? "radial-gradient(circle, rgba(244,81,30,0.15) 0%, transparent 70%)"
                : state === "processing" ? "radial-gradient(circle, rgba(255,202,40,0.15) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(52,168,83,0.15) 0%, transparent 70%)",
              animation: "geminiPulseInner 2s 0.3s ease-in-out infinite",
              pointerEvents: "none",
            }} />
          </>
        )}
        <button
          onClick={onClick}
          disabled={disabled || state === "processing"}
          style={{
            width: "92px", height: "92px", borderRadius: "50%", border: "none",
            cursor: (disabled || state === "processing") ? "not-allowed" : "pointer",
            position: "relative", overflow: "hidden",
            opacity: disabled ? 0.4 : 1,
            transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)",
            transform: state === "listening" ? "scale(1.08)" : state === "processing" ? "scale(0.94)" : "scale(1)",
            padding: 0, outline: "none",
          }}
        >
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: gradients[state] || gradients.idle,
            animation: state === "listening" ? "geminiRotate 2s linear infinite"
              : state === "processing" ? "geminiRotate 0.8s linear infinite"
              : state === "speaking" ? "geminiRotate 4s linear infinite"
              : "geminiRotate 8s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: "2px", borderRadius: "50%",
            background: "radial-gradient(circle at 35% 25%, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
          }} />
          <div style={{
            position: "absolute", inset: "6px", borderRadius: "50%",
            background: "rgba(0,0,0,0.18)", backdropFilter: "blur(2px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {state === "idle" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="12" rx="3" fill="white" opacity="0.95"/>
                <path d="M5 10c0 3.866 3.134 7 7 7s7-3.134 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.95"/>
                <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.95"/>
                <line x1="9" y1="21" x2="15" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.95"/>
              </svg>
            )}
            {state === "listening" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ animation: "geminiWavePulse 0.6s ease-in-out infinite alternate" }}>
                <rect x="11" y="8" width="2" height="8" rx="1" fill="white" opacity="0.95"/>
                <rect x="7" y="10" width="2" height="4" rx="1" fill="white" opacity="0.7"/>
                <rect x="15" y="10" width="2" height="4" rx="1" fill="white" opacity="0.7"/>
                <rect x="3" y="11" width="2" height="2" rx="1" fill="white" opacity="0.4"/>
                <rect x="19" y="11" width="2" height="2" rx="1" fill="white" opacity="0.4"/>
              </svg>
            )}
            {state === "processing" && (
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: "5px", height: "5px", borderRadius: "50%", background: "white", opacity: 0.9,
                    animation: `geminiBounce 0.8s ${i * 0.15}s ease-in-out infinite`,
                  }} />
                ))}
              </div>
            )}
            {state === "speaking" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white" opacity="0.95"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
              </svg>
            )}
          </div>
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
          color: state === "idle" ? "#8B87A8" : state === "listening" ? "#F4511E" : state === "processing" ? "#FFCA28" : "#34A853",
          transition: "color 0.3s",
        }}>
          {labels[state]}
        </div>
        <div style={{ fontSize: "10px", color: "#504E6A", marginTop: "2px" }}>{langLabel[lang] || "English"}</div>
      </div>
    </div>
  );
};
