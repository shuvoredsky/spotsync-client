import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#091e17] text-white">
                <Zap className="h-4 w-4 text-[#00d084]" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Spot<span className="text-[#0d5440]">Sync</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              High-precision smart parking allocation, high-voltage EV station telemetry, and
              seamless enterprise mobility management.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-800">
                Telemetry Grid Operational
              </span>
            </div>
          </div>

          {/* Col 2: Mobility Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Mobility Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <Link href="/parking-zones" className="hover:text-slate-900 transition-colors">
                  Airport Long-Stay Valet
                </Link>
              </li>
              <li>
                <Link href="/parking-zones" className="hover:text-slate-900 transition-colors">
                  Ultra-Fast DC Charging
                </Link>
              </li>
              <li>
                <Link href="/parking-zones" className="hover:text-slate-900 transition-colors">
                  Retail Hub Optimization
                </Link>
              </li>
              <li>
                <Link href="/parking-zones" className="hover:text-slate-900 transition-colors">
                  Corporate Fleet Bays
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Driver Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Driver Support
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500">
              <li>
                <Link href="/parking-zones" className="hover:text-slate-900 transition-colors">
                  Charger Compatibility
                </Link>
              </li>
              <li>
                <Link href="/parking-zones" className="hover:text-slate-900 transition-colors">
                  Live Occupancy Map
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-900 transition-colors">
                  Tariffs & Billing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-900 transition-colors">
                  24/7 Stalls Dispatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Enterprise Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Enterprise Architecture
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Connect terminal access gates, OCPP 2.0.1 charge nodes, and license plate readers.
            </p>
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
              <ShieldCheck className="h-4 w-4 text-[#0d5440]" />
              <span>v4.18 ISO 15118 Compliant</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2025 SpotSync Technologies Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-slate-600 transition-colors">
              Security Whitepaper
            </Link>
            <Link href="/about" className="hover:text-slate-600 transition-colors">
              Privacy Statement
            </Link>
            <Link href="/about" className="hover:text-slate-600 transition-colors">
              API Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
