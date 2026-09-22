import { apiClient } from "./api";
import { ApiResponse } from "@/types/api.types";
import {
  AdminReservationResponse,
  CreateReservationRequest,
  MyReservationResponse,
  ReservationResponse,
} from "@/types/reservation.types";

export const reservationsService = {
  async create(data: CreateReservationRequest): Promise<ApiResponse<ReservationResponse>> {
    const response = await apiClient.post<ApiResponse<ReservationResponse>>("/api/v1/reservations", data);
    return response.data;
  },

  async getMyReservations(): Promise<ApiResponse<MyReservationResponse[]>> {
    const response = await apiClient.get<ApiResponse<MyReservationResponse[]>>(
      "/api/v1/reservations/my-reservations"
    );
    return response.data;
  },

  async getAllReservations(): Promise<ApiResponse<AdminReservationResponse[]>> {
    const response = await apiClient.get<ApiResponse<AdminReservationResponse[]>>("/api/v1/reservations");
    return response.data;
  },

  async cancel(id: number): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/v1/reservations/${id}`);
    return response.data;
  },
};
