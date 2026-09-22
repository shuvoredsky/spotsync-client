"use client";

import React, { useState, useEffect } from "react";
import { MyReservationResponse } from "@/types/reservation.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Car,
  Clock,
  Compass,
  MapPin,
  PlusCircle,
  QrCode,
  ShieldCheck,
  Trash2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface ActiveReservationHeroProps {
  reservation: MyReservationResponse;
  onCancelClick: (id: number) => void;
  onViewPassClick: (res: MyReservationResponse) => void;
}

export function ActiveReservationHero({
  reservation,
  onCancelClick,
  onViewPassClick,
}: ActiveReservationHeroProps) {
  // Session countdown timer simulation (e.g., 2 hours 14 mins remaining)
  const [secondsRemaining, setSecondsRemaining] = useState(8054);
  const [batteryPercent, setBatteryPercent] = useState(74);
  const [barrierOpening, setBarrierOpening] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleTapBarrier = () => {
    setBarrierOpening(true);
    toast.success("ANPR Camera Verified: Barrier Gate 2B Raised!");
    setTimeout(() => setBarrierOpening(false), 3000);
  };

  return (
    <div className="rounded-2xl border border-emerald-200/90 bg-white p-5 sm:p-6 shadow-md space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f7f2] text-[#0d5440]">
            <Car className="h-5 w-5 text-[#0d5440]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              CURRENT ACTIVE RESERVATION
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {reservation.zone?.name || "Terminal 1 EV Charging"}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="active" className="gap-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>ACTIVE IN-SESSION</span>
          </Badge>
          <Badge variant="outline" className="text-xs bg-slate-50 font-mono">
            ID: #SS-{reservation.id.toString().padStart(4, "0")}
          </Badge>
        </div>
      </div>

      {/* Main Grid: Stall & Telemetry (Left) + Express Gate Pass (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column (8 cols): Stall Assignment & Power Progress */}
        <div className="md:col-span-7 space-y-4">
          {/* Stall assignment card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-slate-200 px-3 py-1.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">BAY</span>
                <span className="text-xl font-black text-slate-900">E-07</span>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">Tesla Model 3 / Dual Motor</p>
                <p className="text-xs text-slate-500 font-mono">
                  License: <strong className="text-slate-800">{reservation.license_plate}</strong>
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 text-slate-400" /> Level 2, Column Red-B
                </p>
              </div>
            </div>

            <Badge variant="ev" className="text-[10px] hidden sm:inline-flex">
              Fast DC CCS Combo 2
            </Badge>
          </div>

          {/* Charging Power Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-700" /> Charging • 48 kW Delivery
              </span>
              <span className="font-extrabold text-[#0d5440]">{batteryPercent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-[#00d084] transition-all duration-500"
                style={{ width: `${batteryPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>+28.4 kWh Delivered</span>
              <span>Target: 90% (~18 min)</span>
            </div>
          </div>

          {/* Session Expiration Countdown */}
          <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-white">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[#00d084]" />
              <span className="text-xs font-semibold text-slate-300">Session Expiration</span>
            </div>
            <span className="font-mono text-lg font-black tracking-widest text-[#00d084]">
              {formatTimer(secondsRemaining)}
            </span>
          </div>
        </div>

        {/* Right Column (5 cols): Express Gate Pass QR Card */}
        <div className="md:col-span-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center space-y-3 shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              EXPRESS GATE PASS
            </span>
            <QrCode className="h-4 w-4 text-[#0d5440]" />
          </div>

          {/* QR Code visual simulation */}
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-slate-300 bg-white p-2 shadow-sm">
            <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-slate-900 rounded-lg">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    i % 2 === 0 || i === 6 || i === 18 ? "bg-white" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="font-mono text-[11px] font-bold text-slate-500">
            GATE-SS-{reservation.id.toString().padStart(4, "0")}
          </p>

          <Button
            type="button"
            onClick={handleTapBarrier}
            disabled={barrierOpening}
            className="w-full bg-[#0d5440] hover:bg-[#0b4636] text-white font-bold text-xs h-9 gap-1.5 shadow-md"
          >
            <ShieldCheck className="h-4 w-4 text-[#00d084]" />
            <span>{barrierOpening ? "Barrier Raising..." : "Tap to Open Barrier"}</span>
          </Button>

          <p className="text-[10px] text-slate-400">
            ANPR camera auto-verifies plate {reservation.license_plate} at entry barrier 04
          </p>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("Extended 1 Hour added to reservation session")}
            className="text-xs font-semibold gap-1.5"
          >
            <PlusCircle className="h-3.5 w-3.5 text-slate-500" />
            <span>Extend Time (+1h)</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("Opening GPS turn-by-turn guidance...")}
            className="text-xs font-semibold gap-1.5"
          >
            <Compass className="h-3.5 w-3.5 text-slate-500" />
            <span>Get Directions</span>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => onCancelClick(reservation.id)}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Cancel Reservation</span>
        </button>
      </div>
    </div>
  );
}
