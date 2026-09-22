import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reservationsService } from "@/services/reservations.service";
import { CreateReservationRequest } from "@/types/reservation.types";
import { ZONE_QUERY_KEYS } from "./useZones";
import { toast } from "sonner";

export const RESERVATION_QUERY_KEYS = {
  my: ["reservations", "my"] as const,
  all: ["reservations", "all"] as const,
};

export function useReservations(isAuthenticated: boolean = false, isAdmin: boolean = false) {
  const queryClient = useQueryClient();

  const myReservationsQuery = useQuery({
    queryKey: RESERVATION_QUERY_KEYS.my,
    queryFn: async () => {
      const res = await reservationsService.getMyReservations();
      return res.data || [];
    },
    enabled: isAuthenticated,
    staleTime: 1000 * 20, // 20s
  });

  const allReservationsQuery = useQuery({
    queryKey: RESERVATION_QUERY_KEYS.all,
    queryFn: async () => {
      const res = await reservationsService.getAllReservations();
      return res.data || [];
    },
    enabled: isAuthenticated && isAdmin,
    staleTime: 1000 * 20,
  });

  const createReservationMutation = useMutation({
    mutationFn: (data: CreateReservationRequest) => reservationsService.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.my });
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ZONE_QUERY_KEYS.all });
      toast.success(res.message || "Reservation confirmed successfully!");
    },
    onError: (err: any) => {
      if (err.response?.status === 409) {
        toast.error("Zone Full: This parking zone has reached maximum capacity!");
      } else {
        toast.error(err.response?.data?.message || "Failed to create reservation");
      }
    },
  });

  const cancelReservationMutation = useMutation({
    mutationFn: (id: number) => reservationsService.cancel(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.my });
      queryClient.invalidateQueries({ queryKey: RESERVATION_QUERY_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ZONE_QUERY_KEYS.all });
      toast.success(res.message || "Reservation cancelled successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to cancel reservation");
    },
  });

  return {
    myReservations: myReservationsQuery.data || [],
    isLoadingMy: myReservationsQuery.isLoading,
    allReservations: allReservationsQuery.data || [],
    isLoadingAll: allReservationsQuery.isLoading,
    refetchMy: myReservationsQuery.refetch,
    refetchAll: allReservationsQuery.refetch,
    createReservation: createReservationMutation.mutateAsync,
    isCreating: createReservationMutation.isPending,
    cancelReservation: cancelReservationMutation.mutateAsync,
    isCancelling: cancelReservationMutation.isPending,
  };
}
