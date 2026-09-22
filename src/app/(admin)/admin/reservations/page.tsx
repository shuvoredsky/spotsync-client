"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";
import { CancelReservationDialog } from "@/components/reservations/CancelReservationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, formatZoneType } from "@/lib/utils";
import { Search, Ticket, Trash2 } from "lucide-react";

export default function AdminReservationsPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { allReservations, isLoadingAll, cancelReservation, isCancelling } =
    useReservations(isAuthenticated, isAdmin);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedCancelId, setSelectedCancelId] = useState<number | null>(null);

  const filteredReservations = allReservations.filter((r) => {
    if (
      search.trim() &&
      !r.license_plate.toLowerCase().includes(search.toLowerCase()) &&
      !r.user?.name.toLowerCase().includes(search.toLowerCase()) &&
      !r.user?.email.toLowerCase().includes(search.toLowerCase()) &&
      !r.zone?.name.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    if (statusFilter === "active" && r.status !== "active") return false;
    if (statusFilter === "cancelled" && r.status !== "cancelled") return false;

    return true;
  });

  const handleOpenCancel = (id: number) => {
    setSelectedCancelId(id);
    setCancelModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Master Reservations & ANPR Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Audit system-wide driver bookings, gate entry passes, and cancel active sessions.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
        {/* Search & Status Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plate, user name, email, zone..."
              className="pl-9 h-10 text-xs bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "all" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"
              }`}
            >
              All ({allReservations.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "active" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("cancelled")}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === "cancelled" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Master Table */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>DRIVER / USER</TableHead>
                <TableHead>LICENSE PLATE</TableHead>
                <TableHead>PARKING ZONE</TableHead>
                <TableHead>CREATED AT</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingAll ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                    Loading master reservations...
                  </TableCell>
                </TableRow>
              ) : filteredReservations.length > 0 ? (
                filteredReservations.map((res) => {
                  const isActive = res.status === "active";
                  return (
                    <TableRow key={res.id}>
                      <TableCell className="font-mono font-bold text-xs text-slate-900">
                        #SS-{res.id.toString().padStart(4, "0")}
                      </TableCell>

                      <TableCell>
                        <div>
                          <p className="font-bold text-xs text-slate-900">
                            {res.user?.name || "Driver Account"}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {res.user?.email || "driver@spotsync.io"}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md">
                          {res.license_plate}
                        </span>
                      </TableCell>

                      <TableCell>
                        <p className="font-semibold text-xs text-slate-800">
                          {res.zone?.name || "Terminal Hub"}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {formatZoneType(res.zone?.type)}
                        </p>
                      </TableCell>

                      <TableCell className="text-xs text-slate-600">
                        {formatDateTime(res.created_at)}
                      </TableCell>

                      <TableCell>
                        {isActive ? (
                          <Badge variant="available" className="gap-1 text-[11px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Active</span>
                          </Badge>
                        ) : (
                          <Badge variant="full" className="text-[11px]">
                            Cancelled
                          </Badge>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        {isActive && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenCancel(res.id)}
                            className="h-8 text-xs text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            <span>Cancel</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-slate-500 text-xs">
                    No reservations found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <CancelReservationDialog
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        reservationId={selectedCancelId}
        onConfirmCancel={cancelReservation}
        isCancelling={isCancelling}
      />
    </div>
  );
}
