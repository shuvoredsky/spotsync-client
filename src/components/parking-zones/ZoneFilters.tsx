"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Car,
  Home,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Wifi,
  Zap,
} from "lucide-react";

interface ZoneFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  priceFilter: string;
  onPriceChange: (value: string) => void;
  onReset: () => void;
  totalCount: number;
}

export function ZoneFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  priceFilter,
  onPriceChange,
  onReset,
  totalCount,
}: ZoneFiltersProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm">
      {/* Top Search & Dropdown Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search input */}
        <div className="relative md:col-span-6 lg:col-span-6">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by terminal, mall entrance, or zone name..."
            className="pl-10 h-11 bg-slate-50 border-slate-200 text-slate-900 focus-visible:bg-white"
          />
        </div>

        {/* Price Dropdown */}
        <div className="md:col-span-3 lg:col-span-3">
          <Select value={priceFilter} onValueChange={onPriceChange}>
            <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
              <SelectValue placeholder="Price: Any Tariff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Price: Any Tariff</SelectItem>
              <SelectItem value="under-4">Under $4.00 / hr</SelectItem>
              <SelectItem value="4-6">$4.00 - $6.00 / hr</SelectItem>
              <SelectItem value="over-6">Over $6.00 / hr</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-3 lg:col-span-3">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
              <SelectValue placeholder="Sort: Recommended" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Sort: Recommended</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="availability">Most Available Spots</SelectItem>
              <SelectItem value="capacity">Total Capacity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Pills & Status Row */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2 border-t border-slate-100">
        {/* Zone Type Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            ZONE TYPE:
          </span>

          <button
            type="button"
            onClick={() => onTypeChange("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              typeFilter === "all"
                ? "bg-[#091e17] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Zones
          </button>

          <button
            type="button"
            onClick={() => onTypeChange("ev_charging")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              typeFilter === "ev_charging"
                ? "bg-[#0d5440] text-white shadow-sm"
                : "bg-teal-50 text-teal-800 hover:bg-teal-100"
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-[#00d084]" />
            <span>EV Charging</span>
          </button>

          <button
            type="button"
            onClick={() => onTypeChange("covered")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              typeFilter === "covered"
                ? "bg-[#0d5440] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Home className="h-3.5 w-3.5 text-slate-500" />
            <span>Covered</span>
          </button>

          <button
            type="button"
            onClick={() => onTypeChange("general")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              typeFilter === "general"
                ? "bg-[#0d5440] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Car className="h-3.5 w-3.5 text-slate-500" />
            <span>General</span>
          </button>
        </div>

        {/* Status Filter Pills & Sensor live status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1 text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-400 mr-1">
              STATUS:
            </span>
            <button
              type="button"
              onClick={() => onStatusChange("all")}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-slate-900 text-white font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => onStatusChange("available")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "available"
                  ? "bg-emerald-100 text-emerald-800 font-bold"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
              Available Only
            </button>
            <button
              type="button"
              onClick={() => onStatusChange("limited")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                statusFilter === "limited"
                  ? "bg-amber-100 text-amber-800 font-bold"
                  : "text-amber-700 hover:bg-amber-50"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
              Limited
            </button>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sensors Synced
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-7 text-xs text-slate-500 hover:text-slate-800 px-2"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
