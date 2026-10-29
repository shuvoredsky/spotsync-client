import { ZoneType } from './zone.types';

export type ReservationStatus = 'active' | 'cancelled' | 'completed';

export interface CreateReservationRequest {
  zone_id: number;
  license_plate: string;
  vehicle_model?: string;
  selected_bay?: string;
  duration_hours?: number;
}

export interface ReservationResponse {
  id: number;
  user_id: number;
  zone_id: number;
  license_plate: string;
  vehicle_model?: string;
  selected_bay?: string;
  duration_hours?: number;
  total_amount?: number;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
}

export interface ZoneInfo {
  id: number;
  name: string;
  type: ZoneType;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

export interface MyReservationResponse {
  id: number;
  license_plate: string;
  vehicle_model?: string;
  selected_bay?: string;
  duration_hours?: number;
  total_amount?: number;
  status: ReservationStatus;
  zone: ZoneInfo;
  created_at: string;
}

export interface AdminReservationResponse {
  id: number;
  license_plate: string;
  vehicle_model?: string;
  selected_bay?: string;
  duration_hours?: number;
  total_amount?: number;
  status: ReservationStatus;
  zone: ZoneInfo;
  user: UserInfo;
  created_at: string;
}
