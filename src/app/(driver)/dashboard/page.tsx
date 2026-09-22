"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { useZones } from "@/hooks/useZones";
import { ActiveReservationHero } from "@/components/reservations/ActiveReservationHero";
import { MyReservationTable } from "@/components/reservations/MyReservationTable";
import { CancelReservationDialog } from "@/components/reservations/CancelReservationDialog";
import { ExpressGatePassModal } from "@/components/reservations/ExpressGatePassModal";
import { ReceiptModal } from "@/components/reservations/ReceiptModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MyReservationResponse } from "@/types/reservation.types";
import {
  ArrowRight,
  BarChart3,
  BatteryCharging,
  Car,
  Compass,
  CreditCard,
  Plus,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function DriverDashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const { myReservations, isLoadingMy, cancelReservation, isCancelling } =
    useReservations(isAuthenticated);
  const { zones } = useZones();

  // Modals state
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState<number | null>(null);
  const [gatePassModalOpen, setGatePassModalOpen] = useState(false);
  const [selectedGatePass, setSelectedGatePass] = useState<MyReservationResponse | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<MyReservationResponse | null>(null);

  // Active reservation
  const activeReservation = myReservations.find((r) => r.status === "active");

  const handleOpenCancel = (id: number) => {
    setSelectedCancelId(id);
    setCancelModalOpen(true);
  };

  const handleOpenGatePass = (res: MyReservationResponse) => {
    setSelectedGatePass(res);
    setGatePassModalOpen(true);
  };

  const handleOpenReceipt = (res: MyReservationResponse) => {
    setSelectedReceipt(res);
    setReceiptModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d5440] text-xl font-black text-white shadow-md">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {user?.name || "Driver"} 👋
              </h1>
              <Badge variant="active" className="text-xs font-bold gap-1">
                <Sparkles className="h-3 w-3 text-emerald-700" />
                GOLD MEMBER
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage your active charging sessions, upcoming parking bookings, and vehicle profiles.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {activeReservation && (
            <Button
              variant="outline"
              onClick={() => handleOpenGatePass(activeReservation)}
              className="flex-1 md:flex-none text-xs font-bold gap-1.5 h-11 border-slate-300"
            >
              <QrCode className="h-4 w-4 text-[#0d5440]" />
              <span>Scan Gate Pass</span>
            </Button>
          )}

          <Link href="/parking-zones" className="flex-1 md:flex-none">
            <Button
              variant="primary"
              className="w-full text-xs font-bold gap-1.5 h-11 shadow-md shadow-[#0d5440]/20"
            >
              <Plus className="h-4 w-4" />
              <span>Reserve New Spot</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Top KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
              ACTIVE BAY SESSION
            </span>
            <Badge variant="available" className="text-[10px]">
              Live Now
            </Badge>
          </div>
          <p className="text-2xl font-black text-slate-900">
            {activeReservation ? "Bay E-07" : "No Active Bay"}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {activeReservation?.zone?.name || "Ready to book arrival stall"}
          </p>
          <div className="rounded-lg bg-slate-50 p-2 text-[11px] font-semibold text-emerald-800 flex justify-between">
            <span>Remaining Session:</span>
            <span>{activeReservation ? "2h 14m remaining" : "0h 00m"}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
              HUB AVAILABILITY
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
              P
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">48 Open</p>
          <p className="text-xs text-slate-500">Distributed across 5 major hubs</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full bg-slate-900 rounded-full" style={{ width: "68%" }}></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
              HIGH-SPEED CHARGERS
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Zap className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-800">142 Fast</p>
          <p className="text-xs text-slate-500">DC 150kW+ ready for plug-in</p>
          <div className="flex justify-between text-[11px] text-slate-400 font-medium pt-1">
            <span>Airport Hub: 54</span>
            <span>Retail Deck: 88</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
              LIFETIME UTILITY
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">28 Trips</p>
          <p className="text-xs text-emerald-800 font-semibold">$412 saved via SpotSync Club</p>
          <p className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-700" /> Zero gate wait telemetry
          </p>
        </div>
      </div>

      {/* Active Session Hero or Quick Book Banner */}
      {activeReservation ? (
        <ActiveReservationHero
          reservation={activeReservation}
          onCancelClick={handleOpenCancel}
          onViewPassClick={handleOpenGatePass}
        />
      ) : (
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-[#e6f7f2] to-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <Badge variant="active" className="font-bold">
              READY FOR ARRIVAL
            </Badge>
            <h3 className="text-2xl font-extrabold text-slate-900">
              No active parking session currently running
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Lock in your spot at airport terminal decks or fast EV supercharging hubs before departing.
            </p>
          </div>
          <Link href="/parking-zones">
            <Button variant="primary" size="lg" className="font-bold gap-2 shadow-md">
              <span>Find & Book Spot</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Side-by-side: Recommended Nearby Hubs + Congestion Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Nearby */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900">Recommended Nearby</h4>
            <Link
              href="/parking-zones"
              className="text-xs font-bold text-[#0d5440] hover:underline flex items-center gap-1"
            >
              <span>Explore All 5 Hubs</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {zones.slice(0, 2).map((z) => (
              <div
                key={z.id}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="font-bold text-sm text-slate-900">{z.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>📍 0.4 mi • 3 min</span>
                    <span>•</span>
                    <span className="font-semibold text-emerald-800">${z.price_per_hour}/hr</span>
                  </p>
                </div>

                <Link href={`/parking-zones/${z.id}`}>
                  <Button variant="subtle" size="sm" className="text-xs font-bold">
                    View
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Congestion Forecast */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                PEAK OCCUPANCY FORECAST
              </span>
              <p className="text-base font-extrabold text-slate-900">Low Congestion</p>
            </div>
            <Badge variant="available" className="text-xs font-bold">
              Optimal Entry Now
            </Badge>
          </div>

          {/* Forecast Bar Simulation */}
          <div className="flex items-end justify-between h-20 pt-4 px-2">
            {[20, 35, 75, 40, 25, 60, 80, 50].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1 w-7">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    i === 2 ? "bg-[#0d5440]" : "bg-blue-100 hover:bg-blue-200"
                  }`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-slate-400">
                  {i === 2 ? "2 PM" : i === 6 ? "5 PM" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Driver Reservations History Table */}
      <MyReservationTable
        reservations={myReservations}
        isLoading={isLoadingMy}
        onCancelClick={handleOpenCancel}
        onViewPassClick={handleOpenGatePass}
        onViewReceiptClick={handleOpenReceipt}
      />

      {/* Cancellation Modal Dialog */}
      <CancelReservationDialog
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        reservationId={selectedCancelId}
        onConfirmCancel={cancelReservation}
        isCancelling={isCancelling}
      />

      {/* Express Gate Pass QR Modal */}
      <ExpressGatePassModal
        open={gatePassModalOpen}
        onOpenChange={setGatePassModalOpen}
        reservation={selectedGatePass}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        open={receiptModalOpen}
        onOpenChange={setReceiptModalOpen}
        reservation={selectedReceipt}
      />
    </div>
  );
}
