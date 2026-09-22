import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zonesService } from "@/services/zones.service";
import { CreateZoneRequest, UpdateZoneRequest } from "@/types/zone.types";
import { toast } from "sonner";

export const ZONE_QUERY_KEYS = {
  all: ["zones"] as const,
  detail: (id: number) => ["zones", id] as const,
};

export function useZones() {
  const queryClient = useQueryClient();

  const zonesQuery = useQuery({
    queryKey: ZONE_QUERY_KEYS.all,
    queryFn: async () => {
      const res = await zonesService.getAll();
      return res.data || [];
    },
    staleTime: 1000 * 30, // 30 seconds
  });

  const useZoneDetail = (id: number) => {
    return useQuery({
      queryKey: ZONE_QUERY_KEYS.detail(id),
      queryFn: async () => {
        const res = await zonesService.getById(id);
        return res.data;
      },
      enabled: !!id && !isNaN(id),
    });
  };

  const createZoneMutation = useMutation({
    mutationFn: (data: CreateZoneRequest) => zonesService.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ZONE_QUERY_KEYS.all });
      toast.success(res.message || "Zone created successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create zone");
    },
  });

  const updateZoneMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateZoneRequest }) =>
      zonesService.update(id, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ZONE_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ZONE_QUERY_KEYS.detail(variables.id) });
      toast.success(res.message || "Zone updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update zone");
    },
  });

  const deleteZoneMutation = useMutation({
    mutationFn: (id: number) => zonesService.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ZONE_QUERY_KEYS.all });
      toast.success(res.message || "Zone deleted successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete zone");
    },
  });

  return {
    zones: zonesQuery.data || [],
    isLoading: zonesQuery.isLoading,
    isError: zonesQuery.isError,
    error: zonesQuery.error,
    refetch: zonesQuery.refetch,
    useZoneDetail,
    createZone: createZoneMutation.mutateAsync,
    isCreating: createZoneMutation.isPending,
    updateZone: updateZoneMutation.mutateAsync,
    isUpdating: updateZoneMutation.isPending,
    deleteZone: deleteZoneMutation.mutateAsync,
    isDeleting: deleteZoneMutation.isPending,
  };
}
