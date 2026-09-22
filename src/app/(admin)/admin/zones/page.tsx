"use client";

import React, { useState } from "react";
import { useZones } from "@/hooks/useZones";
import { AdminZoneTable } from "@/components/admin/AdminZoneTable";
import { ZoneFormModal } from "@/components/admin/ZoneFormModal";
import { DeleteZoneDialog } from "@/components/admin/DeleteZoneDialog";
import { ParkingZone } from "@/types/zone.types";
import { ZoneFormData } from "@/lib/validators";

export default function AdminZonesPage() {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Parking Zones Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Create, calibrate, edit, and decommission parking facilities and high-power EV charging hubs.
        </p>
      </div>

      <AdminZoneTable
        zones={zones}
        isLoading={isLoading}
        onAddClick={handleOpenAdd}
        onEditClick={handleOpenEdit}
        onDeleteClick={handleOpenDelete}
      />

      <ZoneFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        zone={selectedZone}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />

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
