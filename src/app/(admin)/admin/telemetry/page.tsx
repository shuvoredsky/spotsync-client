"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CheckCircle2,
  Cpu,
  Radio,
  RefreshCw,
  ShieldCheck,
  Warehouse,
  Wifi,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminTelemetryPage() {
  const chargers = [
    { id: "EV-01", type: "150kW DC CCS2", status: "Dispensing 142 kW", car: "Tesla Model 3", uptime: "99.9%" },
    { id: "EV-02", type: "150kW DC NACS", status: "Idle • Ready", car: "-", uptime: "100%" },
    { id: "EV-03", type: "300kW Hypercharge", status: "Dispensing 245 kW", car: "Porsche Taycan", uptime: "99.8%" },
    { id: "EV-04", type: "50kW Fast DC", status: "Dispensing 48 kW", car: "Hyundai Ioniq 5", uptime: "100%" },
  ];

  const gates = [
    { id: "GATE-01 (Terminal 1 Main)", anpr: "Optical OCR Active", status: "Online", barrier: "Closed (Normal)" },
    { id: "GATE-02 (Skybridge Fast)", anpr: "Optical OCR Active", status: "Online", barrier: "Closed (Normal)" },
    { id: "GATE-03 (Valet Deck VIP)", anpr: "Optical OCR Active", status: "Online", barrier: "Closed (Normal)" },
    { id: "GATE-04 (Exit Barrier East)", anpr: "Optical OCR Active", status: "Online", barrier: "Open (Auto Release)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            EV Telemetry & Stall Sensors
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time OCPP 2.0.1 charge station health, inductive loops, and optical barrier gate telemetry.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success("Telemetry telemetry stream refreshed!")}
          className="text-xs font-semibold gap-1.5 border-slate-300"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Ping All Sensors</span>
        </Button>
      </div>

      {/* Chargers Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Zap className="h-4 w-4 text-[#00d084]" />
          <span>High-Voltage EV Charger Nodes (OCPP 2.0.1)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {chargers.map((c) => (
            <Card key={c.id} className="border-slate-200 bg-white p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-sm text-slate-900">{c.id}</span>
                <Badge variant={c.status.includes("Dispensing") ? "ev" : "available"} className="text-[10px]">
                  {c.status.includes("Dispensing") ? "Active Flow" : "Available"}
                </Badge>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-slate-500 font-medium">{c.type}</p>
                <p className="font-bold text-slate-800">{c.status}</p>
                <p className="text-slate-400 text-[11px]">Vehicle: {c.car}</p>
              </div>

              <div className="border-t border-slate-100 pt-2 flex justify-between text-[11px] text-slate-500 font-semibold">
                <span>Uptime: {c.uptime}</span>
                <span className="text-emerald-800">● Synced</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Gates Controllers Grid */}
      <div className="space-y-3 pt-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Warehouse className="h-4 w-4 text-[#0d5440]" />
          <span>Automated ANPR Barrier Gate Controllers</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gates.map((g) => (
            <Card key={g.id} className="border-slate-200 bg-white p-4 flex items-center justify-between shadow-sm">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-sm text-slate-900">{g.id}</p>
                <p className="text-slate-500">{g.anpr}</p>
                <p className="text-[11px] text-emerald-800 font-medium">State: {g.barrier}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="available" className="text-xs">
                  {g.status}
                </Badge>
                <Button
                  variant="subtle"
                  size="sm"
                  onClick={() => toast.success(`Diagnostic cycle triggered for ${g.id}`)}
                  className="text-xs h-8"
                >
                  Test Cycle
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
