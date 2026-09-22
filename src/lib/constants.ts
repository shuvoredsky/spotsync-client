export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const HUBS = [

  { id: "sfo-t1-t2", name: "SFO International Terminal 1 & 2" },
  { id: "central-mall", name: "Central Mall Metro Deck" },
  { id: "north-plaza", name: "North Plaza EV Superhub" },
  { id: "downtown-hub", name: "Downtown Transit Complex" },
];

export const VEHICLE_MODELS = [
  "Tesla Model 3 (CCS / NACS)",
  "Tesla Model Y (CCS / NACS)",
  "Hyundai Ioniq 5 (CCS2)",
  "Rivian R1T / R1S (NACS)",
  "Ford Mustang Mach-E (CCS1)",
  "Porsche Taycan (CCS2)",
  "Standard Gasoline / Hybrid Sedan",
  "Standard SUV / Light Truck",
];

export const ZONE_FEATURE_DEFAULTS: Record<string, string[]> = {
  ev_charging: [
    "150kW DC Ultra-Fast Charge",
    "CCS2 & NACS Tesla Compatible",
    "Dedicated Reserved Floor Bay",
    "Automated ANPR Gate Sync",
  ],
  covered: [
    "Direct Atrium Elevator Access",
    "Weatherproof Climatized Facility",
    "24/7 Monitored CCTV Security",
    "Contactless QR Gate Release",
  ],
  general: [
    "24/7 Security CCTV Monitoring",
    "Automated License Plate Reader",
    "2 min walk to check-in desks",
    "Spacious Over-dimension Stalls",
  ],
};

export const MOCK_ANPR_LOGS = [
  {
    id: "log-1",
    gate: "Gate 2 Entry",
    timeAgo: "1 min ago",
    plate: "7XYZ892",
    bay: "Bay T1-042",
    driverName: "John Doe",
    driverEmail: "j.doe@apexcapital.org",
    status: "Active",
    ocrStatus: "ANPR Verified",
    barrierAction: "Barrier Raised",
  },
  {
    id: "log-2",
    gate: "Gate 4 Exit",
    timeAgo: "14 mins ago",
    plate: "6ABC123",
    bay: "Bay EV-008",
    driverName: "Sarah Lin",
    driverEmail: "s.lin@quantumtech.io",
    status: "Completed",
    ocrStatus: "Charged 44.2 kWh",
    barrierAction: "$24.30 Paid",
  },
  {
    id: "log-3",
    gate: "Stall Overstay (+42m)",
    timeAgo: "Action Req.",
    plate: "8KLM456",
    bay: "Bay VIP-014",
    driverName: "Marcus Vance",
    driverEmail: "m.vance@vanceholdings.com",
    status: "Action Req.",
    ocrStatus: "SMS Notice Sent",
    barrierAction: "Disclose Surcharge",
  },
];
