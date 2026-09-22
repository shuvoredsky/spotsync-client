import { apiClient } from "./api";
import { ApiResponse } from "@/types/api.types";
import { CreateZoneRequest, ParkingZone, UpdateZoneRequest } from "@/types/zone.types";

export const zonesService = {
  async getAll(): Promise<ApiResponse<ParkingZone[]>> {
    const response = await apiClient.get<ApiResponse<ParkingZone[]>>("/api/v1/zones");
    return response.data;
  },

  async getById(id: number): Promise<ApiResponse<ParkingZone>> {
    const response = await apiClient.get<ApiResponse<ParkingZone>>(`/api/v1/zones/${id}`);
    return response.data;
  },

  async create(data: CreateZoneRequest): Promise<ApiResponse<ParkingZone>> {
    const response = await apiClient.post<ApiResponse<ParkingZone>>("/api/v1/zones", data);
    return response.data;
  },

  async update(id: number, data: UpdateZoneRequest): Promise<ApiResponse<ParkingZone>> {
    const response = await apiClient.put<ApiResponse<ParkingZone>>(`/api/v1/zones/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await apiClient.delete<ApiResponse<null>>(`/api/v1/zones/${id}`);
    return response.data;
  },
};
