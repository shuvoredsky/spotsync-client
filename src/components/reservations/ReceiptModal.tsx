"use client";

import React from "react";
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
import { Download, FileText, Printer, ShieldCheck } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

interface ReceiptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: MyReservationResponse | null;
}

export function ReceiptModal({ open, onOpenChange, reservation }: ReceiptModalProps) {
  if (!reservation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white border-slate-200">
        <DialogHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-[#0d5440]" />
            <DialogTitle className="text-xl font-bold text-slate-900">
              Electronic Tax Invoice
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Official SpotSync mobility tax invoice & ANPR dwell summary.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-xs">
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div>
              <p className="font-extrabold text-sm text-slate-900">SpotSync Technologies Inc.</p>
              <p className="text-slate-500">Skyport Terminal Hub Node 4</p>
              <p className="text-slate-500">VAT ID: US-9842104-EV</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-slate-900">
                #SS-{reservation.id.toString().padStart(4, "0")}
              </p>
              <p className="text-slate-500">{formatDateTime(reservation.created_at)}</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-3 space-y-2 border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Facility / Bay:</span>
              <span className="font-bold text-slate-900">{reservation.zone?.name || "Terminal Zone"} (Bay E-07)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Vehicle License:</span>
              <span className="font-mono font-bold text-slate-900">{reservation.license_plate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-emerald-700 capitalize">{reservation.status}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-extrabold text-slate-900">
              <span>Total Paid (incl. Tax):</span>
              <span>$16.50</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-1/2">
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => window.print()}
            className="w-full sm:w-1/2 gap-1.5 font-bold"
          >
            <Printer className="h-4 w-4" />
            <span>Print Invoice</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
