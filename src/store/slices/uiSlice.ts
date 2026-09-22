import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyReservationResponse } from "@/types/reservation.types";

interface UIState {
  adminSidebarOpen: boolean;
  selectedHub: string;
  selectedBay: string | null;
  activeGatePassModal: MyReservationResponse | null;
  activeInvoiceModal: MyReservationResponse | null;
  searchFilter: string;
  typeFilter: string;
  statusFilter: string;
  sortBy: string;
}

const initialState: UIState = {
  adminSidebarOpen: true,
  selectedHub: "SFO International Terminal 1 & 2",
  selectedBay: null,
  activeGatePassModal: null,
  activeInvoiceModal: null,
  searchFilter: "",
  typeFilter: "all",
  statusFilter: "all",
  sortBy: "recommended",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleAdminSidebar: (state) => {
      state.adminSidebarOpen = !state.adminSidebarOpen;
    },
    setAdminSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.adminSidebarOpen = action.payload;
    },
    setSelectedHub: (state, action: PayloadAction<string>) => {
      state.selectedHub = action.payload;
    },
    setSelectedBay: (state, action: PayloadAction<string | null>) => {
      state.selectedBay = action.payload;
    },
    setActiveGatePassModal: (
      state,
      action: PayloadAction<MyReservationResponse | null>
    ) => {
      state.activeGatePassModal = action.payload;
    },
    setActiveInvoiceModal: (
      state,
      action: PayloadAction<MyReservationResponse | null>
    ) => {
      state.activeInvoiceModal = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.searchFilter = "";
      state.typeFilter = "all";
      state.statusFilter = "all";
      state.sortBy = "recommended";
    },
  },
});

export const {
  toggleAdminSidebar,
  setAdminSidebarOpen,
  setSelectedHub,
  setSelectedBay,
  setActiveGatePassModal,
  setActiveInvoiceModal,
  setSearchFilter,
  setTypeFilter,
  setStatusFilter,
  setSortBy,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
