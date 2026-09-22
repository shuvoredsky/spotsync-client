"use client";

import React from "react";
import Link from "next/link";
import { useZones } from "@/hooks/useZones";
import { ZoneCard } from "@/components/parking-zones/ZoneCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedZonesSection() {
  const { zones, isLoading } = useZones();

  const featuredZones = zones.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/80">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-700" /> PRIORITY HUBS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Featured Parking Zones
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Real-time spot availability, ultra-fast EV chargers, and covered bays across airport terminals.
          </p>
        </div>

        <Link
          href="/parking-zones"
          className="inline-flex items-center text-sm font-bold text-[#0d5440] hover:text-[#0b4636] transition-colors gap-1 group"
        >
          <span>Explore All 50+ Hubs</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96 w-full rounded-2xl" />
          ))}
        </div>
      ) : featuredZones.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredZones.map((zone) => (
            <ZoneCard key={zone.id} zone={zone} featured />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-3">
          <p className="text-slate-600 font-medium">No parking zones found in telemetry catalog.</p>
          <Link
            href="/parking-zones"
            className="inline-flex items-center text-sm font-bold text-[#0d5440] hover:underline"
          >
            Check zone catalog →
          </Link>
        </div>
      )}
    </section>
  );
}
