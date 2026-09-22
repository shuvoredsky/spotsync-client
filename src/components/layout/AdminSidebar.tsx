"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  DollarSign,
  Layers,
  LayoutGrid,
  Radio,
  Shield,
  Ticket,
  Zap,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleAdminSidebar } from "@/store/slices/uiSlice";

export function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { adminSidebarOpen } = useAppSelector((state) => state.ui);

  const navItems = [
    { href: "/admin", label: "Zone Operations", icon: LayoutGrid, exact: true },
    { href: "/admin/zones", label: "Manage Zones", icon: Layers },
    { href: "/admin/reservations", label: "All Reservations", icon: Ticket },
    { href: "/admin/telemetry", label: "EV Telemetry & Sensors", icon: Zap },
  ];

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out ${
        adminSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100">
        <Link href="/admin" className="flex items-center space-x-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#091e17] text-white">
            <Zap className="h-5 w-5 text-[#00d084]" />
          </div>
          {adminSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 leading-tight">
                Spot<span className="text-[#0d5440]">Sync</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
                OPS CONSOLE
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#091e17] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${active ? "text-[#00d084]" : "text-slate-400"}`} />
              {adminSidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Bottom Live Hub Widget */}
      {adminSidebarOpen ? (
        <div className="p-4 border-t border-slate-100">
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">HUB TERMINAL 2</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900">89% Filled</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full bg-[#00d084] rounded-full" style={{ width: "89%" }}></div>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-xs font-semibold text-[#0d5440] hover:underline pt-1"
            >
              ← Return to Driver App
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-slate-100 flex justify-center">
          <Link href="/dashboard" title="Return to Driver App" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100">
            <Car className="h-5 w-5 text-[#0d5440]" />
          </Link>
        </div>
      )}
    </aside>
  );
}
