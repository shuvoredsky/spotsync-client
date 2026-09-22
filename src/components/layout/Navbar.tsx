"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
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
  Car,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Ticket,
  User as UserIcon,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/parking-zones", label: "Parking Zones" },
    { href: "/about", label: "About" },
  ];

  if (isAuthenticated) {
    navLinks.push({ href: "/dashboard", label: "Dashboard" });
    navLinks.push({ href: "/my-reservations", label: "My Reservations" });
  }

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#091e17] text-white shadow-sm transition-transform group-hover:scale-105">
            <div className="relative">
              <Zap className="h-5 w-5 text-[#00d084]" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d084] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d084]"></span>
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Spot<span className="text-[#0d5440]">Sync</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  active
                    ? "bg-[#e6f7f2] text-[#0d5440] font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center space-x-3">
          {isAdmin && (
            <Link href="/admin">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-300 bg-emerald-50/50 text-[#0d5440] hover:bg-emerald-100 hover:text-[#0b4636] font-semibold text-xs gap-1.5 shadow-sm"
              >
                <ShieldCheck className="h-4 w-4 text-[#0d5440]" />
                ADMIN PORTAL
              </Button>
            </Link>
          )}

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2.5 rounded-full border border-slate-200 bg-white p-1 pr-3 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0d5440]/20 transition-all">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0d5440] text-xs font-bold text-white uppercase">
                    {user.name?.charAt(0) || "U"}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-slate-800 leading-tight">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize leading-tight">
                      {user.role === "admin" ? "Admin Ops" : "EV Driver"}
                    </p>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    <div className="pt-1">
                      <Badge variant={user.role === "admin" ? "active" : "ev"}>
                        {user.role === "admin" ? "System Admin" : "Gold Member Driver"}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Driver Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-reservations" className="flex items-center gap-2 cursor-pointer">
                    <Ticket className="h-4 w-4" />
                    <span>My Reservations</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/parking-zones" className="flex items-center gap-2 cursor-pointer">
                    <Car className="h-4 w-4" />
                    <span>Find Parking</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2 cursor-pointer text-[#0d5440] font-medium">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Admin Operations</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="font-medium text-slate-700 hover:text-slate-900">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" className="shadow-sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-base font-medium rounded-lg ${
                  isActive(link.href)
                    ? "bg-[#e6f7f2] text-[#0d5440] font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            {isAdmin && (
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start text-[#0d5440] border-emerald-300 bg-emerald-50">
                  <ShieldCheck className="h-4 w-4 mr-2" /> Admin Operations Console
                </Button>
              </Link>
            )}

            {isAuthenticated ? (
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
