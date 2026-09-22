"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, LineChart, ShieldCheck, Zap } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CHARGE_CURVE_DATA = [
  { time: "0m", kw: 20 },
  { time: "4m", kw: 65 },
  { time: "8m", kw: 110 },
  { time: "12m", kw: 142 },
  { time: "16m", kw: 148 },
  { time: "20m", kw: 135 },
  { time: "24m", kw: 95 },
  { time: "28m", kw: 45 },
];

export function EVTelemetrySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Descriptions & Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              HIGH VOLTAGE TELEMETRY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered For Frictionless EV Charging
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Leave low-battery anxiety behind. Book guaranteed access to ultra-fast 150kW DC
              chargers and track your delivery metrics directly from any mobile device.
            </p>
          </div>

          {/* 3 Highlights */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f7f2] text-[#0d5440]">
                <Zap className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900">
                  150kW DC & Level 2 Stations
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  From 20% to 80% state of charge in 22 minutes while you grab a coffee or check in for your flight.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <LineChart className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900">
                  Live Telemetry & Session Stats
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Instant push notifications when your vehicle completes charging. Real-time graphs for kW draw and kWh consumed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900">
                  Automated Unified Billing
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Consolidated receipt pairing stall dwell time with power grid delivery. Seamless export for corporate expense sheets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Session Card with Recharts graph */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-900">Active Charging Session</span>
            </div>
            <Badge variant="ev" className="font-bold">
              Bay B-102 Online
            </Badge>
          </div>

          {/* 3 Metric Tiles */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/90 p-3 space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Power Delivery</p>
              <p className="text-xl font-extrabold text-slate-900">142 kW</p>
              <p className="text-[10px] text-slate-500">Peak 150 kW</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/90 p-3 space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Energy Injected</p>
              <p className="text-xl font-extrabold text-[#0d5440]">42.8 kWh</p>
              <p className="text-[10px] text-slate-500">Est. range +148 mi</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/90 p-3 space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Time Remaining</p>
              <p className="text-xl font-extrabold text-slate-900">12 Min</p>
              <p className="text-[10px] text-slate-500">Target 85% limit</p>
            </div>
          </div>

          {/* Spline Area Chart */}
          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <span>VOLTAGE FLUID DISPATCH (480V 3-PHASE)</span>
              <span>0 - 150 kW</span>
            </div>

            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHARGE_CURVE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chargeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d084" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00d084" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#091e17",
                      borderRadius: "0.5rem",
                      color: "#ffffff",
                      fontSize: "12px",
                      border: "none",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="kw"
                    stroke="#0d5440"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#chargeGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Session Details Footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-[#00d084]" />
              <span>CCS Combo 2 Interface connected • Solid lock</span>
            </div>
            <Button variant="subtle" size="sm" className="text-xs h-8">
              Manage Target Limit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
