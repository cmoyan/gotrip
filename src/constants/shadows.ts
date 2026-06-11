import { Platform, ViewStyle } from "react-native";

export const shadows = {
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#1D4ED8",
      shadowOpacity: 0.06,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 6 }
    },
    android: {
      elevation: 2
    },
    default: {}
  }) ?? {},
  floating: Platform.select<ViewStyle>({
    ios: {
      shadowColor: "#1677FF",
      shadowOpacity: 0.2,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 }
    },
    android: {
      elevation: 9
    },
    default: {}
  }) ?? {}
} as const;
