import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ReactNode, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "../components/ui/AppButton";
import { AppText } from "../components/ui/AppText";
import { Card } from "../components/ui/Card";
import { Chip } from "../components/ui/Chip";
import { IconSymbol, IconSymbolName } from "../components/ui/IconSymbol";
import { Header } from "../components/layout/Header";
import { Screen } from "../components/layout/Screen";
import { colors } from "../constants/colors";
import { images } from "../constants/images";
import { radius } from "../constants/radius";
import { spacing } from "../constants/spacing";
import { tripService } from "../services/tripService";
import { useTripStore } from "../store/useTripStore";
import { formatCurrency } from "../utils/format";

const transports = ["高铁", "飞机", "自驾"] as const;
const budgets = ["经济型", "舒适型", "轻奢型"] as const;
const interests = ["美食", "夜景", "拍照", "文化", "小众", "亲子"];
const hotels = ["市中心", "景区附近", "高性价比"] as const;

export default function AiPlannerScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const preferences = useTripStore((state) => state.preferences);
  const setTransport = useTripStore((state) => state.setTransport);
  const setBudget = useTripStore((state) => state.setBudget);
  const toggleInterest = useTripStore((state) => state.toggleInterest);
  const setHotel = useTripStore((state) => state.setHotel);

  async function handleGenerate() {
    setLoading(true);
    await tripService.generateTrip();
    setLoading(false);
    router.push("/trip-detail");
  }

  return (
    <View style={styles.root}>
      <Screen bottomSpace={170}>
        <Header title="AI行程定制" rightLabel="智能生成" rightIcon="sparkles" />

        <Card padded={false} style={styles.routeCard}>
          <Image source={{ uri: images.mapLight }} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={["rgba(255,255,255,0.98)", "rgba(255,255,255,0.76)", "rgba(255,255,255,0.25)"]} style={StyleSheet.absoluteFill} />
          <View style={styles.routeContent}>
            <View style={styles.cityRow}>
              <AppText variant="hero">上海</AppText>
              <View style={styles.swap}>
                <IconSymbol name="chevron-right" color={colors.primary} size={22} />
              </View>
              <AppText variant="hero">重庆</AppText>
            </View>
            <View style={styles.locationPill}>
              <IconSymbol name="location" color={colors.primary} size={18} />
              <AppText variant="bodyLarge">中国 · 重庆</AppText>
              <IconSymbol name="chevron-right" color={colors.textMuted} size={16} />
            </View>
            <AppText variant="bodyLarge" color={colors.textSecondary}>
              山城火锅 · 魔幻夜景 · 巴渝文化
            </AppText>
          </View>
        </Card>

        <PlannerRow icon="calendar" title="出行日期" trailing="5月20日 - 5月22日" />
        <PlannerRow icon="person" title="出行人数" trailing="2成人" />
        <OptionSection icon="car" title="交通偏好">
          {transports.map((item) => (
            <Chip key={item} label={item} selected={preferences.transport === item} onPress={() => setTransport(item)} />
          ))}
        </OptionSection>
        <OptionSection icon="wallet" title="预算区间">
          {budgets.map((item) => (
            <Chip key={item} label={item} selected={preferences.budget === item} onPress={() => setBudget(item)} />
          ))}
        </OptionSection>
        <OptionSection icon="heart" title="兴趣偏好" helper="可多选，AI将为你推荐更匹配的行程体验">
          {interests.map((item) => (
            <Chip key={item} label={item} selected={preferences.interests.includes(item)} onPress={() => toggleInterest(item)} compact />
          ))}
        </OptionSection>
        <OptionSection icon="bed" title="住宿偏好">
          {hotels.map((item) => (
            <Chip key={item} label={item} selected={preferences.hotel === item} onPress={() => setHotel(item)} />
          ))}
        </OptionSection>
        <PlannerRow icon="time" title="出发时间偏好" trailing={preferences.departTime} />

        <Card style={styles.tip}>
          <View style={styles.tipText}>
            <AppText variant="subtitle" color={colors.primary}>
              智能小贴士
            </AppText>
            <AppText variant="body" color={colors.textSecondary}>
              根据历史数据分析，重庆3天2晚更适合首次游玩，时间松紧适中，景点、美食、夜景都能充分体验。
            </AppText>
          </View>
          <View style={styles.tipBot}>
            <IconSymbol name="sparkles" color={colors.primary} size={34} />
          </View>
        </Card>
      </Screen>
      <View style={[styles.bottomPanel, { paddingBottom: spacing.lg + insets.bottom }]}>
        <View style={styles.budgetText}>
          <AppText variant="body">预计总预算（含交通+住宿+门票+餐饮）</AppText>
          <AppText variant="hero" color={colors.orange}>
            约 {formatCurrency(2980)} <AppText variant="bodyLarge" color={colors.orange}>/2人</AppText>
          </AppText>
        </View>
        <AppButton title="开始生成行程" icon="sparkles" loading={loading} onPress={handleGenerate} style={styles.generateButton} />
      </View>
    </View>
  );
}

function PlannerRow({ icon, title, trailing }: { icon: IconSymbolName; title: string; trailing: string }) {
  return (
    <Card style={styles.rowCard}>
      <View style={styles.rowLeft}>
        <View style={styles.rowIcon}>
          <IconSymbol name={icon} color={colors.primary} size={24} />
        </View>
        <AppText variant="subtitle">{title}</AppText>
      </View>
      <View style={styles.rowRight}>
        <AppText variant="bodyLarge" color={colors.textSecondary}>
          {trailing}
        </AppText>
        <IconSymbol name="chevron-right" color={colors.textMuted} size={18} />
      </View>
    </Card>
  );
}

function OptionSection({
  icon,
  title,
  helper,
  children
}: {
  icon: IconSymbolName;
  title: string;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <Card style={styles.optionCard}>
      <View style={styles.optionHead}>
        <View style={styles.rowIcon}>
          <IconSymbol name={icon} color={colors.primary} size={24} />
        </View>
        <AppText variant="subtitle">{title}</AppText>
      </View>
      <View style={styles.chips}>{children}</View>
      {helper ? (
        <AppText variant="caption" style={styles.helper}>
          {helper}
        </AppText>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  routeCard: {
    height: 210,
    overflow: "hidden",
    marginBottom: spacing.lg
  },
  routeContent: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xxl,
    gap: spacing.md
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl
  },
  swap: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center"
  },
  locationPill: {
    alignSelf: "flex-start",
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  rowCard: {
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  rowRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: spacing.sm
  },
  rowIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center"
  },
  optionCard: {
    marginBottom: spacing.md
  },
  optionHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    justifyContent: "flex-end"
  },
  helper: {
    marginTop: spacing.md,
    alignSelf: "flex-end"
  },
  tip: {
    borderColor: "#BBD8FF",
    backgroundColor: colors.primarySoft,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg
  },
  tipText: {
    flex: 1,
    gap: spacing.xs
  },
  tipBot: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomPanel: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: "row",
    gap: spacing.lg,
    alignItems: "center"
  },
  budgetText: {
    flex: 1
  },
  generateButton: {
    minWidth: 190
  }
});
