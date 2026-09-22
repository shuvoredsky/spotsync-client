import React from "react";
import { cn } from "@/lib/utils";

interface OccupancyBarProps {
  availableSpots: number;
  totalCapacity: number;
  label?: string;
  className?: string;
}

export function OccupancyBar({
  availableSpots,
  totalCapacity,
  label = "Occupancy",
  className,
}: OccupancyBarProps) {
  const occupiedSpots = Math.max(0, totalCapacity - availableSpots);
  const occupiedPercentage = Math.min(
    100,
    Math.round((occupiedSpots / (totalCapacity || 1)) * 100)
  );

  let barColor = "bg-[#00d084]";
  if (availableSpots <= 0) {
    barColor = "bg-rose-500";
  } else if (occupiedPercentage > 75) {
    barColor = "bg-amber-500";
  }

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
          {label}
        </span>
        <span className="font-bold text-slate-800">
          {availableSpots <= 0 ? (
            <span className="text-rose-600 font-extrabold">0 spots left</span>
          ) : (
            <span className="text-emerald-700">
              {availableSpots} {availableSpots === 1 ? "spot" : "spots"} free
            </span>
          )}{" "}
          <span className="text-slate-400 font-normal">/ {totalCapacity} total</span>
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${occupiedPercentage}%` }}
        />
      </div>
    </div>
  );
}
