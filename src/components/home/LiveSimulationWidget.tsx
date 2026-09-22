"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, QrCode, ShieldCheck, Sparkles, Wifi, Zap } from "lucide-react";

export function LiveSimulationWidget() {
  const [telemetryPercent, setTelemetryPercent] = useState(88);
  const [stallsOpen, setStallsOpen] = useState(142);

  // Live simulation jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryPercent((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.min(96, Math.max(82, prev + delta));
      });
      setStallsOpen((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(160, Math.max(130, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Interactive Grid Card */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  TERMINAL 1 LEVEL 3 DECK
                </span>
                <Badge variant="active" className="text-[10px]">
                  Zone T1-B Active
                </Badge>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Stall Occupancy & Induction Grid
              </h3>
            </div>

            {/* Status Legend */}
            <div className="flex items-center space-x-3 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Open
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="h-2 w-2 rounded-full bg-teal-500"></span> Charging
              </span>
              <span className="flex items-center gap-1 font-medium">
                <span className="h-2 w-2 rounded-full bg-rose-500"></span> Occupied
              </span>
            </div>
          </div>

          {/* Bay Grid */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50/90 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B101</span>
                <span className="text-[9px] font-bold text-emerald-700 uppercase">● Free</span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-teal-300 bg-teal-50/90 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B102</span>
                <span className="text-[9px] font-bold text-teal-700 flex items-center gap-0.5">
                  <Zap className="h-2.5 w-2.5" /> 150 kW
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50/80 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B103</span>
                <span className="text-[9px] font-bold text-rose-600 uppercase">● OCC</span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50/90 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B104</span>
                <span className="text-[9px] font-bold text-emerald-700 uppercase">● Free</span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-teal-300 bg-teal-50/90 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B105</span>
                <span className="text-[9px] font-bold text-teal-700 flex items-center gap-0.5">
                  <Zap className="h-2.5 w-2.5" /> 50 kW
                </span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50/80 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B106</span>
                <span className="text-[9px] font-bold text-rose-600 uppercase">● OCC</span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50/90 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B107</span>
                <span className="text-[9px] font-bold text-emerald-700 uppercase">● Free</span>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50/90 p-2 text-center">
                <span className="text-[11px] font-bold text-slate-800">B108</span>
                <span className="text-[9px] font-bold text-emerald-700 uppercase">● Free</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider px-1 pt-1 border-t border-slate-200">
              <span>« LANES 3-A FLUID TRANSIT</span>
              <span>SPEED LIMIT 10 MPH »</span>
            </div>
          </div>

          {/* Sub-KPI Row */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Active Stall Rate</p>
              <p className="text-base font-extrabold text-slate-900">$4.50<span className="text-xs font-normal">/hr</span></p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Avg. EV Delivery</p>
              <p className="text-base font-extrabold text-emerald-800">138.4 kW</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Turnstile Clearance</p>
              <p className="text-base font-extrabold text-slate-900">Sub-second</p>
            </div>
          </div>
        </div>

        {/* Right Express Fast Pass Card */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <QrCode className="h-4 w-4 text-[#0d5440]" /> EXPRESS FAST PASS
              </span>
              <Badge variant="available" className="text-[10px]">
                Synced
              </Badge>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Automatic optical license plate scan at Terminal 1 Gate entry. Zero ticketing required.
            </p>

            {/* Vehicle Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  SYNCHRONIZED VEHICLE
                </span>
                <p className="text-sm font-mono font-extrabold text-slate-900 tracking-wider">
                  7XYZ-892 <span className="text-xs text-slate-500 font-normal">(CAL)</span>
                </p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            </div>

            {/* Terminal Telemetry Dial */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">TERMINAL 1 TELEMETRY</span>
                <span className="font-bold text-slate-500">{stallsOpen} Stalls Open</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {telemetryPercent}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-[#00d084] rounded-full transition-all duration-700"
                  style={{ width: `${telemetryPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-emerald-700" /> Level 3 DC High Speed
              </span>
              <span className="font-bold text-slate-900">18 / 24 Free</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-slate-400" /> Weather-Shield Covered
              </span>
              <span className="font-bold text-slate-900">84 / 100 Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Metric Stats Banner */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            INFRASTRUCTURE
          </p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">50+</p>
          <p className="text-xs text-slate-500">Dedicated Parking Zones</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            CURRENT CAPACITY
          </p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">1,200+</p>
          <p className="text-xs text-slate-500">Available Parking Spots</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            ELECTRIFICATION
          </p>
          <p className="text-3xl font-black text-emerald-800 tracking-tight">350+</p>
          <p className="text-xs text-slate-500">Fast EV Charging Spots</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            SYSTEM UPTIME
          </p>
          <p className="text-3xl font-black text-slate-900 tracking-tight">24/7</p>
          <p className="text-xs text-slate-500">Real-Time Availability</p>
        </div>
      </div>
    </section>
  );
}
