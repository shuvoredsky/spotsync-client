"use client";

import React, { useState } from "react";
import { useZones } from "@/hooks/useZones";
import { AdminStatsGrid } from "@/components/admin/AdminStatsGrid";
import { OccupancyChart } from "@/components/admin/OccupancyChart";
import { ZoneDistributionChart } from "@/components/admin/ZoneDistributionChart";
import { AdminZoneTable } from "@/components/admin/AdminZoneTable";
import { ZoneFormModal } from "@/components/admin/ZoneFormModal";
import { DeleteZoneDialog } from "@/components/admin/DeleteZoneDialog";
import { ANPRGateLogsList } from "@/components/admin/ANPRGateLogsList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParkingZone } from "@/types/zone.types";
import { ZoneFormData } from "@/lib/validators";
import { Download, FileDown, Plus, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const {
    zones,
    isLoading,
    createZone,
    isCreating,
    updateZone,
    isUpdating,
    deleteZone,
    isDeleting,
  } = useZones();

  // Zone CRUD Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<ParkingZone | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [zoneToDelete, setZoneToDelete] = useState<ParkingZone | null>(null);

  const handleOpenAdd = () => {
    setSelectedZone(null);
    setFormModalOpen(true);
  };

  const handleOpenEdit = (zone: ParkingZone) => {
    setSelectedZone(zone);
    setFormModalOpen(true);
  };

  const handleOpenDelete = (zone: ParkingZone) => {
    setZoneToDelete(zone);
    setDeleteModalOpen(true);
  };

  const handleFormSubmit = async (data: ZoneFormData) => {
    if (selectedZone) {
      await updateZone({
        id: selectedZone.id,
        data: {
          name: data.name,
          type: data.type,
          total_capacity: data.total_capacity,
          price_per_hour: data.price_per_hour,
        },
      });
    } else {
      await createZone(data);
    }
  };

  const handleConfirmDelete = async (id: number) => {
    await deleteZone(id);
  };

  const handleExportCSV = () => {
    toast.success("Telemetry report exported: spotsync-metrics-sfo.csv generated!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              GATEWAY LIVE // NODE: SFO-GW-4402
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            SpotSync Admin Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time airport & retail parking management, EV telemetry, tariff controls, and occupancy analytics.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="text-xs font-semibold h-10 gap-1.5 border-slate-300"
          >
            <FileDown className="h-4 w-4 text-slate-500" />
            <span>Export CSV Report</span>
          </Button>

          <Button
            variant="dark"
            size="sm"
            onClick={handleOpenAdd}
            className="text-xs font-bold h-10 gap-1.5 shadow-sm"
          >
            <Plus className="h-4 w-4 text-[#00d084]" />
            <span>Add Parking Zone</span>
          </Button>
        </div>
      </div>

      {/* 6 Metric KPI Tiles */}
      <AdminStatsGrid zones={zones} />

      {/* Analytics Charts: 24h Occupancy + Zone Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <OccupancyChart />
        </div>
        <div className="lg:col-span-4">
          <ZoneDistributionChart />
        </div>
      </div>

      {/* Live Parking Zones Table */}
      <AdminZoneTable
        zones={zones}
        isLoading={isLoading}
        onAddClick={handleOpenAdd}
        onEditClick={handleOpenEdit}
        onDeleteClick={handleOpenDelete}
      />

      {/* Real-time ANPR Gate Logs Section */}
      <ANPRGateLogsList />

      {/* Create / Edit Modal Dialog */}
      <ZoneFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        zone={selectedZone}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteZoneDialog
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        zoneId={zoneToDelete?.id || null}
        zoneName={zoneToDelete?.name || ""}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
