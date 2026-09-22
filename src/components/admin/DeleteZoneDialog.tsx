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

interface DeleteZoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  zoneId: number | null;
  zoneName: string;
  onConfirmDelete: (id: number) => Promise<any> | void;
  isDeleting: boolean;
}

export function DeleteZoneDialog({
  open,
  onOpenChange,
  zoneId,
  zoneName,
  onConfirmDelete,
  isDeleting,
}: DeleteZoneDialogProps) {
  if (!zoneId) return null;

  const handleConfirm = async () => {
    await onConfirmDelete(zoneId);
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
            Delete Parking Zone?
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-slate-500">
            Are you sure you want to delete <strong>{zoneName}</strong>? This action cannot be undone and will remove the zone from public allocation.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="w-full sm:w-1/2"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="w-full sm:w-1/2 font-bold"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete Zone"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
