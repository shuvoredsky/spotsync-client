"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HUBS } from "@/lib/constants";
import { ArrowRight, Calendar, Clock, Layers, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const [selectedHub, setSelectedHub] = useState(HUBS[0].name);
  const [stallType, setStallType] = useState("all");

  const handleCheckLive = () => {
    router.push(`/parking-zones?type=${stallType}`);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 bg-gradient-to-b from-white via-slate-50 to-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-3xl">
          {/* Micro Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#e6f7f2] px-3.5 py-1 text-xs font-bold text-[#0d5440]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SMART PARKING. SIMPLE RESERVATIONS.</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Find Your Spot. <br />
            <span className="text-[#0d5440]">Charge. Go.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Reserve convenient parking and high-voltage EV charging spots before you arrive
            at major international terminals and premier shopping centers.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/parking-zones">
              <Button
                variant="primary"
                size="lg"
                className="gap-2 font-bold shadow-lg shadow-[#0d5440]/20 h-12 px-6"
              >
                <span>Find Parking</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/parking-zones">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 font-semibold border-slate-300 text-slate-700 bg-white hover:bg-slate-50 h-12 px-6"
              >
                <Layers className="h-4 w-4" />
                <span>View Parking Zones</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Interactive Quick-Search / Check Live Bar */}
        <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            {/* Facility Destination */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                📍 Destination Facility
              </label>
              <Select value={selectedHub} onValueChange={setSelectedHub}>
                <SelectTrigger className="h-11 text-xs">
                  <SelectValue placeholder="Select Destination" />
                </SelectTrigger>
                <SelectContent>
                  {HUBS.map((hub) => (
                    <SelectItem key={hub.id} value={hub.name} className="text-xs">
                      {hub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Parking Stall Type Toggle */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ⚡ Parking Stall Type
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setStallType("all")}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stallType === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setStallType("ev_charging")}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stallType === "ev_charging"
                      ? "bg-[#0d5440] text-white shadow-sm"
                      : "text-slate-600"
                  }`}
                >
                  EV Fast
                </button>
                <button
                  type="button"
                  onClick={() => setStallType("covered")}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stallType === "covered"
                      ? "bg-[#0d5440] text-white shadow-sm"
                      : "text-slate-600"
                  }`}
                >
                  Covered
                </button>
              </div>
            </div>

            {/* Arrival Window Date/Time Mock */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                🕒 Arrival Window
              </label>
              <div className="flex items-center gap-2">
                <div className="flex h-11 flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 mr-2" />
                  <span>Today</span>
                </div>
                <div className="flex h-11 flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700">
                  <Clock className="h-3.5 w-3.5 text-slate-400 mr-2" />
                  <span>02:30 PM</span>
                </div>
              </div>
            </div>

            {/* Check Live Action */}
            <div className="md:col-span-2">
              <Button
                onClick={handleCheckLive}
                className="w-full h-11 bg-[#091e17] hover:bg-[#0c271e] text-white font-bold gap-1.5 shadow-md"
              >
                <Zap className="h-4 w-4 text-[#00d084]" />
                <span>Check Live</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
