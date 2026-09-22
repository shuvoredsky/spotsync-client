import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#091e17] to-slate-900 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle grid background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#00d084_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 z-10">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00d084] text-[#091e17] shadow-lg shadow-[#00d084]/20 transition-transform group-hover:scale-105">
              <Zap className="h-6 w-6 font-bold" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Spot<span className="text-[#00d084]">Sync</span>
            </span>
          </Link>
        </div>

        {children}

        <p className="text-center text-xs text-slate-400">
          © 2025 SpotSync Technologies Inc. Secure Cloud ANPR & Grid Gateway.
        </p>
      </div>
    </div>
  );
}
