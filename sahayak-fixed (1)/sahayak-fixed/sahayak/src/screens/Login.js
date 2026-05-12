import React, { useState } from "react";
import { Btn } from "../components/Btn";
import { T } from "../utils/translations";

export const Login = ({ onLogin, onSkip, initialLang }) => {
  const [role, setRole] = useState("asha");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [lang, setLang] = useState(initialLang || "en");
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;

  const languages = [
    { code: "en", label: "English" }, { code: "hi", label: "हिन्दी" },
    { code: "kn", label: "ಕನ್ನಡ" }, { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" }, { code: "mr", label: "मराठी" },
  ];

  const handleSendOTP = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpSent(true); }, 1000);
  };

  const handleVerify = () => {
    if (otp === "123456") {
      try { localStorage.setItem("sahayak_lang", lang); } catch {}
      onLogin({ role, phone, lang });
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 1500);
    }
  };

  const roles = [
    { id: "asha", label: tx("ashaWorker") },
    { id: "doctor", label: tx("doctor") },
    { id: "admin", label: tx("admin") },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0F0E17", overflowY: "auto" }}>
      <div style={{
        background: "linear-gradient(160deg, #1E1B38 0%, #0F0E17 60%)",
        padding: "40px 28px 28px", position: "relative", overflow: "hidden", flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: "180px", height: "180px",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(124,111,224,0.15) 0%, transparent 70%)",
        }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: "linear-gradient(135deg, #7C6FE0, #A99DF5)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
          }}>🏥</div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#EEEAF8" }}>{T[lang]?.appName || "Sahayak"}</div>
            <div style={{ fontSize: "11px", color: "#8B87A8", marginTop: "3px" }}>{T[lang]?.appSubtitle || T.en.appSubtitle}</div>
          </div>
        </div>
        <h2 style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: 700, color: "#EEEAF8" }}>{tx("loginTitle")}</h2>
        <p style={{ margin: 0, fontSize: "13px", color: "#8B87A8" }}>{tx("loginSubtitle")}</p>
      </div>
      <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#8B87A8", marginBottom: "8px", letterSpacing: "0.04em" }}>{tx("selectRole")}</div>
          <div style={{ display: "flex", gap: "8px" }}>
            {roles.map(r => (
              <button key={r.id} onClick={() => setRole(r.id)} style={{
                flex: 1, padding: "10px 6px", borderRadius: "12px",
                border: `1px solid ${role === r.id ? "#7C6FE0" : "#2E2C45"}`,
                background: role === r.id ? "#1E1B38" : "#1A1928",
                color: role === r.id ? "#A99DF5" : "#8B87A8",
                fontSize: "12px", fontWeight: 600, cursor: "pointer",
              }}>{r.label}</button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#8B87A8", marginBottom: "8px" }}>{tx("phoneNumber")}</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{
              background: "#232235", border: "1px solid #2E2C45", borderRadius: "12px",
              padding: "12px 14px", fontSize: "14px", color: "#8B87A8", fontWeight: 600, flexShrink: 0,
            }}>+91</div>
            <input
              type="tel" value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="9876543210"
              style={{
                flex: 1, background: "#232235", border: "1px solid #2E2C45", borderRadius: "12px",
                padding: "12px 14px", fontSize: "14px", color: "#EEEAF8", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        </div>
        {!otpSent ? (
          <Btn label={loading ? "Sending..." : tx("sendOTP")} onClick={handleSendOTP} disabled={phone.length < 10 || loading} />
        ) : (
          <>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#8B87A8", marginBottom: "8px" }}>
                {tx("enterOTP")} <span style={{ color: "#4CAF7D" }}>(Demo: 123456)</span>
              </div>
              <input
                type="tel" value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="• • • • • •"
                style={{
                  width: "100%", background: otpError ? "#220D0D" : "#232235",
                  border: `1px solid ${otpError ? "#F05454" : "#2E2C45"}`,
                  borderRadius: "12px", padding: "14px", fontSize: "20px", color: "#EEEAF8",
                  outline: "none", boxSizing: "border-box", letterSpacing: "8px", textAlign: "center",
                }}
              />
              {otpError && <div style={{ fontSize: "12px", color: "#F05454", marginTop: "6px" }}>Incorrect OTP. Try 123456</div>}
            </div>
            <Btn label={tx("verifyOTP")} onClick={handleVerify} disabled={otp.length < 6} />
          </>
        )}
        <button onClick={onSkip} style={{ background: "none", border: "none", color: "#504E6A", fontSize: "13px", cursor: "pointer", padding: "8px", textAlign: "center" }}>
          {tx("skipDemo")}
        </button>
        <div style={{ marginTop: "auto" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#8B87A8", marginBottom: "8px", textAlign: "center" }}>{tx("language")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
            {languages.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} style={{
                padding: "6px 14px", borderRadius: "20px",
                border: `1px solid ${lang === l.code ? "#7C6FE0" : "#2E2C45"}`,
                background: lang === l.code ? "#1E1B38" : "transparent",
                color: lang === l.code ? "#A99DF5" : "#504E6A",
                fontSize: "12px", fontWeight: 600, cursor: "pointer",
              }}>{l.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
