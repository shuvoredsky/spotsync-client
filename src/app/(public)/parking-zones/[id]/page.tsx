"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useZones } from "@/hooks/useZones";
import { StallAllocationMap } from "@/components/parking-zones/StallAllocationMap";
import { RateBreakdownCard } from "@/components/parking-zones/RateBreakdownCard";
import { FastCheckoutForm } from "@/components/parking-zones/FastCheckoutForm";
import { AvailabilityBadge } from "@/components/parking-zones/AvailabilityBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Camera,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  ShieldCheck,
  UserCheck,
  Video,
  Zap,
} from "lucide-react";

export default function ZoneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const zoneId = parseInt(params.id as string, 10);

  const { useZoneDetail } = useZones();
  const { data: zone, isLoading, isError } = useZoneDetail(zoneId);

  const [selectedBay, setSelectedBay] = useState("E-07");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <Skeleton className="h-6 w-48 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !zone) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <Car className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Parking Zone Not Found</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          The requested parking zone could not be retrieved from the central grid. It may have been decommissioned or does not exist.
        </p>
        <Link href="/parking-zones">
          <Button variant="primary">Return to Parking Directory</Button>
        </Link>
      </div>
    );
  }

  const isEV = zone.type === "ev_charging";
  const isCovered = zone.type === "covered";

  const occupancyPercent = Math.round(
    ((zone.total_capacity - zone.available_spots) / (zone.total_capacity || 1)) * 100
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Trail */}
      <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-slate-900 flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <Link href="/parking-zones" className="hover:text-slate-900">
          Parking Zones
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-[200px]">{zone.name}</span>
      </nav>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Zone Details, Live Telemetry, Interactive Stall Map, Features */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Title and Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={isEV ? "ev" : "secondary"} className="gap-1 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                {isEV ? "ULTRA-FAST EV HUB" : isCovered ? "COVERED VIP DECK" : "GENERAL BAY"}
              </Badge>
              <Badge variant="outline" className="text-xs bg-white text-slate-700">
                Terminal 1 • Level 2, Row E
              </Badge>
              <Badge variant="outline" className="text-xs bg-white text-emerald-800 gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                ISO 15118 Autocharge Active
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {zone.name} & Dedicated Parking
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
              High-voltage charging corridor situated adjacent to the Terminal 1 Skybridge concourse.
              Features dual CCS & NACS rapid dispensers with hands-free ANPR terminal validation.
            </p>
          </div>

          {/* Real-Time Grid Telemetry Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">Real-Time Grid Telemetry</span>
                  <Badge variant="available" className="text-[10px]">
                    Live
                  </Badge>
                </div>
                <p className="text-sm font-extrabold text-[#0d5440] mt-0.5">
                  {zone.available_spots} of {zone.total_capacity} spots available right now
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  FLEET OCCUPANCY
                </span>
                <p className="text-xl font-extrabold text-slate-900">{occupancyPercent}%</p>
              </div>
            </div>

            {/* Telemetry Progress Bar */}
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-[#0d5440] transition-all duration-700"
                style={{ width: `${occupancyPercent}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                {zone.available_spots} Free (150kW)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                {zone.total_capacity - zone.available_spots} Dispensing
              </span>
              <span className="flex items-center gap-1.5 font-bold text-[#0d5440]">
                <span className="h-2 w-2 rounded-full bg-[#091e17] border border-[#00d084]"></span>
                Selected ({selectedBay})
              </span>
            </div>
          </div>

          {/* Interactive Stall Allocation Map */}
          <StallAllocationMap
            totalCapacity={zone.total_capacity}
            availableSpots={zone.available_spots}
            selectedBay={selectedBay}
            onSelectBay={setSelectedBay}
            isEV={isEV}
          />

          {/* 4 Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f7f2] text-[#0d5440]">
                <Zap className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  {isEV ? "150kW DC Fast Charging" : "Reserved Dedicated Bay"}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isEV
                    ? "Dual CCS1 & NACS connector architecture with precision kWh automated telemetry."
                    : "Guaranteed stall allocation reserved exclusively for your vehicle license plate."}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Camera className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Automated ANPR Gate Access
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Touchless license plate recognition camera instantly lifts express security barrier within 1.2s.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Video className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  24/7 Monitored Bay Safety
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Full-spectrum high-lumen LED illumination, intelligent perimeter cameras, and continuous patrol.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <UserCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  90s Terminal Concourse
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct climate-controlled covered skybridge links Row E to Terminal 1 TSA Security & Lounges.
                </p>
              </div>
            </div>
          </div>

          {/* Rate Breakdown Component */}
          <RateBreakdownCard pricePerHour={zone.price_per_hour} isEV={isEV} />

          {/* Bottom Telemetry Visual Hub Banner */}
          <div className="rounded-2xl border border-slate-200 bg-[#091e17] p-6 text-white shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00d084]">
                SPOTSYNC TELEMETRY HUB
              </span>
              <p className="text-base font-extrabold text-white">
                Continuous Grid Health & Stall Telematics
              </p>
              <p className="text-xs text-slate-400">
                Connected with real-time ISO 15118 protocol for secure automated vehicle charging handshake.
              </p>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00d084]/20 text-[#00d084]">
              <Zap className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Fast Checkout Reservation Form */}
        <div className="lg:col-span-4">
          <FastCheckoutForm zone={zone} selectedBay={selectedBay} />
        </div>
      </div>
    </div>
  );
}
