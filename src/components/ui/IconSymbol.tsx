import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { ColorValue } from "react-native";
import { colors } from "../../constants/colors";
import { IconName } from "../../types";

export type ExtraIconName =
  | "home"
  | "home-filled"
  | "pin"
  | "pin-filled"
  | "chat"
  | "chat-filled"
  | "add"
  | "bell"
  | "search"
  | "chevron-right"
  | "chevron-back"
  | "share"
  | "star"
  | "star-filled"
  | "calendar"
  | "time"
  | "walk"
  | "download"
  | "scan"
  | "help"
  | "receipt"
  | "eye"
  | "menu"
  | "info"
  | "lock"
  | "wifi"
  | "globe"
  | "trash";

export type IconSymbolName = IconName | ExtraIconName;
type IoniconName = ComponentProps<typeof Ionicons>["name"];

const iconMap: Record<IconSymbolName, IoniconName> = {
  sparkles: "sparkles",
  wallet: "wallet-outline",
  map: "map-outline",
  ticket: "ticket-outline",
  bed: "bed-outline",
  restaurant: "restaurant-outline",
  car: "car-outline",
  clipboard: "clipboard-outline",
  location: "location-outline",
  camera: "camera-outline",
  train: "train-outline",
  airplane: "airplane-outline",
  heart: "heart-outline",
  person: "person-outline",
  book: "book-outline",
  settings: "settings-outline",
  home: "home-outline",
  "home-filled": "home",
  pin: "location-outline",
  "pin-filled": "location",
  chat: "chatbubble-ellipses-outline",
  "chat-filled": "chatbubble-ellipses",
  add: "add",
  bell: "notifications-outline",
  search: "search-outline",
  "chevron-right": "chevron-forward",
  "chevron-back": "chevron-back",
  share: "share-outline",
  star: "star-outline",
  "star-filled": "star",
  calendar: "calendar-outline",
  time: "time-outline",
  walk: "walk-outline",
  download: "document-text-outline",
  scan: "scan-outline",
  help: "help-circle-outline",
  receipt: "receipt-outline",
  eye: "eye-outline",
  menu: "menu-outline",
  info: "information-circle-outline",
  lock: "lock-closed-outline",
  wifi: "wifi-outline",
  globe: "globe-outline",
  trash: "trash-outline",
};

interface IconSymbolProps {
  name: IconSymbolName;
  size?: number;
  color?: ColorValue;
}

export function IconSymbol({ name, size = 22, color = colors.text }: IconSymbolProps) {
  return <Ionicons name={iconMap[name]} size={size} color={color} />;
}
