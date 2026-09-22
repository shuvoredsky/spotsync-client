import { apiClient } from "./api";
import { ApiResponse } from "@/types/api.types";
import { LoginRequest, LoginResponse, RegisterRequest, UserResponse } from "@/types/auth.types";

export const authService = {
  async register(data: RegisterRequest): Promise<ApiResponse<UserResponse>> {
    const response = await apiClient.post<ApiResponse<UserResponse>>("/api/v1/auth/register", data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>("/api/v1/auth/login", data);
    return response.data;
  },
};
