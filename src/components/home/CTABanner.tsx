import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTABanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#091e17] via-[#0c271e] to-[#091e17] px-6 py-12 sm:px-12 sm:py-16 text-white shadow-2xl">
        {/* Decorative background glow */}
        <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-[#00d084]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[#0d5440]/30 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#00d084] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> READY TO ARRIVE FRICTION-FREE?
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Reserve Your Parking Stall in Under 60 Seconds
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Join thousands of travelers and daily commuters who skip the parking queue every day
            with SpotSync.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Link href="/parking-zones">
              <Button
                variant="default"
                size="lg"
                className="bg-[#00d084] hover:bg-[#00b573] text-[#091e17] font-extrabold gap-2 shadow-lg shadow-[#00d084]/25 h-12 px-6"
              >
                <span>Find & Book Parking Now</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/parking-zones">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 bg-slate-800/80 text-white hover:bg-slate-800 h-12 px-6"
              >
                View Pricing Tariffs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
