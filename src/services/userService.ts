import { attractionHongyadong, chongqingDestinationDetail, hotDestinations } from "../mock/destinations";
import { communityGuides } from "../mock/guides";
import { shanghaiTrip } from "../mock/trips";
import { appSettings, favoriteItems, userOrders, userProfile } from "../mock/user";
import {
  AppSettings,
  FavoriteItem,
  FavoriteItemType,
  FavoriteResponse,
  SearchResult,
  UserOrder,
  UserProfile
} from "../types";
import { mockRequest, mutateWithMock, requestWithMock } from "./apiClient";

export const userService = {
  getUserProfile(): Promise<UserProfile> {
    return requestWithMock("/user/profile", userProfile);
  },
  getProfile(): Promise<UserProfile> {
    return this.getUserProfile();
  },
  getOrders(): Promise<UserOrder[]> {
    return requestWithMock("/user/orders", userOrders);
  },
  favoriteItem(type: FavoriteItemType, id: string): Promise<FavoriteResponse> {
    return mutateWithMock(`/favorites/${type}/${id}`, { type, id, favorited: true });
  },
  getSearchResults(keyword: string): Promise<SearchResult[]> {
    const normalizedKeyword = keyword.trim();
    const allResults: SearchResult[] = [
      {
        id: chongqingDestinationDetail.id,
        type: "destination",
        title: chongqingDestinationDetail.name,
        subtitle: chongqingDestinationDetail.subtitle,
        image: chongqingDestinationDetail.heroImage
      },
      {
        id: attractionHongyadong.id,
        type: "spot",
        title: attractionHongyadong.name,
        subtitle: attractionHongyadong.tags.join(" · "),
        image: attractionHongyadong.image
      },
      {
        id: shanghaiTrip.id,
        type: "trip",
        title: shanghaiTrip.title,
        subtitle: shanghaiTrip.dateRange,
        image: shanghaiTrip.cover
      },
      ...hotDestinations.map<SearchResult>((item) => ({
        id: item.id,
        type: "destination",
        title: item.name,
        subtitle: item.subtitle,
        image: item.image
      })),
      ...communityGuides.map<SearchResult>((guide) => ({
        id: guide.id,
        type: "guide",
        title: guide.title,
        subtitle: `${guide.author} · ${guide.city}`,
        image: guide.image
      }))
    ];

    const results = normalizedKeyword
      ? allResults.filter((item) => item.title.includes(normalizedKeyword) || item.subtitle.includes(normalizedKeyword))
      : allResults;

    return requestWithMock("/search", results, { query: { keyword } });
  },
  getFavorites(): Promise<FavoriteItem[]> {
    return requestWithMock("/favorites", favoriteItems);
  },
  getSettings(): Promise<AppSettings> {
    return requestWithMock("/settings", appSettings);
  }
};
