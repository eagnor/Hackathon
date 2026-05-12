import React, { useState } from "react";
import { makeTheme } from "./utils/theme";
import { T } from "./utils/translations";
import { TopBar } from "./components/TopBar";
import { Btn } from "./components/Btn";
import { Login } from "./screens/Login";
import { Dashboard } from "./screens/Dashboard";
import { NewPatient } from "./screens/NewPatient";
import { SymptomChat } from "./screens/SymptomChat";
import { TriageResult } from "./screens/TriageResult";
import { EmergencyDispatch } from "./screens/EmergencyDispatch";
import { Teleconsult } from "./screens/Teleconsult";
import { Prescription } from "./screens/Prescription";
import { PatientProfile } from "./screens/PatientProfile";
import { SpecialistRouting } from "./screens/SpecialistRouting";
import { PharmacyMap } from "./screens/PharmacyMap";
import "./styles/animations.css";

const App = () => {
  const [theme, setTheme] = useState(makeTheme(true));
  const [lang, setLang] = useState("en");
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [assessment, setAssessment] = useState(null);

  const t = theme;
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;

  const handleLogin = (data) => {
    setUser(data);
    setLang(data.lang || "en");
    setScreen("dashboard");
  };

  const handleNewCase = () => setScreen("newPatient");

  const handlePatientSelect = (p) => {
    setCurrentPatient(p);
    setScreen("patientProfile");
  };

  const startAssessmentFlow = (patient) => {
    setCurrentPatient(patient);
    setAssessment(null);
    setScreen("symptomChat");
  };

  const completeAssessment = (assess, history) => {
    setAssessment(assess);
    setScreen("triageResult");
  };

  return (
    <div style={{
      height: "100dvh",
      background: t.bg,
      color: t.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      maxWidth: "480px",
      margin: "0 auto",
      boxShadow: "0 0 30px rgba(0,0,0,0.3)",
    }}>
      {screen === "login" && (
        <Login onLogin={handleLogin} onSkip={() => { setUser({ role: "asha" }); setScreen("dashboard"); }} initialLang={lang} />
      )}

      {screen === "dashboard" && (
        <Dashboard onNewCase={handleNewCase} onPatient={handlePatientSelect} onSettings={() => setScreen("settings")} t={t} lang={lang} />
      )}

      {screen === "newPatient" && (
        <NewPatient onStart={startAssessmentFlow} onBack={() => setScreen("dashboard")} t={t} lang={lang} />
      )}

      {screen === "symptomChat" && currentPatient && (
        <SymptomChat patient={currentPatient} onComplete={completeAssessment} onBack={() => setScreen("newPatient")} t={t} lang={lang} />
      )}

      {screen === "triageResult" && currentPatient && assessment && (
        <TriageResult
          patient={currentPatient}
          assessment={assessment}
          onBook={() => setScreen("teleconsult")}
          onBack={() => setScreen("symptomChat")}
          onSpecialist={() => setScreen("specialist")}
          onEmergency={() => setScreen("emergency")}
          t={t}
          lang={lang}
        />
      )}

      {screen === "emergency" && currentPatient && (
        <EmergencyDispatch patient={currentPatient} assessment={assessment} onBack={() => setScreen("triageResult")} t={t} lang={lang} />
      )}

      {screen === "teleconsult" && (
        <Teleconsult patient={currentPatient} assessment={assessment} onBack={() => setScreen("triageResult")} onEnd={() => setScreen("prescription")} t={t} lang={lang} />
      )}

      {screen === "prescription" && (
        <Prescription patient={currentPatient} assessment={assessment} onBack={() => setScreen("triageResult")} t={t} lang={lang} />
      )}

      {screen === "patientProfile" && currentPatient && (
        <PatientProfile patient={currentPatient} onBack={() => setScreen("dashboard")} t={t} lang={lang} onStartAssessment={startAssessmentFlow} />
      )}

      {screen === "specialist" && (
        <SpecialistRouting onBack={() => setScreen("triageResult")} t={t} lang={lang} />
      )}

      {screen === "pharmacy" && (
        <PharmacyMap onBack={() => setScreen("triageResult")} t={t} lang={lang} />
      )}

      {screen === "settings" && (
        <div style={{ flex: 1, padding: "20px" }}>
          <TopBar title={tx("settings")} onBack={() => setScreen("dashboard")} theme={t} />
          <div style={{ paddingTop: "40px" }}>
            <Btn label={t.dark ? tx("lightMode") : tx("darkMode")} onClick={() => setTheme(makeTheme(!t.dark))} />
            <Btn label={tx("logout")} variant="danger" onClick={() => { setUser(null); setScreen("login"); }} style={{ marginTop: "16px" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
