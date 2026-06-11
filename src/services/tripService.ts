import { hotDestinations, localRecommendations, routeNodes, weekendTrips } from "../mock/destinations";
import { popularGuides } from "../mock/guides";
import { homeFeatures, shanghaiTrip, travelOptions } from "../mock/trips";
import { AiTripPlanPayload, FeatureEntry, HomeFeed, RouteNode, SaveTripResponse, TravelOption, Trip } from "../types";
import { mockMutation, mockRequest, mutateWithMock, requestWithMock } from "./apiClient";

export const tripService = {
  getHomeFeed(): Promise<HomeFeed> {
    return requestWithMock("/home/feed", {
      features: homeFeatures,
      localRecommendations,
      popularGuides,
      weekendTrips,
      hotDestinations
    });
  },
  getHomeFeatures(): Promise<FeatureEntry[]> {
    return mockRequest(homeFeatures);
  },
  getTripDetail(id = shanghaiTrip.id): Promise<Trip> {
    return requestWithMock(`/trips/${id}`, shanghaiTrip);
  },
  getTravelOptions(): Promise<TravelOption[]> {
    return mockRequest(travelOptions);
  },
  getRouteNodes(): Promise<RouteNode[]> {
    return mockRequest(routeNodes);
  },
  createAiTripPlan(payload: AiTripPlanPayload): Promise<Trip> {
    return mutateWithMock("/trips/ai-plan", shanghaiTrip, {
      body: payload,
      delayMs: 1000
    });
  },
  saveTrip(id: string): Promise<SaveTripResponse> {
    return mutateWithMock(`/trips/${id}/save`, { id, saved: true });
  },
  generateTrip(): Promise<Trip> {
    return mockMutation(shanghaiTrip, 1000);
  }
};
