"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, ReservationFormData } from "@/lib/validators";
import { ParkingZone } from "@/types/zone.types";
import { useReservations } from "@/hooks/useReservations";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { VEHICLE_MODELS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Headphones,
  Lock,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ReservationSuccessModal } from "@/components/reservations/ReservationSuccessModal";
import { ReservationResponse } from "@/types/reservation.types";

interface FastCheckoutFormProps {
  zone: ParkingZone;
  selectedBay: string;
}

export function FastCheckoutForm({ zone, selectedBay }: FastCheckoutFormProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { createReservation, isCreating } = useReservations(isAuthenticated);

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationResponse | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [durationHours, setDurationHours] = useState<number>(3);
  const [selectedVehicle, setSelectedVehicle] = useState<string>(VEHICLE_MODELS[0]);

  const isFull = zone.available_spots <= 0;
  const isEV = zone.type === "ev_charging";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      zone_id: zone.id,
      license_plate: "7XYZ892",
      vehicle_model: VEHICLE_MODELS[0],
      selected_bay: selectedBay,
      duration_hours: 3,
    },
  });

  // Calculate pricing breakdown
  const subtotal = zone.price_per_hour * durationHours;
  const cleanEnergyCredit = isEV ? 1.5 : 0;
  const totalDue = Math.max(0, subtotal - cleanEnergyCredit);

  const onSubmit = async (data: ReservationFormData) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/parking-zones/${zone.id}`);
      return;
    }

    try {
      const res = await createReservation({
        zone_id: zone.id,
        license_plate: data.license_plate,
      });

      if (res.success && res.data) {
        setConfirmedReservation(res.data);
        setSuccessModalOpen(true);
        // Trigger subtle confetti celebration
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00d084", "#0d5440", "#10b981", "#ffffff"],
        });
      }
    } catch {
      // Error handled by useReservations toast
    }
  };

  return (
    <>
      <Card className="sticky top-20 border-slate-200 bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="p-5 pb-3 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-700" /> FAST CHECKOUT
            </span>
            <Badge variant="outline" className="text-xs bg-white">
              Instant Sync
            </Badge>
          </div>
          <CardTitle className="text-xl font-extrabold text-slate-900 tracking-tight">
            Reserve Your Spot
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-5 space-y-4">
            {/* Selected Bay Indicator */}
            <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800">
                  Selected Bay: <span className="text-[#0d5440] font-extrabold text-sm">{selectedBay}</span>
                </span>
              </div>
              <Badge variant="ev" className="text-[11px]">
                {isEV ? "Fast Charger 150kW" : "Covered Stall"}
              </Badge>
            </div>

            {/* License Plate Input */}
            <div className="space-y-1.5">
              <Label htmlFor="license_plate">
                Vehicle License Plate (ANPR Gate Sync)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 flex items-center gap-1 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">
                  <span>🇺🇸</span>
                  <span>USA</span>
                </div>
                <Input
                  id="license_plate"
                  placeholder="7XYZ892"
                  className="pl-20 uppercase font-mono font-bold tracking-widest text-slate-900"
                  maxLength={15}
                  {...register("license_plate")}
                />
              </div>
              {errors.license_plate && (
                <p className="text-xs text-rose-500 font-medium">
                  {errors.license_plate.message}
                </p>
              )}
            </div>

            {/* Vehicle Model Selector */}
            <div className="space-y-1.5">
              <Label>Vehicle Model</Label>
              <Select
                value={selectedVehicle}
                onValueChange={(val) => {
                  setSelectedVehicle(val);
                  setValue("vehicle_model", val);
                }}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Select Vehicle Model" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_MODELS.map((model) => (
                    <SelectItem key={model} value={model} className="text-xs">
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration Selector */}
            <div className="space-y-1.5">
              <Label>Reservation Duration (Hours)</Label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 5].map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => {
                      setDurationHours(hr);
                      setValue("duration_hours", hr);
                    }}
                    className={`rounded-lg py-1.5 text-xs font-bold transition-all ${
                      durationHours === hr
                        ? "bg-[#0d5440] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {hr} {hr === 1 ? "Hour" : "Hours"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost Breakdown Box */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Estimated Duration</span>
                <span className="font-semibold text-slate-900">{durationHours} Hours</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Flat Parking & EV Rate</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(zone.price_per_hour)} / hr
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>

              {isEV && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-emerald-700" /> Clean Energy Credit
                  </span>
                  <span>-{formatCurrency(cleanEnergyCredit)}</span>
                </div>
              )}

              <div className="border-t border-slate-200 pt-2 flex items-baseline justify-between">
                <span className="text-sm font-extrabold text-slate-900">Total Due</span>
                <span className="text-2xl font-black text-[#0d5440] tracking-tight">
                  {formatCurrency(totalDue)}
                </span>
              </div>
            </div>

            {/* Confirm Submit Button */}
            <Button
              type="submit"
              disabled={isCreating || isFull}
              className="w-full bg-[#0d5440] hover:bg-[#0b4636] text-white font-bold h-12 text-base shadow-lg shadow-[#0d5440]/25 gap-2"
            >
              {isCreating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  <span>Locking Slot & Gate Pass...</span>
                </>
              ) : isFull ? (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Zone Currently Full</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 text-[#00d084]" />
                  <span>Confirm Reservation</span>
                </>
              )}
            </Button>

            {/* Reassurance copy */}
            <p className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-800" />
              Free cancellation • Instant gate barcode sync
            </p>

            {/* Assistance card */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 flex items-center space-x-3 text-xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e6f7f2] text-[#0d5440]">
                <Headphones className="h-4 w-4" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Need Assistance at Gate 2B?</p>
                <p className="text-[11px] text-slate-500">Dial 24/7 Concourse Dispatch: ext 401</p>
              </div>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Success Confirmation Modal */}
      {confirmedReservation && (
        <ReservationSuccessModal
          open={successModalOpen}
          onOpenChange={setSuccessModalOpen}
          reservation={confirmedReservation}
          zoneName={zone.name}
          selectedBay={selectedBay}
        />
      )}
    </>
  );
}
