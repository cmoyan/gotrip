import { create } from "zustand";
import { TripPreferences } from "../types";

interface TripState {
  preferences: TripPreferences;
  savedRoute: boolean;
  joinedTripIds: string[];
  favoriteTripIds: string[];
  setTransport: (transport: TripPreferences["transport"]) => void;
  setBudget: (budget: TripPreferences["budget"]) => void;
  toggleInterest: (interest: string) => void;
  setHotel: (hotel: TripPreferences["hotel"]) => void;
  setDepartTime: (departTime: string) => void;
  toggleRouteSaved: () => void;
  joinTrip: (tripId: string) => void;
  toggleFavoriteTrip: (tripId: string) => void;
}

export const useTripStore = create<TripState>((set) => ({
  preferences: {
    transport: "高铁",
    budget: "舒适型",
    interests: ["美食", "夜景", "拍照"],
    hotel: "市中心",
    departTime: "上午出发（08:00-11:00）"
  },
  savedRoute: false,
  joinedTripIds: [],
  favoriteTripIds: [],
  setTransport: (transport) =>
    set((state) => ({
      preferences: { ...state.preferences, transport }
    })),
  setBudget: (budget) =>
    set((state) => ({
      preferences: { ...state.preferences, budget }
    })),
  toggleInterest: (interest) =>
    set((state) => {
      const exists = state.preferences.interests.includes(interest);
      const interests = exists
        ? state.preferences.interests.filter((item) => item !== interest)
        : [...state.preferences.interests, interest];
      return { preferences: { ...state.preferences, interests } };
    }),
  setHotel: (hotel) =>
    set((state) => ({
      preferences: { ...state.preferences, hotel }
    })),
  setDepartTime: (departTime) =>
    set((state) => ({
      preferences: { ...state.preferences, departTime }
    })),
  toggleRouteSaved: () => set((state) => ({ savedRoute: !state.savedRoute })),
  joinTrip: (tripId) =>
    set((state) => ({
      joinedTripIds: state.joinedTripIds.includes(tripId)
        ? state.joinedTripIds
        : [...state.joinedTripIds, tripId]
    })),
  toggleFavoriteTrip: (tripId) =>
    set((state) => ({
      favoriteTripIds: state.favoriteTripIds.includes(tripId)
        ? state.favoriteTripIds.filter((id) => id !== tripId)
        : [...state.favoriteTripIds, tripId]
    }))
}));
