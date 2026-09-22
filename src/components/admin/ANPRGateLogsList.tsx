"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_ANPR_LOGS } from "@/lib/constants";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Filter,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export function ANPRGateLogsList() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Recent Reservations & ANPR Gate Logs
            </h3>
            <Badge variant="active" className="text-[10px]">
              ● Optical OCR Active
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Real-time automatic number-plate recognition events and driver entry authorizations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info("ANPR filter applied: Active gate streams only")}
            className="text-xs font-semibold h-8 gap-1"
          >
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span>Filter Gate ANPR</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Live ANPR socket connected: Streaming logs...")}
            className="text-xs font-semibold h-8 gap-1"
          >
            <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
            <span>Stream Log</span>
          </Button>
        </div>
      </div>

      {/* Grid of 3 Live Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_ANPR_LOGS.map((log) => {
          const isOverstay = log.status === "Action Req.";
          const isActive = log.status === "Active";

          return (
            <div
              key={log.id}
              className={`rounded-2xl border p-4.5 space-y-3.5 transition-all ${
                isOverstay
                  ? "border-rose-200 bg-rose-50/40"
                  : "border-slate-200/90 bg-slate-50/60 hover:bg-white hover:shadow-sm"
              }`}
            >
              {/* Top Subtitle & Status Badge */}
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-slate-700">
                  {isOverstay ? (
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-800" />
                  )}
                  <span>{log.gate}</span>
                </span>

                <Badge
                  variant={isActive ? "available" : isOverstay ? "full" : "secondary"}
                  className="text-[10px]"
                >
                  {log.status}
                </Badge>
              </div>

              {/* Plate Display Box */}
              <div className="rounded-xl border border-slate-200 bg-white p-3 flex items-baseline justify-between shadow-xs">
                <span className="font-mono text-2xl font-black text-slate-900 tracking-wider">
                  {log.plate}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">{log.bay}</span>
              </div>

              {/* Driver Info */}
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-slate-900">{log.driverName}</p>
                <p className="text-slate-500 text-[11px] truncate">{log.driverEmail}</p>
              </div>

              {/* Footer OCR Badges */}
              <div className="flex items-center justify-between border-t border-slate-200/80 pt-2.5 text-[11px] font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <Camera className="h-3 w-3 text-slate-400" />
                  <span>{log.ocrStatus}</span>
                </span>
                <span className="text-[#0d5440] font-bold">{log.barrierAction}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
