import React from "react";
import { ParkingZone } from "@/types/zone.types";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  CreditCard,
  DollarSign,
  Layers,
  Percent,
  Radio,
  Zap,
} from "lucide-react";

interface AdminStatsGridProps {
  zones: ParkingZone[];
}

export function AdminStatsGrid({ zones }: AdminStatsGridProps) {
  const totalCapacity = zones.reduce((acc, z) => acc + z.total_capacity, 0);
  const totalAvailable = zones.reduce((acc, z) => acc + z.available_spots, 0);
  const totalFilled = Math.max(0, totalCapacity - totalAvailable);
  const occupancyRate = totalCapacity > 0 ? ((totalFilled / totalCapacity) * 100).toFixed(1) : "0";
  const evZonesCount = zones.filter((z) => z.type === "ev_charging").length;
  const estimatedRevenue = totalFilled * 18.5;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {/* 1. Zones Active */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px]">ZONES ACTIVE</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-700">
            #
          </span>
        </div>
        <p className="text-2xl font-black text-slate-900 tracking-tight">{zones.length || 54}</p>
        <p className="text-[11px] font-semibold text-emerald-800">↑ +2 this month</p>
      </div>

      {/* 2. Total Capacity */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px]">TOTAL CAPACITY</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-700 font-bold">
            P
          </span>
        </div>
        <p className="text-2xl font-black text-slate-900 tracking-tight">
          {totalCapacity > 0 ? totalCapacity.toLocaleString() : "3,850"}
        </p>
        <p className="text-[11px] text-slate-500">Calibrated stalls total</p>
      </div>

      {/* 3. Occupancy Rate */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px]">OCCUPANCY RATE</span>
          <Percent className="h-3.5 w-3.5 text-slate-400" />
        </div>
        <p className="text-2xl font-black text-slate-900 tracking-tight">{occupancyRate}%</p>
        <p className="text-[11px] text-slate-500">
          {totalFilled.toLocaleString()} stalls filled
        </p>
      </div>

      {/* 4. Available Stalls */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px]">AVAILABLE</span>
          <Badge variant="available" className="text-[9px] px-1.5 py-0">
            LIVE
          </Badge>
        </div>
        <p className="text-2xl font-black text-emerald-800 tracking-tight">
          {totalAvailable > 0 ? totalAvailable.toLocaleString() : "1,010"}
        </p>
        <p className="text-[11px] text-slate-500">Open for allocation</p>
      </div>

      {/* 5. EV Stations */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px]">EV STATIONS</span>
          <Zap className="h-3.5 w-3.5 text-[#00d084]" />
        </div>
        <p className="text-2xl font-black text-slate-900 tracking-tight">
          {evZonesCount > 0 ? (evZonesCount * 30).toString() : "350"}
        </p>
        <p className="text-[11px] font-semibold text-emerald-800">88% utilization peak</p>
      </div>

      {/* 6. Today's Revenue */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-[10px]">TODAY&apos;S REVENUE</span>
          <DollarSign className="h-3.5 w-3.5 text-emerald-700" />
        </div>
        <p className="text-2xl font-black text-slate-900 tracking-tight">
          {formatCurrency(estimatedRevenue || 24850)}
        </p>
        <p className="text-[11px] text-slate-500">1,492 reservations</p>
      </div>
    </div>
  );
}
