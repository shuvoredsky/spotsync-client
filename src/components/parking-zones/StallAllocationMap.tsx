"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Car, ChevronRight, UserCheck, Zap } from "lucide-react";

interface StallAllocationMapProps {
  totalCapacity: number;
  availableSpots: number;
  selectedBay: string;
  onSelectBay: (bay: string) => void;
  isEV: boolean;
}

export function StallAllocationMap({
  totalCapacity,
  availableSpots,
  selectedBay,
  onSelectBay,
  isEV,
}: StallAllocationMapProps) {
  // Generate visual stall layout based on capacity (e.g. 20 stalls)
  const stalls = Array.from({ length: Math.min(20, Math.max(10, totalCapacity)) }, (_, i) => {
    const num = (i + 1).toString().padStart(2, "0");
    const id = `E-${num}`;
    // Simulate some occupied stalls according to total vs available ratio
    const isOccupied = i % 3 === 1 || i % 4 === 2;
    const powerKw = [82, 114, 96, 45, 140, 50, 75, 120, 90, 105, 60, 130][i % 12];

    return {
      id,
      isOccupied,
      powerKw,
      isFree: !isOccupied,
    };
  });

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-lg font-bold text-slate-900 tracking-tight">
            Interactive Stall Allocation Map
          </h4>
          <p className="text-xs text-slate-500">
            Click any available slot to assign your vehicle and gate pass
          </p>
        </div>

        <Badge variant="outline" className="text-xs font-semibold gap-1 bg-slate-50">
          <span>Level 2 - Concourse Access</span>
          <ChevronRight className="h-3 w-3" />
        </Badge>
      </div>

      {/* Grid Canvas */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-6 space-y-4">
        {/* Terminal Gate Labels */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          <span className="flex items-center gap-1 text-slate-600">
            <ArrowDown className="h-3.5 w-3.5" /> Entry Lane (Gate 2B)
          </span>
          <span className="text-slate-400">ROW E TELEMETRY GRID</span>
          <span className="text-slate-600">Direct Skybridge Concourse 🚶</span>
        </div>

        {/* Top Row Stalls (E-01 to E-10) */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {stalls.slice(0, 10).map((stall) => {
            const isSelected = selectedBay === stall.id;

            if (isSelected) {
              return (
                <button
                  key={stall.id}
                  type="button"
                  onClick={() => onSelectBay(stall.id)}
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-[#00d084] bg-[#091e17] p-2 text-white shadow-lg shadow-[#00d084]/20 transition-all scale-105"
                >
                  <span className="text-[10px] font-bold text-[#00d084]">{stall.id}</span>
                  <Car className="h-4 w-4 my-1 text-white animate-bounce" />
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#00d084]">
                    Selected
                  </span>
                </button>
              );
            }

            if (stall.isOccupied) {
              return (
                <div
                  key={stall.id}
                  className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white/60 p-2 text-slate-400 opacity-70 cursor-not-allowed"
                >
                  <span className="text-[10px] font-medium">{stall.id}</span>
                  <Zap className="h-3.5 w-3.5 text-amber-500 my-1" />
                  <span className="text-[9px] font-semibold text-slate-500">
                    {stall.powerKw}kW
                  </span>
                </div>
              );
            }

            return (
              <button
                key={stall.id}
                type="button"
                onClick={() => onSelectBay(stall.id)}
                className="flex flex-col items-center justify-between rounded-xl border border-emerald-200 bg-white p-2 text-emerald-800 shadow-sm hover:border-[#0d5440] hover:bg-[#e6f7f2] hover:scale-105 transition-all"
              >
                <span className="text-[10px] font-bold text-slate-800">{stall.id}</span>
                <Zap className="h-4 w-4 text-emerald-600 my-1" />
                <span className="text-[9px] font-bold text-emerald-800 uppercase">
                  Free
                </span>
              </button>
            );
          })}
        </div>

        {/* Lane Divider */}
        <div className="flex items-center justify-center border-y border-dashed border-slate-300 py-1.5">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            BI-DIRECTIONAL FAST LANE E • SPEED LIMIT 10 MPH
          </span>
        </div>

        {/* Bottom Row Stalls (E-11 to E-20) */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {stalls.slice(10, 20).map((stall) => {
            const isSelected = selectedBay === stall.id;

            if (isSelected) {
              return (
                <button
                  key={stall.id}
                  type="button"
                  onClick={() => onSelectBay(stall.id)}
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-[#00d084] bg-[#091e17] p-2 text-white shadow-lg shadow-[#00d084]/20 transition-all scale-105"
                >
                  <span className="text-[10px] font-bold text-[#00d084]">{stall.id}</span>
                  <Car className="h-4 w-4 my-1 text-white animate-bounce" />
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#00d084]">
                    Selected
                  </span>
                </button>
              );
            }

            if (stall.isOccupied) {
              return (
                <div
                  key={stall.id}
                  className="flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white/60 p-2 text-slate-400 opacity-70 cursor-not-allowed"
                >
                  <span className="text-[10px] font-medium">{stall.id}</span>
                  <Zap className="h-3.5 w-3.5 text-amber-500 my-1" />
                  <span className="text-[9px] font-semibold text-slate-500">
                    {stall.powerKw}kW
                  </span>
                </div>
              );
            }

            return (
              <button
                key={stall.id}
                type="button"
                onClick={() => onSelectBay(stall.id)}
                className="flex flex-col items-center justify-between rounded-xl border border-emerald-200 bg-white p-2 text-emerald-800 shadow-sm hover:border-[#0d5440] hover:bg-[#e6f7f2] hover:scale-105 transition-all"
              >
                <span className="text-[10px] font-bold text-slate-800">{stall.id}</span>
                <Zap className="h-4 w-4 text-emerald-600 my-1" />
                <span className="text-[9px] font-bold text-emerald-800 uppercase">
                  Free
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-1 pt-1 gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Available
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Dispensing / In-use
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-[#091e17] border border-[#00d084]"></span> Selected ({selectedBay})
          </span>
        </div>

        <span className="text-[11px] font-semibold text-emerald-800">
          ⚡ 150kW DC Ultra-Fast Matrix Active
        </span>
      </div>
    </div>
  );
}
