"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ReservationResponse } from "@/types/reservation.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, QrCode, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface ReservationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: ReservationResponse;
  zoneName: string;
  selectedBay: string;
}

export function ReservationSuccessModal({
  open,
  onOpenChange,
  reservation,
  zoneName,
  selectedBay,
}: ReservationSuccessModalProps) {
  const router = useRouter();

  const handleGoDashboard = () => {
    onOpenChange(false);
    router.push("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="text-center sm:text-center space-y-2 pt-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f7f2] text-[#0d5440]">
            <CheckCircle2 className="h-8 w-8 text-[#0d5440]" />
          </div>

          <DialogTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reservation Confirmed!
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs">
            Your stall reservation and ANPR gate pass are active in the central telemetry grid.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-xs text-slate-500 font-medium">Booking Reference</span>
            <span className="font-mono text-xs font-bold text-slate-900">
              #SS-{reservation.id.toString().padStart(4, "0")}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-xs text-slate-500 font-medium">Facility / Hub</span>
            <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
              {zoneName}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-xs text-slate-500 font-medium">Assigned Stall</span>
            <Badge variant="active" className="font-bold">
              {selectedBay || `Bay ${reservation.zone_id}-01`}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Vehicle License Plate</span>
            <span className="font-mono text-sm font-extrabold text-slate-900 tracking-wider">
              {reservation.license_plate}
            </span>
          </div>
        </div>

        {/* Optical Gate Pass reassurance */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 flex items-center space-x-3 text-xs text-emerald-950">
          <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0" />
          <p className="text-[11px] leading-tight">
            Optical ANPR gate cameras will recognize plate <strong>{reservation.license_plate}</strong> and lift barrier upon approach.
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-1/2"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleGoDashboard}
            className="w-full sm:w-1/2 gap-1.5 font-bold"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
