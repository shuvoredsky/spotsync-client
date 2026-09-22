import React from "react";
import { formatCurrency } from "@/lib/utils";

interface RateBreakdownCardProps {
  pricePerHour: number;
  isEV: boolean;
}

export function RateBreakdownCard({ pricePerHour, isEV }: RateBreakdownCardProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-base font-bold text-slate-900 tracking-tight">
        Transparent Rate Breakdown
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 space-y-1 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            BASE PARKING
          </p>
          <p className="text-xl font-extrabold text-slate-900">
            {formatCurrency(pricePerHour)} <span className="text-xs text-slate-500 font-normal">/ hr</span>
          </p>
          <p className="text-[11px] text-slate-500 leading-tight">
            Secure stall reservation guarantee with automated ANPR gate lift.
          </p>
        </div>

        <div className="rounded-xl border border-teal-200/80 bg-teal-50/40 p-4 space-y-1 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
            {isEV ? "EV POWER TARIFF" : "SERVICE AMENITY"}
          </p>
          <p className="text-xl font-extrabold text-teal-900">
            {isEV ? "$0.35" : "$0.00"} <span className="text-xs text-teal-700 font-normal">{isEV ? "/ kWh" : "included"}</span>
          </p>
          <p className="text-[11px] text-teal-700 leading-tight">
            {isEV
              ? "Ultra-fast DC power delivery bundled into flat reservation tier."
              : "24/7 security surveillance & direct concourse access included."}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200/90 bg-white p-4 space-y-1 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            GRACE WINDOW
          </p>
          <p className="text-xl font-extrabold text-slate-900">
            15 Mins
          </p>
          <p className="text-[11px] text-slate-500 leading-tight">
            Complimentary departure buffer before overtime rates apply.
          </p>
        </div>
      </div>
    </div>
  );
}
