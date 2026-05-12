// ── Mock Data ────────────────────────────────────────────────
export const patients = [
  { id: 1, name: "Savitri Devi", age: 52, village: "Rampur", severity: "amber", symptom: "Fever, cough", time: "2h ago", history: [
    { date: "2026-04-15", symptom: "Headache", severity: "Mild", action: "Home care" },
    { date: "2026-03-02", symptom: "Fever", severity: "Moderate", action: "Teleconsult" },
  ]},
  { id: 2, name: "Mohan Lal", age: 34, village: "Rampur", severity: "green", symptom: "Back pain", time: "Yesterday", history: [] },
  { id: 3, name: "Kamla Bai", age: 67, village: "Satna", severity: "red", symptom: "Chest pain", time: "3h ago", history: [
    { date: "2026-02-20", symptom: "Chest tightness", severity: "Moderate", action: "Hospital visit" },
  ]},
  { id: 4, name: "Raju Kumar", age: 8, village: "Rampur", severity: "green", symptom: "Diarrhoea", time: "Yesterday", history: [] },
];

export const mockDoctors = [
  { id: 1, name: "Dr. Ananya Sharma", specialty: "General Medicine", status: "online", wait: "~5 min", avatar: "AS" },
  { id: 2, name: "Dr. Ravi Patel", specialty: "Pediatrics", status: "online", wait: "~2 min", avatar: "RP" },
  { id: 3, name: "Dr. Sunita Mehta", specialty: "Cardiology", status: "busy", wait: "~20 min", avatar: "SM" },
  { id: 4, name: "Dr. Vikram Rao", specialty: "Orthopedics", status: "online", wait: "~8 min", avatar: "VR" },
];

export const mockPharmacies = [
  { id: 1, name: "Jan Aushadhi Kendra", dist: "2.3 km", stock: "full", type: "govt" },
  { id: 2, name: "Ram Medical Store", dist: "3.1 km", stock: "partial", type: "private" },
  { id: 3, name: "PHC Dispensary", dist: "4.8 km", stock: "full", type: "govt" },
  { id: 4, name: "Sharma Chemist", dist: "5.2 km", stock: "out", type: "private" },
];

export const mockSpecialistFacilities = [
  { id: 1, name: "District Hospital", specialty: "Cardiology", dist: "45 km", wait: "2h", hasTele: true },
  { id: 2, name: "City Medical College", specialty: "Orthopedics", dist: "62 km", wait: "4h", hasTele: true },
  { id: 3, name: "Women's Health Center", specialty: "Gynecology", dist: "38 km", wait: "1h", hasTele: false },
];
