import React, { useState, useRef, useEffect, useCallback } from "react";
import { TopBar } from "../components/TopBar";
import { GeminiOrb } from "../components/GeminiOrb";
import { Btn } from "../components/Btn";
import { T, langVoice } from "../utils/translations";
import { buildSystemPrompt } from "../utils/helpers";
import { useTTS } from "../hooks/useTTS";
import { getMockResponse } from "../utils/mockAI";

export const SymptomChat = ({ patient, onComplete, onBack, t, lang }) => {
  const tx = (key) => T[lang]?.[key] || T.en[key] || key;
  const SYSTEM_PROMPT = buildSystemPrompt(lang, patient.name, patient.age, patient.village);

  const openingByLang = {
    en: `Hello! I'm here to help assess ${patient.name}. What is their main complaint today?`,
    hi: `नमस्ते! मैं ${patient.name} की जांच में मदद करूंगा। आज उनकी मुख्य समस्या क्या है?`,
    kn: `ನಮಸ್ಕಾರ! ನಾನು ${patient.name} ರ ತಪಾಸಣೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಇಂದು ಅವರ ಮುಖ್ಯ ಸಮಸ್ಯೆ ಏನು?`,
    ta: `வணக்கம்! ${patient.name} ஐ மதிப்பிட உதவுகிறேன். இன்று அவர்களின் முக்கிய பிரச்சனை என்ன?`,
    te: `నమస్కారం! ${patient.name} కోసం అసెస్‌మెంట్ చేయడంలో సహాయం చేస్తాను. నేడు వారి ప్రధాన సమస్య ఏమిటి?`,
    mr: `नमस्कार! मी ${patient.name} यांच्या तपासणीत मदत करेन. आज त्यांची मुख्य तक्रार काय आहे?`,
  };

  const [messages, setMessages] = useState([
    { role: "assistant", content: openingByLang[lang] || openingByLang.en }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [voiceState, setVoiceState] = useState("idle");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [micBlocked, setMicBlocked] = useState(false);
  const [shouldSend, setShouldSend] = useState(false);

  const bottomRef = useRef();
  const recognitionRef = useRef(null);   // single persistent SR instance
  const finalTranscriptRef = useRef("");
  const isRecognizingRef = useRef(false);
  const pendingTranscriptRef = useRef("");

  const { speak, stop: stopTTS } = useTTS(lang);

  // ── Request mic permission ONCE on mount via getUserMedia ──────────────────
  // This fires the browser "Allow microphone" popup exactly once.
  // After the user clicks Allow, we immediately release the raw stream and
  // build a single SpeechRecognition instance that is reused forever —
  // no further permission prompts will appear for the lifetime of this screen.
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setVoiceSupported(false); return; }

    navigator.mediaDevices?.getUserMedia({ audio: true })
      .then((stream) => {
        // Release the raw audio tracks immediately — SpeechRecognition will
        // handle its own internal audio capture; we only needed getUserMedia
        // to trigger (and cache) the one-time browser permission prompt.
        stream.getTracks().forEach(track => track.stop());

        // Build the ONE persistent recognition instance for this session
        const rec = new SR();
        rec.continuous = false;
        rec.interimResults = true;
        rec.lang = langVoice[lang] || "en-IN";
        rec.maxAlternatives = 1;

        rec.onstart = () => {
          isRecognizingRef.current = true;
          setVoiceState("listening");
        };

        rec.onresult = (e) => {
          let interimText = "", finalText = "";
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const transcript = e.results[i][0].transcript;
            if (e.results[i].isFinal) finalText += transcript;
            else interimText += transcript;
          }
          setLiveTranscript(finalText || interimText);
          if (finalText) finalTranscriptRef.current = finalText;
        };

        rec.onerror = (e) => {
          isRecognizingRef.current = false;
          if (e.error === "not-allowed" || e.error === "permission-denied") {
            setMicBlocked(true);
          }
          if (e.error !== "aborted" && e.error !== "no-speech") {
            console.warn("SR error:", e.error);
          }
          setVoiceState("idle");
          setLiveTranscript("");
        };

        rec.onend = () => {
          isRecognizingRef.current = false;
          const captured = finalTranscriptRef.current.trim();
          finalTranscriptRef.current = "";
          if (captured) {
            // Signal via state so the effect below can call the fresh sendMessage
            pendingTranscriptRef.current = captured;
            setShouldSend(true);
          } else {
            setVoiceState("idle");
            setLiveTranscript("");
          }
        };

        recognitionRef.current = rec;
      })
      .catch(() => {
        // User denied the popup, or no mic hardware found
        setMicBlocked(true);
      });

    return () => {
      // Cleanup: abort recognition if still running when component unmounts
      if (recognitionRef.current && isRecognizingRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, liveTranscript]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVoiceState("speaking");
      speak(openingByLang[lang] || openingByLang.en, () => setVoiceState("idle"));
    }, 600);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const parseAssessment = (text) => {
    if (!text.includes("ASSESSMENT:")) return null;
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    const get = (key) => {
      const line = lines.find(l => l.toLowerCase().startsWith(key.toLowerCase() + ":"));
      return line ? line.split(":").slice(1).join(":").trim() : "";
    };
    return {
      severity: get("Severity"),
      condition: get("Likely condition"),
      action: get("Recommended action"),
      doctorBrief: get("Doctor brief"),
      careAdvice: get("Care advice"),
    };
  };

  const sendMessage = useCallback((text) => { // eslint-disable-line
    if (!text?.trim() || loading) return;
    stopTTS();
    isRecognizingRef.current = false;
    finalTranscriptRef.current = "";
    setLiveTranscript("");
    setVoiceState("idle");
    setInput("");

    const userMsg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    const userMsgCount = newMessages.filter(m => m.role === "user").length;

    setTimeout(() => {
      const firstUserMsg = newMessages.find(m => m.role === "user")?.content || "";
      const reply = getMockResponse(lang, userMsgCount - 1, firstUserMsg, newMessages);

      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setLoading(false);

      const parsed = parseAssessment(reply);
      if (parsed?.severity) {
        setAssessment(parsed);
        setVoiceState("speaking");
        speak("Assessment is complete. Please review the results.", () => setVoiceState("idle"));
      } else {
        setVoiceState("speaking");
        speak(reply, () => {
          setVoiceState("idle");
          setTimeout(() => startListening(), 400);
        });
      }
    }, 900);
  }, [messages, loading, SYSTEM_PROMPT, speak, stopTTS]); // eslint-disable-line

  // ── Deferred send after rec.onend fires ───────────────────────────────────
  // rec.onend captures a stale sendMessage, so we signal with state and let
  // this effect call the always-fresh version.
  useEffect(() => {
    if (shouldSend && pendingTranscriptRef.current) {
      const text = pendingTranscriptRef.current;
      pendingTranscriptRef.current = "";
      setShouldSend(false);
      setVoiceState("processing");
      setLiveTranscript("");
      sendMessage(text);
    }
  }, [shouldSend, sendMessage]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return; // mic not set up yet or was blocked
    if (loading || isRecognizingRef.current) return;

    stopTTS();
    finalTranscriptRef.current = "";
    setLiveTranscript("");

    // Update lang in case it changed since the instance was created
    recognitionRef.current.lang = langVoice[lang] || "en-IN";

    try {
      recognitionRef.current.start();
    } catch (e) {
      console.warn("SR start error:", e);
      setVoiceState("idle");
    }
  }, [lang, loading, stopTTS]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isRecognizingRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
  }, []);

  const handleMicTap = useCallback(() => {
    if (loading) return;
    if (voiceState === "speaking") {
      stopTTS();
      setVoiceState("idle");
    } else if (voiceState === "listening") {
      isRecognizingRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
      setVoiceState("idle");
      setLiveTranscript("");
    } else if (voiceState === "idle") {
      startListening();
    }
  }, [voiceState, loading, stopTTS, startListening]);

  const handleTextSend = () => {
    if (input.trim()) sendMessage(input.trim());
  };

  const handleBack = () => {
    stopTTS();
    if (recognitionRef.current && isRecognizingRef.current) {
      try { recognitionRef.current.abort(); } catch {}
    }
    isRecognizingRef.current = false;
    onBack();
  };

  const currentVoiceDisplayState = loading ? "processing" : voiceState;

  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <TopBar title={tx("aiAssessment")} onBack={handleBack} theme={t}
        right={
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <div style={{ background: t.accentBg, borderRadius: "10px", padding: "4px 10px" }}>
              <span style={{ fontSize: "11px", color: t.accentLight, fontWeight: 600 }}>{T[lang]?.appName ? lang.toUpperCase() : "EN"}</span>
            </div>
            <div style={{ background: t.surfaceHigh, borderRadius: "10px", padding: "4px 8px", fontSize: "11px", color: t.textSub, fontWeight: 600 }}>
              {messages.filter(m => m.role === "user").length}/8 Q
            </div>
          </div>
        }
      />

      <div style={{ padding: "0 20px 10px", flexShrink: 0 }}>
        <div style={{ background: t.surfaceHigh, borderRadius: "12px", padding: "8px 12px", display: "flex", alignItems: "center", gap: "10px", border: `1px solid ${t.border}` }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "50%", background: t.accentBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, color: t.accentLight, flexShrink: 0, fontSize: "13px",
          }}>{patient.name[0]}</div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: t.text }}>{patient.name}, {patient.age}</span>
            <span style={{ fontSize: "11px", color: t.textSub }}> · {patient.village}</span>
          </div>
          {voiceState === "speaking" && (
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              {[0.5,1,0.7,0.9,0.6,1,0.4].map((h, i) => (
                <div key={i} style={{
                  width: "2px", height: `${h * 12 + 2}px`, borderRadius: "1px", background: "#34A853",
                  animation: `geminiWavePulse 0.5s ${i * 0.07}s ease-in-out infinite alternate`,
                }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: "6px" }}>
            {m.role === "assistant" && (
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: "conic-gradient(from 0deg, #4285F4, #9C27B0, #F4511E, #34A853, #4285F4)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0, marginBottom: "2px",
              }}>✦</div>
            )}
            <div style={{ maxWidth: "78%" }}>
              <div style={{
                background: m.role === "user" ? t.accent : t.surfaceHigh,
                color: t.text,
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                padding: "10px 13px", fontSize: "13px", lineHeight: "1.6",
                border: m.role === "assistant" ? `1px solid ${t.border}` : "none",
                whiteSpace: "pre-wrap",
              }}>
                {m.content.includes("ASSESSMENT:") ? (
                  <span style={{ color: t.green, fontWeight: 600 }}>✦ Assessment complete — see results below</span>
                ) : m.content}
              </div>
              {m.role === "assistant" && !m.content.includes("ASSESSMENT:") && (
                <button onClick={() => {
                  if (voiceState === "speaking") { stopTTS(); setVoiceState("idle"); }
                  else { setVoiceState("speaking"); speak(m.content, () => setVoiceState("idle")); }
                }}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "3px 4px", fontSize: "10px", color: t.textMuted }}>
                  {voiceState === "speaking" ? "⏹ Stop" : "🔊"}
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "6px" }}>
            <div style={{
              width: "26px", height: "26px", borderRadius: "50%",
              background: "conic-gradient(from 0deg, #4285F4, #9C27B0, #F4511E, #34A853, #4285F4)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px",
            }}>✦</div>
            <div style={{ background: t.surfaceHigh, border: `1px solid ${t.border}`, borderRadius: "16px 16px 16px 4px", padding: "12px 16px", display: "flex", gap: "5px", alignItems: "center" }}>
              {[0,1,2].map(i => <div key={i} style={{
                width: "6px", height: "6px", borderRadius: "50%", background: t.accent,
                animation: `geminiBounceDot 1s ${i*0.2}s infinite`,
              }} />)}
            </div>
          </div>
        )}

        {assessment && !loading && (
          <div style={{ background: t.accentBg, border: `1px solid ${t.accent}`, borderRadius: "16px", padding: "14px", margin: "4px 0" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: t.accentLight, marginBottom: "8px" }}>{tx("assessmentReady")}</div>
            <Btn label={tx("viewResult")} onClick={() => onComplete(assessment, messages)} style={{ borderRadius: "10px", padding: "11px" }} />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {(voiceState === "listening" || (liveTranscript && voiceState !== "idle")) && !assessment && (
        <div style={{ padding: "6px 16px 0", flexShrink: 0 }}>
          <div style={{
            background: voiceState === "listening" ? "rgba(244,81,30,0.1)" : t.accentBg,
            border: `1px solid ${voiceState === "listening" ? "#F4511E" : t.accent}`,
            borderRadius: "12px", padding: "8px 12px", minHeight: "36px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{ fontSize: "10px" }}>🎙️</span>
            <span style={{
              fontSize: "12px", color: voiceState === "listening" ? "#F4511E" : t.accentLight,
              flex: 1, fontStyle: liveTranscript ? "normal" : "italic",
            }}>
              {liveTranscript || (tx("speakNow") + "...")}
            </span>
            {liveTranscript && (
              <button onClick={() => { stopListening(); sendMessage(liveTranscript); }}
                style={{
                  background: t.accent, border: "none", borderRadius: "8px",
                  padding: "4px 10px", fontSize: "11px", fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0,
                }}>
                Send ↑
              </button>
            )}
          </div>
        </div>
      )}

      {micBlocked && (
        <div style={{ padding: "4px 16px 0", flexShrink: 0 }}>
          <div style={{
            background: t.amberBg, border: `1px solid ${t.amber}`, borderRadius: "10px",
            padding: "7px 12px", fontSize: "11px", color: t.amber,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span>🎤 {tx("micDenied")}</span>
            <button onClick={() => setMicBlocked(false)} style={{ background: "none", border: "none", color: t.amber, cursor: "pointer", fontSize: "14px" }}>×</button>
          </div>
        </div>
      )}

      {!assessment && (
        <div style={{ padding: "10px 16px 18px", flexShrink: 0 }}>
          <div style={{
            display: "flex", gap: "8px", background: t.surfaceHigh, borderRadius: "14px",
            padding: "6px 6px 6px 12px", border: `1px solid ${voiceState === "listening" ? "#F4511E" : t.border}`,
            marginBottom: "16px", transition: "border-color 0.2s",
          }}>
            <input
              value={voiceState === "listening" ? liveTranscript : input}
              onChange={e => { if (voiceState !== "listening") setInput(e.target.value); }}
              onKeyDown={e => e.key === "Enter" && voiceState === "idle" && handleTextSend()}
              placeholder={voiceState === "listening" ? (tx("listening") + "... Speak now!") : voiceState === "speaking" ? "AI is speaking..." : tx("typeResponse")}
              readOnly={voiceState === "listening" || voiceState === "speaking"}
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: "13px", color: t.text, padding: "6px 0" }}
            />
            <button
              onClick={handleTextSend}
              disabled={loading || !input.trim() || voiceState !== "idle"}
              style={{
                background: t.accent, border: "none", borderRadius: "10px",
                width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", opacity: (!input.trim() || loading || voiceState !== "idle") ? 0.3 : 1,
                fontSize: "15px", flexShrink: 0,
              }}
            >
              ↑
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {voiceSupported && !micBlocked ? (
              <GeminiOrb
                state={currentVoiceDisplayState}
                onClick={handleMicTap}
                disabled={loading}
                lang={lang}
                tx={tx}
              />
            ) : (
              <div style={{ fontSize: "12px", color: t.textMuted, textAlign: "center", padding: "12px", lineHeight: 1.6 }}>
                🎤 {micBlocked ? tx("micDenied") : "Voice not supported — please type above."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
