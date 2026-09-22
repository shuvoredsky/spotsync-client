export type ZoneType = 'general' | 'ev_charging' | 'covered';

export interface ParkingZone {
  id: number;
  name: string;
  type: ZoneType;
  total_capacity: number;
  available_spots: number;
  price_per_hour: number;
  created_at: string;
}

export interface CreateZoneRequest {
  name: string;
  type: ZoneType;
  total_capacity: number;
  price_per_hour: number;
}

export interface UpdateZoneRequest {
  name?: string;
  type?: ZoneType;
  total_capacity?: number;
  price_per_hour?: number;
}
