"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ShieldCheck, Warehouse } from "lucide-react";
import { toast } from "sonner";

const DISTRIBUTION_DATA = [
  { name: "General Stalls", value: 2310, percent: "60%", color: "#091e17" },
  { name: "EV Rapid Chargers", value: 962, percent: "25%", color: "#00d084" },
  { name: "Covered VIP Valet", value: 578, percent: "15%", color: "#94a3b8" },
];

export function ZoneDistributionChart() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-slate-900">Zone Distribution</h3>
        <p className="text-xs text-slate-500">Stall categorization across airport terminals</p>
      </div>

      {/* Donut Visualization */}
      <div className="relative flex items-center justify-center h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#091e17",
                borderRadius: "0.5rem",
                color: "#ffffff",
                fontSize: "12px",
                border: "none",
              }}
            />
            <Pie
              data={DISTRIBUTION_DATA}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {DISTRIBUTION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            INVENTORY
          </span>
          <span className="text-base font-black text-slate-900 leading-tight">3,850</span>
          <span className="text-[9px] font-bold text-emerald-800">100% Monitored</span>
        </div>
      </div>

      {/* Breakdown Legend */}
      <div className="space-y-2 text-xs">
        {DISTRIBUTION_DATA.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-700">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </span>
            <span className="font-bold text-slate-900">
              {item.percent} <span className="text-slate-400 font-normal">({item.value.toLocaleString()})</span>
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Automated Gates Box */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <Warehouse className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold text-xs text-slate-900">Automated Gates</p>
            <p className="text-[11px] text-blue-700 font-medium">12 of 12 Online</p>
          </div>
        </div>

        <Button
          variant="subtle"
          size="sm"
          onClick={() => toast.info("Barrier audit log verified: All gates operational")}
          className="text-xs font-semibold h-8 bg-white"
        >
          Audit Barrier Logs
        </Button>
      </div>
    </div>
  );
}
