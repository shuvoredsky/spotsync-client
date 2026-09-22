import { apiClient } from "./api";
import { ApiResponse } from "@/types/api.types";

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  content_type: string;
}

export const uploadService = {
  uploadImage: async (file: File): Promise<ApiResponse<UploadResponse>> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post<ApiResponse<UploadResponse>>("/api/v1/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
