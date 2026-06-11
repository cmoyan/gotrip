import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { layout } from "../../constants/layout";
import { spacing } from "../../constants/spacing";
import { IconSymbol } from "../../components/ui/IconSymbol";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          {
            height: layout.tabBarBaseHeight + insets.bottom,
            paddingBottom: Math.max(insets.bottom, spacing.sm)
          }
        ],
        tabBarLabelStyle: styles.label
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "首页",
          tabBarIcon: ({ color, focused }) => <IconSymbol name={focused ? "home-filled" : "home"} color={color} size={25} />
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "地图",
          tabBarIcon: ({ color, focused }) => <IconSymbol name={focused ? "pin-filled" : "pin"} color={color} size={26} />
        }}
      />
      <Tabs.Screen
        name="publish"
        options={{
          title: "",
          tabBarIcon: () => (
            <View style={styles.plusButton}>
              <IconSymbol name="add" color={colors.white} size={38} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "社区",
          tabBarIcon: ({ color, focused }) => <IconSymbol name={focused ? "chat-filled" : "chat"} color={color} size={25} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          tabBarIcon: ({ color }) => <IconSymbol name="person" color={color} size={25} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: "rgba(255,255,255,0.96)",
    ...shadows.floating
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    paddingTop: 1
  },
  plusButton: {
    width: layout.publishButtonSize,
    height: layout.publishButtonSize,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
    ...shadows.floating
  }
});
