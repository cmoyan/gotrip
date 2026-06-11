import {
  attractionHongyadong,
  chongqingDestinationDetail,
  chongqingFoods,
  chongqingSpots,
  hotDestinations,
  localRecommendations,
  photoSpots,
  weekendTrips
} from "../mock/destinations";
import { Attraction, DestinationCardData, DestinationDetail } from "../types";
import { mockRequest, requestWithMock } from "./apiClient";

export const destinationService = {
  getDestinations(): Promise<DestinationCardData[]> {
    return requestWithMock("/destinations", hotDestinations);
  },
  getDestinationDetail(id: string): Promise<DestinationDetail> {
    return requestWithMock(`/destinations/${id}`, id === "chongqing" ? chongqingDestinationDetail : chongqingDestinationDetail);
  },
  getLocalRecommendations(): Promise<DestinationCardData[]> {
    return mockRequest(localRecommendations);
  },
  getWeekendTrips(): Promise<DestinationCardData[]> {
    return mockRequest(weekendTrips);
  },
  getHotDestinations(): Promise<DestinationCardData[]> {
    return mockRequest(hotDestinations);
  },
  getChongqingSpots(): Promise<DestinationCardData[]> {
    return mockRequest(chongqingSpots);
  },
  getChongqingFoods(): Promise<DestinationCardData[]> {
    return mockRequest(chongqingFoods);
  },
  getPhotoSpots(): Promise<DestinationCardData[]> {
    return mockRequest(photoSpots);
  },
  getSpotDetail(id: string): Promise<Attraction> {
    return requestWithMock(`/spots/${id}`, id === "hongyadong" ? attractionHongyadong : attractionHongyadong);
  },
  getAttraction(id: string): Promise<Attraction> {
    return this.getSpotDetail(id);
  }
};
