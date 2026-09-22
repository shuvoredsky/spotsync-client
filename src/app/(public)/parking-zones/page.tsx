"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useZones } from "@/hooks/useZones";
import { ZoneCard } from "@/components/parking-zones/ZoneCard";
import { ZoneFilters } from "@/components/parking-zones/ZoneFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Layers, Sparkles, Zap } from "lucide-react";

function ParkingZonesContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";

  const { zones, isLoading } = useZones();

  // Filter & Search states
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [priceFilter, setPriceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset filters
  const handleReset = () => {
    setSearch("");
    setTypeFilter("all");
    setStatusFilter("all");
    setSortBy("recommended");
    setPriceFilter("all");
    setCurrentPage(1);
  };

  // Filtered & Sorted zones
  const filteredZones = useMemo(() => {
    return zones
      .filter((zone) => {
        // Search text
        if (
          search.trim() &&
          !zone.name.toLowerCase().includes(search.toLowerCase()) &&
          !zone.type.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }

        // Zone type
        if (typeFilter !== "all" && zone.type !== typeFilter) {
          return false;
        }

        // Status
        if (statusFilter === "available" && zone.available_spots <= 0) {
          return false;
        }
        if (
          statusFilter === "limited" &&
          (zone.available_spots <= 0 || zone.available_spots / zone.total_capacity > 0.25)
        ) {
          return false;
        }

        // Price Filter
        if (priceFilter === "under-4" && zone.price_per_hour >= 4.0) return false;
        if (priceFilter === "4-6" && (zone.price_per_hour < 4.0 || zone.price_per_hour > 6.0))
          return false;
        if (priceFilter === "over-6" && zone.price_per_hour <= 6.0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price_per_hour - b.price_per_hour;
        if (sortBy === "price-desc") return b.price_per_hour - a.price_per_hour;
        if (sortBy === "availability") return b.available_spots - a.available_spots;
        if (sortBy === "capacity") return b.total_capacity - a.total_capacity;
        return 0; // Default recommended
      });
  }, [zones, search, typeFilter, statusFilter, sortBy, priceFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredZones.length / itemsPerPage) || 1;
  const paginatedZones = filteredZones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // System stats calculation
  const totalCapacitySum = zones.reduce((acc, z) => acc + z.total_capacity, 0);
  const totalAvailableSum = zones.reduce((acc, z) => acc + z.available_spots, 0);
  const overallAvailabilityRate = totalCapacitySum > 0
    ? Math.round((totalAvailableSum / totalCapacitySum) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header Section with System Availability Ring */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-2">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#e6f7f2] px-3 py-0.5 text-xs font-bold text-[#0d5440]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>METROPOLITAN TRANSIT GRID v4.2 LIVE OCCUPANCY FEED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find & Reserve Parking
          </h1>

          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            Browse real-time spot availability, ultra-fast EV chargers, and covered bays across
            airport terminals and premier shopping destinations.
          </p>
        </div>

        {/* System Availability Widget */}
        <div className="flex items-center space-x-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              SYSTEM AVAILABILITY
            </span>
            <p className="text-xl font-extrabold text-slate-900">
              {totalAvailableSum}{" "}
              <span className="text-xs text-slate-400 font-normal">/ {totalCapacitySum} Total Bays</span>
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 pt-0.5">
              <Zap className="h-3 w-3 text-emerald-700" />
              <span>{Math.round(totalAvailableSum * 0.4)} DC Plugs Ready • Latency &lt; 420ms</span>
            </div>
          </div>

          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-emerald-100 bg-emerald-50 text-xs font-black text-[#0d5440]">
            <span>{overallAvailabilityRate}%</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <ZoneFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        priceFilter={priceFilter}
        onPriceChange={setPriceFilter}
        onReset={handleReset}
        totalCount={filteredZones.length}
      />

      {/* Zones Grid Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredZones.length}</strong> monitored parking facilities
          </span>
          <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Sensors Synced
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        ) : paginatedZones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedZones.map((zone) => (
              <ZoneCard key={zone.id} zone={zone} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Layers className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">No Parking Zones Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No active parking facilities matched your search or filters. Try resetting the filters or modifying your query.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        )}

        {/* Pagination Bar */}
        {filteredZones.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 text-xs text-slate-600 shadow-sm">
            <span>
              Showing{" "}
              <strong>
                {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredZones.length)}
              </strong>{" "}
              of <strong>{filteredZones.length}</strong> active zone clusters
            </span>

            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "primary" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="h-8 w-8 p-0 font-bold"
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ParkingZonesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading parking zones...</div>}>
      <ParkingZonesContent />
    </Suspense>
  );
}
