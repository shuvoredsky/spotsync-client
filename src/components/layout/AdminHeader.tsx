"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedHub, toggleAdminSidebar } from "@/store/slices/uiSlice";
import { HUBS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  Menu,
  Plane,
  Radio,
  User as UserIcon,
} from "lucide-react";

export function AdminHeader() {
  const { user, logout } = useAuth();
  const dispatch = useAppDispatch();
  const { selectedHub } = useAppSelector((state) => state.ui);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => dispatch(toggleAdminSidebar())}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Gateway Sync status pill */}
        <div className="hidden sm:flex items-center space-x-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs">
          <Plane className="h-3.5 w-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">Skyport Central Hub</span>
          <span className="h-1 w-1 rounded-full bg-slate-300"></span>
          <span className="flex items-center gap-1 text-emerald-800 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 animate-pulse"></span>
            Live Gateway Syncing
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Hub Selector Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 border-slate-200 text-xs font-semibold"
            >
              <Plane className="h-3.5 w-3.5 text-slate-500" />
              <span className="max-w-[200px] truncate">{selectedHub}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="text-xs text-slate-500">
              Select Active Airport / Terminal Node
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {HUBS.map((hub) => (
              <DropdownMenuItem
                key={hub.id}
                onClick={() => dispatch(setSelectedHub(hub.name))}
                className={`cursor-pointer text-xs ${
                  selectedHub === hub.name ? "bg-[#e6f7f2] font-bold text-[#0d5440]" : ""
                }`}
              >
                {hub.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-xs font-medium text-slate-600 hover:text-slate-900">
            Driver Portal
          </Button>
        </Link>

        {/* Admin Profile Pill */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 rounded-full border border-slate-200 bg-slate-50 p-1 pr-3 hover:bg-slate-100 transition-all">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#091e17] text-xs font-bold text-[#00d084]">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {user?.name || "Admin"}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Admin Console
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <p className="text-xs font-semibold">{user?.name}</p>
              <p className="text-[11px] text-muted-foreground">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                Switch to Driver View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="text-rose-600 focus:bg-rose-50 cursor-pointer flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
