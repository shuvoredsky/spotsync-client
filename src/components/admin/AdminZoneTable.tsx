"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ParkingZone } from "@/types/zone.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatZoneType } from "@/lib/utils";
import {
  Edit3,
  ExternalLink,
  Plus,
  Search,
  Trash2,
  Video,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface AdminZoneTableProps {
  zones: ParkingZone[];
  isLoading: boolean;
  onEditClick: (zone: ParkingZone) => void;
  onDeleteClick: (zone: ParkingZone) => void;
  onAddClick: () => void;
}

export function AdminZoneTable({
  zones,
  isLoading,
  onEditClick,
  onDeleteClick,
  onAddClick,
}: AdminZoneTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredZones = zones.filter((zone) => {
    if (
      search.trim() &&
      !zone.name.toLowerCase().includes(search.toLowerCase()) &&
      !zone.id.toString().includes(search)
    ) {
      return false;
    }

    if (typeFilter !== "all" && zone.type !== typeFilter) {
      return false;
    }

    if (statusFilter === "available" && zone.available_spots <= 0) return false;
    if (statusFilter === "full" && zone.available_spots > 0) return false;

    return true;
  });

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Live Parking Zones
          </h3>
          <p className="text-xs text-slate-500">
            Real-time inventory thresholds, bay availability telemetry, and hourly tariff dynamic controls.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative min-w-[220px] flex-1 sm:flex-none">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search zone name or ID..."
              className="pl-9 h-10 text-xs bg-slate-50"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                typeFilter === "all" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("general")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                typeFilter === "general" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"
              }`}
            >
              General
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("ev_charging")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                typeFilter === "ev_charging" ? "bg-[#0d5440] text-white shadow-sm" : "text-slate-600"
              }`}
            >
              EV
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("covered")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                typeFilter === "covered" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600"
              }`}
            >
              Covered
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onAddClick}
            className="font-bold gap-1.5 h-10 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Parking Zone</span>
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ZONE DETAILS</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>CAPACITY</TableHead>
              <TableHead>AVAILABLE BAYS</TableHead>
              <TableHead>RATE / HR</TableHead>
              <TableHead>OPERATIONAL STATUS</TableHead>
              <TableHead className="text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                  Loading live parking zones...
                </TableCell>
              </TableRow>
            ) : filteredZones.length > 0 ? (
              filteredZones.map((zone) => {
                const isEV = zone.type === "ev_charging";
                const isCovered = zone.type === "covered";
                const isFull = zone.available_spots <= 0;
                const ratio = Math.round(
                  (zone.available_spots / (zone.total_capacity || 1)) * 100
                );

                const getPrefix = () => {
                  if (isEV) return "⚡";
                  if (isCovered) return "M-DB";
                  return "T1-G";
                };

                return (
                  <TableRow key={zone.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-black text-xs ${
                            isEV
                              ? "bg-teal-100 text-teal-800"
                              : isCovered
                              ? "bg-slate-100 text-slate-700"
                              : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          {getPrefix()}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900 leading-tight">
                            {zone.name}
                          </p>
                          <p className="text-[11px] text-slate-400 leading-tight">
                            {isEV ? "Row 3-4 // 150kW CCS" : "Deck // Level 2"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={isEV ? "ev" : isCovered ? "secondary" : "outline"}
                        className="text-[11px] font-semibold"
                      >
                        {formatZoneType(zone.type)}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-bold text-xs text-slate-900">
                      {zone.total_capacity} Spots
                    </TableCell>

                    <TableCell>
                      <div className="flex items-baseline space-x-1.5">
                        <span
                          className={`font-extrabold text-xs ${
                            isFull
                              ? "text-rose-600"
                              : ratio < 30
                              ? "text-amber-600"
                              : "text-emerald-800"
                          }`}
                        >
                          {zone.available_spots} Bays
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ({isFull ? "Full" : `${ratio}%`})
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="font-mono font-bold text-xs text-slate-900">
                      {formatCurrency(zone.price_per_hour)}
                    </TableCell>

                    <TableCell>
                      {isFull ? (
                        <Badge variant="full" className="text-[11px]">
                          ● Full
                        </Badge>
                      ) : ratio < 30 ? (
                        <Badge variant="limited" className="text-[11px]">
                          ● Limited
                        </Badge>
                      ) : (
                        <Badge variant="available" className="text-[11px]">
                          Active / Available
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditClick(zone)}
                          title="Edit Zone"
                          className="h-8 w-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>

                        <Link href={`/parking-zones/${zone.id}`} target="_blank">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Preview Public Page"
                            className="h-8 w-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info(`Streaming optical CCTV feed for ${zone.name}`)}
                          title="Sensor & CCTV Stream"
                          className="h-8 w-8 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        >
                          <Video className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteClick(zone)}
                          title="Delete Zone"
                          className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-slate-500 text-xs">
                  No parking zones match your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
        <span>
          Showing <strong>{filteredZones.length}</strong> of <strong>{zones.length}</strong> managed zones across airport terminals
        </span>
      </div>
    </div>
  );
}
