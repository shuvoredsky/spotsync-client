"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface CancelReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservationId: number | null;
  onConfirmCancel: (id: number) => Promise<any> | void;
  isCancelling: boolean;
}

export function CancelReservationDialog({
  open,
  onOpenChange,
  reservationId,
  onConfirmCancel,
  isCancelling,
}: CancelReservationDialogProps) {
  if (!reservationId) return null;

  const handleConfirm = async () => {
    await onConfirmCancel(reservationId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-slate-200">
        <DialogHeader className="space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl font-bold text-center text-slate-900">
            Cancel Parking Reservation?
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-slate-500">
            Are you sure you want to cancel reservation <strong>#SS-{reservationId.toString().padStart(4, "0")}</strong>?
            This will release the reserved stall back into the public availability pool.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCancelling}
            className="w-full sm:w-1/2"
          >
            Keep Reservation
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isCancelling}
            className="w-full sm:w-1/2 font-bold"
          >
            {isCancelling ? "Cancelling..." : "Yes, Cancel Reservation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
