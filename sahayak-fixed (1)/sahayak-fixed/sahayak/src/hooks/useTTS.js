import { useRef, useCallback } from "react";
import { langVoice } from "../utils/translations";

// ── TTS Hook — robust cross-browser ──────────────────────────
export const useTTS = (lang) => {
  const synthRef = useRef(null);
  const langCode = langVoice[lang] || "en-IN";

  const speak = useCallback((text, onEnd) => {
    if (!("speechSynthesis" in window)) { onEnd && onEnd(); return; }
    window.speechSynthesis.cancel();
    if (!text) { onEnd && onEnd(); return; }

    const clean = text.includes("ASSESSMENT:") ? "Assessment complete. Please review the results." : text;
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = langCode;
    utter.rate = 0.88;
    utter.pitch = 1.0;

    utter.onend = () => { onEnd && onEnd(); };
    utter.onerror = (e) => { if (e.error !== "interrupted") console.warn("TTS:", e.error); onEnd && onEnd(); };

    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const langPrefix = langCode.split("-")[0];
      const match = voices.find(v => v.lang === langCode)
        || voices.find(v => v.lang.startsWith(langPrefix))
        || voices.find(v => v.lang.includes("IN"))
        || null;
      if (match) utter.voice = match;
      window.speechSynthesis.speak(utter);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) { doSpeak(); }
    else { window.speechSynthesis.onvoiceschanged = doSpeak; }

    synthRef.current = utter;
  }, [langCode]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
  }, []);

  return { speak, stop };
};
