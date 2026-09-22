import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Lock,
  Radio,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <Badge variant="active" className="font-bold">
          SYSTEM ARCHITECTURE & STANDARDS
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Next-Generation Mobility Infrastructure
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          SpotSync bridges high-voltage EV charging networks, optical license plate readers (ANPR),
          and terminal barrier gate systems with sub-second latency and zero-overbooking transactional safety.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 bg-white shadow-sm p-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f7f2] text-[#0d5440]">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Row-Level Lock Concurrency
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Engineered with PostgreSQL transactional row locks (<code>SELECT FOR UPDATE</code>)
            to eliminate double-bookings even during high-concurrency peak travel rush.
          </p>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm p-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            OCPP 2.0.1 & ISO 15118
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Full compliance with international EV charging standards for secure vehicle authentication,
            smart charging scheduling, and dynamic power distribution.
          </p>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm p-6 space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Radio className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Automated ANPR Gate Lift
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Touchless optical barrier synchronization reads your vehicle plate upon entry and lifts the
            boom gate automatically without physical tickets.
          </p>
        </Card>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-[#091e17] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to experience frictionless parking?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Explore active airport terminals, reserve guaranteed EV fast bays, and skip the queue.
          </p>
        </div>
        <Link href="/parking-zones">
          <Button
            variant="default"
            size="lg"
            className="bg-[#00d084] hover:bg-[#00b573] text-[#091e17] font-black h-12 px-6 gap-2"
          >
            <span>Explore Parking Zones</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
