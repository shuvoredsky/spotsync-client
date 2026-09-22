"use client";

import React, { useState } from "react";
import { MyReservationResponse } from "@/types/reservation.types";
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
import { CheckCircle2, QrCode, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

interface ExpressGatePassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: MyReservationResponse | null;
}

export function ExpressGatePassModal({
  open,
  onOpenChange,
  reservation,
}: ExpressGatePassModalProps) {
  const [opening, setOpening] = useState(false);

  if (!reservation) return null;

  const handleOpenBarrier = () => {
    setOpening(true);
    toast.success("Gate command dispatched: Optical ANPR Barrier Opening!");
    setTimeout(() => {
      setOpening(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="text-center sm:text-center space-y-1">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f7f2] text-[#0d5440]">
            <QrCode className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl font-extrabold text-slate-900 tracking-tight">
            Express Gate Pass
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Hold pass near optical barcode scanner or approach ANPR camera barrier.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center space-y-3">
          {/* Simulated High-Res QR code */}
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-slate-300 bg-white p-2 shadow-sm">
            <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-slate-900 rounded-xl">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    i % 2 === 0 || i % 5 === 0 ? "bg-white" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              RESERVATION BARCODE TOKEN
            </span>
            <p className="font-mono text-sm font-extrabold text-slate-900 tracking-widest">
              PASS-SS-{reservation.id.toString().padStart(4, "0")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-slate-200 text-xs">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Plate</p>
              <p className="font-mono font-bold text-slate-800">{reservation.license_plate}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Facility</p>
              <p className="font-bold text-slate-800 truncate">{reservation.zone?.name}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-1/3"
          >
            Close
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleOpenBarrier}
            disabled={opening}
            className="w-full sm:w-2/3 font-bold gap-2"
          >
            <ShieldCheck className="h-4 w-4 text-[#00d084]" />
            <span>{opening ? "Raising Barrier..." : "Tap to Open Barrier"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
