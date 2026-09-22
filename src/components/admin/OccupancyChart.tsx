"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const HOURLY_OCCUPANCY_DATA = [
  { hour: "00:00", general: 1100, ev: 200 },
  { hour: "04:00", general: 850, ev: 180 },
  { hour: "08:00", general: 2400, ev: 550 },
  { hour: "12:00", general: 3120, ev: 850 },
  { hour: "16:00", general: 2800, ev: 720 },
  { hour: "20:00", general: 1900, ev: 490 },
  { hour: "23:59", general: 1300, ev: 310 },
];

export function OccupancyChart() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-slate-900">
              Parking Occupancy & EV Peak Demand
            </h3>
            <Badge variant="outline" className="text-[10px] bg-slate-50">
              24h Realtime
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Continuous telemetry collected across terminal loop gates and DC fast charging towers.
          </p>
        </div>

        <div className="flex items-center space-x-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="h-2.5 w-2.5 rounded-sm bg-slate-900"></span> General Stalls
          </span>
          <span className="flex items-center gap-1.5 text-emerald-800">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#00d084]"></span> EV Fast Charge
          </span>
        </div>
      </div>

      <div className="h-60 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={HOURLY_OCCUPANCY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="evGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d084" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00d084" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="genGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#091e17" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#091e17" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
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
              dataKey="general"
              stroke="#091e17"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#genGradient)"
            />
            <Area
              type="monotone"
              dataKey="ev"
              stroke="#00d084"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#evGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
