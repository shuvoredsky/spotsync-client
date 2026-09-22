"use client";

import React, { useState } from "react";
import { MyReservationResponse } from "@/types/reservation.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, formatZoneType } from "@/lib/utils";
import { FileText, QrCode, Trash2, Zap } from "lucide-react";

interface MyReservationTableProps {
  reservations: MyReservationResponse[];
  isLoading: boolean;
  onCancelClick: (id: number) => void;
  onViewPassClick: (res: MyReservationResponse) => void;
  onViewReceiptClick: (res: MyReservationResponse) => void;
}

export function MyReservationTable({
  reservations,
  isLoading,
  onCancelClick,
  onViewPassClick,
  onViewReceiptClick,
}: MyReservationTableProps) {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed" | "cancelled">("all");

  const filteredReservations = reservations.filter((r) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return r.status === "active";
    if (activeTab === "cancelled") return r.status === "cancelled";
    if (activeTab === "completed") return r.status === "completed";
    return true;
  });

  const activeCount = reservations.filter((r) => r.status === "active").length;
  const cancelledCount = reservations.filter((r) => r.status === "cancelled").length;
  const completedCount = reservations.length - activeCount - cancelledCount;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            My Reservations
          </h3>
          <p className="text-xs text-slate-500">
            View telemetry records, electronic gate tickets, and tax invoices.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({reservations.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "active" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("completed")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "completed" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Completed ({Math.max(0, completedCount)})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cancelled")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "cancelled" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>BOOKING ID</TableHead>
              <TableHead>ZONE & BAY</TableHead>
              <TableHead>VEHICLE PLATE</TableHead>
              <TableHead>DATE & TIME</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                  Loading reservations telemetry...
                </TableCell>
              </TableRow>
            ) : filteredReservations.length > 0 ? (
              filteredReservations.map((res) => {
                const isActive = res.status === "active";
                const isCancelled = res.status === "cancelled";

                return (
                  <TableRow key={res.id}>
                    <TableCell className="font-mono font-bold text-xs text-slate-900">
                      #SS-{res.id.toString().padStart(4, "0")}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-bold text-xs text-slate-900">
                          {res.zone?.name || "Terminal Hub"}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Bay E-07 • {formatZoneType(res.zone?.type)}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md">
                        {res.license_plate}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs text-slate-600">
                      {formatDateTime(res.created_at)}
                    </TableCell>

                    <TableCell className="font-bold text-xs text-slate-900">
                      {isCancelled ? <span className="line-through text-slate-400">$16.50</span> : "$16.50"}
                    </TableCell>

                    <TableCell>
                      {isActive ? (
                        <Badge variant="available" className="gap-1 text-[11px]">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Active</span>
                        </Badge>
                      ) : isCancelled ? (
                        <Badge variant="full" className="text-[11px]">
                          Cancelled
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[11px]">
                          Completed
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {isActive && (
                          <>
                            <Button
                              variant="subtle"
                              size="sm"
                              onClick={() => onViewPassClick(res)}
                              className="h-8 text-xs font-semibold gap-1"
                            >
                              <QrCode className="h-3.5 w-3.5 text-[#0d5440]" />
                              <span>View Pass</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onCancelClick(res.id)}
                              className="h-8 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            >
                              Cancel
                            </Button>
                          </>
                        )}

                        {!isActive && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewReceiptClick(res)}
                            className="h-8 text-xs font-semibold gap-1 text-slate-700"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>Receipt</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-slate-500 text-xs">
                  No reservations found in this view.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
        <span>
          Showing <strong>{filteredReservations.length}</strong> of <strong>{reservations.length}</strong> registered reservation records
        </span>
      </div>
    </div>
  );
}
