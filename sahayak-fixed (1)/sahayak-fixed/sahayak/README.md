# 🏥 Sahayak v2 - Rural Health App for ASHA Workers

## 🚀 Quick Start (Single HTML File)

### Option 1: Double-click to open (Easiest!)
1. Download `sahayak.html`
2. Double-click it in Finder
3. It opens in your default browser!

### Option 2: Run with npm (Full project)
```bash
cd sahayak-app
npm install
npm start
```

## 📱 How to Test the App

| Step | Screen | Action |
|------|--------|--------|
| 1 | **Login** | Click "Skip — Demo Mode" or enter any phone + OTP `123456` |
| 2 | **Dashboard** | See patient list, tap "+ New Patient Case" |
| 3 | **New Patient** | Fill name, age, village → tap "Start AI Assessment" |
| 4 | **SymptomChat** | Tap the 🎤 mic orb or type responses to AI |
| 5 | **TriageResult** | View severity → tap action button |
| 6 | **Teleconsult** | Pick a doctor, wait 2s to "connect" |
| 7 | **Prescription** | View generated Rx |

## 🌐 Languages Supported
- English
- Hindi (हिन्दी)
- Kannada (ಕನ್ನಡ)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Marathi (मराठी)

## ⚠️ Important for Hackathon

1. **Claude API Key**: The AI chat calls `api.anthropic.com` — you'll need an API key. For demo, the app works without it (shows error message).

2. **Voice Recognition**: Uses browser's built-in SpeechRecognition — works best in Chrome.

3. **Internet Required**: The single HTML file loads React from CDN, so you need internet to open it.

## 📁 File Structure

```
sahayak-app/
├── src/
│   ├── App.js              ← Main app with routing
│   ├── components/         ← Reusable UI pieces
│   │   ├── Pill.js
│   │   ├── Btn.js
│   │   ├── TopBar.js
│   │   ├── OfflineBanner.js
│   │   └── GeminiOrb.js    ← Animated voice mic
│   ├── screens/            ← App screens
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── NewPatient.js
│   │   ├── SymptomChat.js  ← Voice AI (biggest!)
│   │   ├── TriageResult.js
│   │   ├── EmergencyDispatch.js
│   │   ├── Teleconsult.js
│   │   ├── Prescription.js
│   │   ├── PatientProfile.js
│   │   ├── SpecialistRouting.js
│   │   └── PharmacyMap.js
│   ├── hooks/
│   │   └── useTTS.js       ← Text-to-speech
│   ├── utils/
│   │   ├── theme.js
│   │   ├── translations.js  ← 6 languages
│   │   ├── mockData.js
│   │   └── helpers.js
│   └── styles/
│       └── animations.css
├── public/
│   └── index.html
└── package.json
```

## 🎨 Features
- ✅ Dark/Light theme toggle
- ✅ 6-language i18n
- ✅ Voice-first AI symptom assessment
- ✅ Triage with severity levels (Green/Amber/Red)
- ✅ Teleconsult with doctor list
- ✅ Emergency ambulance dispatch
- ✅ Prescription generation
- ✅ Patient history tracking
- ✅ Offline banner indicator

Good luck with your hackathon! 🚀
