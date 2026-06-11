import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "../components/layout/Screen";
import { Header } from "../components/layout/Header";
import { AppText } from "../components/ui/AppText";
import { Card } from "../components/ui/Card";
import { IconSymbol, IconSymbolName } from "../components/ui/IconSymbol";
import { colors } from "../constants/colors";
import { radius } from "../constants/radius";
import { shadows } from "../constants/shadows";
import { spacing } from "../constants/spacing";
import { showToast } from "../utils/toast";

interface ToolItem {
  label: string;
  icon: IconSymbolName;
  route?: string;
  badge?: string;
}

const quickTools: ToolItem[] = [
  { label: "AI 行程定制", icon: "sparkles", route: "/ai-planner" },
  { label: "预算助手", icon: "wallet" },
  { label: "地图路线", icon: "map", route: "/map" },
];

const myTools: ToolItem[] = [
  { label: "我的收藏", icon: "star" },
  { label: "我的订单", icon: "receipt" },
  { label: "足迹地图", icon: "location" },
];

const supportTools: ToolItem[] = [
  { label: "客服中心", icon: "help" },
  { label: "帮助与反馈", icon: "chat" },
  { label: "关于 GoTrip", icon: "info" },
  { label: "设置", icon: "settings", route: "/settings" },
];

export default function SideDrawerScreen() {
  return (
    <Screen bottomSpace={32}>
      <Header title="快捷工具" />

      <AppText variant="subtitle" style={styles.sectionTitle}>
        常用工具
      </AppText>
      <Card style={styles.groupCard}>
        {quickTools.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => {
              if (item.route) {
                router.push(item.route as any);
              } else {
                showToast(`${item.label} 暂未开放`);
              }
            }}
            style={({ pressed }) => [
              styles.toolRow,
              pressed ? styles.pressed : null,
              index < quickTools.length - 1 ? styles.borderBottom : null,
            ]}
          >
            <View style={styles.toolLeft}>
              <View style={styles.iconBox}>
                <IconSymbol name={item.icon} size={22} color={colors.primary} />
              </View>
              <AppText variant="bodyLarge">{item.label}</AppText>
            </View>
            <View style={styles.toolRight}>
              {item.badge ? (
                <View style={styles.badge}>
                  <AppText variant="caption" color={colors.white}>
                    {item.badge}
                  </AppText>
                </View>
              ) : null}
              <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
            </View>
          </Pressable>
        ))}
      </Card>

      <AppText variant="subtitle" style={styles.sectionTitle}>
        我的工具
      </AppText>
      <Card style={styles.groupCard}>
        {myTools.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => {
              if (item.route) {
                router.push(item.route as any);
              } else {
                showToast(`${item.label} 暂未开放`);
              }
            }}
            style={({ pressed }) => [
              styles.toolRow,
              pressed ? styles.pressed : null,
              index < myTools.length - 1 ? styles.borderBottom : null,
            ]}
          >
            <View style={styles.toolLeft}>
              <View style={styles.iconBox}>
                <IconSymbol name={item.icon} size={22} color={colors.orange} />
              </View>
              <AppText variant="bodyLarge">{item.label}</AppText>
            </View>
            <View style={styles.toolRight}>
              <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
            </View>
          </Pressable>
        ))}
      </Card>

      <AppText variant="subtitle" style={styles.sectionTitle}>
        服务与支持
      </AppText>
      <Card style={styles.groupCard}>
        {supportTools.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => {
              if (item.route) {
                router.push(item.route as any);
              } else {
                showToast(`${item.label} 暂未开放`);
              }
            }}
            style={({ pressed }) => [
              styles.toolRow,
              pressed ? styles.pressed : null,
              index < supportTools.length - 1 ? styles.borderBottom : null,
            ]}
          >
            <View style={styles.toolLeft}>
              <View style={styles.iconBox}>
                <IconSymbol name={item.icon} size={22} color={colors.textSecondary} />
              </View>
              <AppText variant="bodyLarge">{item.label}</AppText>
            </View>
            <View style={styles.toolRight}>
              <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
            </View>
          </Pressable>
        ))}
      </Card>

      <View style={styles.footer}>
        <AppText variant="caption" color={colors.textMuted}>
          GoTrip v1.0.0
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
  },
  toolRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  toolLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  toolRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    backgroundColor: colors.red,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  pressed: {
    opacity: 0.72,
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.xxxl,
    marginBottom: spacing.xl,
  },
});
