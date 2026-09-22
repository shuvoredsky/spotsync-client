"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { MyReservationTable } from "@/components/reservations/MyReservationTable";
import { CancelReservationDialog } from "@/components/reservations/CancelReservationDialog";
import { ExpressGatePassModal } from "@/components/reservations/ExpressGatePassModal";
import { ReceiptModal } from "@/components/reservations/ReceiptModal";
import { Button } from "@/components/ui/button";
import { MyReservationResponse } from "@/types/reservation.types";
import { ArrowLeft, Plus, Ticket } from "lucide-react";

export default function MyReservationsPage() {
  const { isAuthenticated } = useAuth();
  const { myReservations, isLoadingMy, cancelReservation, isCancelling } =
    useReservations(isAuthenticated);

  // Modals state
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState<number | null>(null);
  const [gatePassModalOpen, setGatePassModalOpen] = useState(false);
  const [selectedGatePass, setSelectedGatePass] = useState<MyReservationResponse | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<MyReservationResponse | null>(null);

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 mb-1 gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Reservation History & Gate Passes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Access your active express barcodes, past invoices, and upcoming booking details.
          </p>
        </div>

        <Link href="/parking-zones">
          <Button variant="primary" className="font-bold gap-1.5 shadow-md">
            <Plus className="h-4 w-4" />
            <span>Book New Spot</span>
          </Button>
        </Link>
      </div>

      <MyReservationTable
        reservations={myReservations}
        isLoading={isLoadingMy}
        onCancelClick={handleOpenCancel}
        onViewPassClick={handleOpenGatePass}
        onViewReceiptClick={handleOpenReceipt}
      />

      <CancelReservationDialog
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        reservationId={selectedCancelId}
        onConfirmCancel={cancelReservation}
        isCancelling={isCancelling}
      />

      <ExpressGatePassModal
        open={gatePassModalOpen}
        onOpenChange={setGatePassModalOpen}
        reservation={selectedGatePass}
      />

      <ReceiptModal
        open={receiptModalOpen}
        onOpenChange={setReceiptModalOpen}
        reservation={selectedReceipt}
      />
    </div>
  );
}
