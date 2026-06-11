export type IconName =
  | "sparkles"
  | "wallet"
  | "map"
  | "ticket"
  | "bed"
  | "restaurant"
  | "car"
  | "clipboard"
  | "location"
  | "camera"
  | "train"
  | "airplane"
  | "heart"
  | "person"
  | "book"
  | "settings";

export interface FeatureEntry {
  id: string;
  title: string;
  icon: IconName;
  badge?: string;
  accent?: "blue" | "orange" | "green" | "purple";
}

export interface DestinationCardData {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  tag?: string;
  rating?: number;
  visitedText?: string;
  distance?: string;
}

export interface Guide {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  tag: string;
  likes: number;
  views?: string;
  summary: string;
  city: string;
  height?: number;
}

export interface TimelineStop {
  time: string;
  title: string;
  description: string;
}

export interface TripDay {
  day: string;
  title: string;
  image: string;
  distanceKm: number;
  foodCost: number;
  checkins: number;
  stops: TimelineStop[];
}

export interface BudgetItem {
  id: string;
  label: string;
  amount: number;
  percent: number;
  color: string;
  icon: IconName;
}

export interface Booking {
  id: string;
  type: "train" | "hotel" | "ticket";
  title: string;
  detail: string;
  status: string;
}

export interface Trip {
  id: string;
  title: string;
  dateRange: string;
  companion: string;
  travelStyle: string;
  cover: string;
  totalBudget: number;
  days: TripDay[];
  budget: BudgetItem[];
  bookings: Booking[];
}

export interface RouteNode {
  id: string;
  name: string;
  label?: string;
  image: string;
  x: number;
  y: number;
  type: "start" | "end" | "spot" | "food" | "photo" | "hotel";
}

export interface TravelOption {
  id: string;
  type: "rail" | "flight";
  fromTime: string;
  toTime: string;
  fromStation: string;
  toStation: string;
  code: string;
  duration: string;
  price: number;
}

export interface Attraction {
  id: string;
  name: string;
  rating: number;
  address: string;
  openTime: string;
  image: string;
  tags: string[];
  bestTime: string;
  warning: string[];
  photoSpots: DestinationCardData[];
  foods: DestinationCardData[];
}

export interface UserProfile {
  nickname: string;
  level: string;
  avatar: string;
  following: string;
  followers: string;
  likes: string;
  footprintCities: number;
  distance: string;
  walletBalance: number;
  coupons: number;
  income: number;
  points: number;
}

export interface TripPreferences {
  transport: "高铁" | "飞机" | "自驾";
  budget: "经济型" | "舒适型" | "轻奢型";
  interests: string[];
  hotel: "市中心" | "景区附近" | "高性价比";
  departTime: string;
}

export interface HomeFeed {
  features: FeatureEntry[];
  localRecommendations: DestinationCardData[];
  popularGuides: Guide[];
  weekendTrips: DestinationCardData[];
  hotDestinations: DestinationCardData[];
}

export interface DestinationDetail {
  id: string;
  name: string;
  subtitle: string;
  heroImage: string;
  tags: string[];
  route: {
    title: string;
    subtitle: string;
    image: string;
    steps: string[];
  };
  spots: DestinationCardData[];
  foods: DestinationCardData[];
  photoSpots: DestinationCardData[];
  budget: {
    economy: string;
    comfort: string;
    premium: string;
    recommended: string;
  };
}

export interface AiTripPlanPayload {
  fromCity: string;
  toCity: string;
  dateRange: string;
  people: number;
  preferences: TripPreferences;
}

export interface SaveTripResponse {
  id: string;
  saved: boolean;
}

export type FavoriteItemType = "destination" | "spot" | "guide" | "trip";

export interface FavoriteResponse {
  type: FavoriteItemType;
  id: string;
  favorited: boolean;
}

export interface CommunityFeedParams {
  channel?: string;
  filter?: string;
  keyword?: string;
}

export interface CommunityFeed {
  items: Guide[];
}

export interface UserOrder {
  id: string;
  title: string;
  status: string;
  amount: number;
  date: string;
}

export interface SearchResult {
  id: string;
  type: "destination" | "spot" | "guide" | "trip";
  title: string;
  subtitle: string;
  image?: string;
}

export interface FavoriteItem {
  id: string;
  type: FavoriteItemType;
  title: string;
  subtitle: string;
  image?: string;
}

export interface AppSettings {
  notificationEnabled: boolean;
  privateMode: boolean;
  currency: "CNY";
  language: "zh-CN";
}
