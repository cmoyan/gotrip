import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DestinationMiniCard } from "../../components/cards/DestinationMiniCard";
import { RouteMapMock } from "../../components/cards/RouteMapMock";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { IconSymbol, IconSymbolName } from "../../components/ui/IconSymbol";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { destinationService } from "../../services/destinationService";
import { tripService } from "../../services/tripService";
import { useTripStore } from "../../store/useTripStore";
import { DestinationCardData, RouteNode, TravelOption } from "../../types";
import { formatCurrency } from "../../utils/format";
import { showToast } from "../../utils/toast";

const categories = ["景点", "美食", "拍照", "酒店", "路线", "预算"];
const budgetSummaryItems: { label: string; amount: string; icon: IconSymbolName }[] = [
  { label: "交通", amount: "¥1,346", icon: "car" },
  { label: "住宿", amount: "¥960", icon: "bed" },
  { label: "餐饮", amount: "¥420", icon: "restaurant" },
  { label: "门票", amount: "¥254", icon: "ticket" }
];

export default function MapRouteScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("路线");
  const [optionType, setOptionType] = useState<TravelOption["type"]>("rail");
  const [nodes, setNodes] = useState<RouteNode[]>([]);
  const [options, setOptions] = useState<TravelOption[]>([]);
  const [spots, setSpots] = useState<DestinationCardData[]>([]);
  const savedRoute = useTripStore((state) => state.savedRoute);
  const toggleRouteSaved = useTripStore((state) => state.toggleRouteSaved);

  useEffect(() => {
    async function load() {
      const [routeData, optionData, spotData] = await Promise.all([
        tripService.getRouteNodes(),
        tripService.getTravelOptions(),
        destinationService.getChongqingSpots()
      ]);
      setNodes(routeData);
      setOptions(optionData);
      setSpots(spotData);
    }

    void load();
  }, []);

  const selectedOption = useMemo(
    () => options.find((option) => option.type === optionType) ?? null,
    [optionType, options]
  );

  function handleSaveRoute() {
    toggleRouteSaved();
    showToast(savedRoute ? "已取消保存路线" : "已保存到我的行程");
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingBottom: insets.bottom + 126
        }}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.back}>
            <IconSymbol name="chevron-back" size={30} />
          </Pressable>
          <AppText variant="title" style={styles.headerTitle}>
            上海 → 重庆
          </AppText>
          <Pressable onPress={() => router.push("/trip-detail")} style={styles.headerAction}>
            <AppText variant="body" style={styles.headerActionText}>
              我的行程
            </AppText>
            <IconSymbol name="calendar" size={21} />
          </Pressable>
          <Pressable onPress={() => showToast("行程设置暂未接入")} style={styles.settings}>
            <IconSymbol name="settings" size={23} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              selected={activeCategory === category}
              solidSelected
              onPress={() => setActiveCategory(category)}
              style={styles.categoryChip}
            />
          ))}
        </ScrollView>

        <RouteMapMock nodes={nodes} height={420} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.switchRow}>
            <Pressable onPress={() => setOptionType("rail")} style={styles.switchItem}>
              <AppText variant="subtitle" color={optionType === "rail" ? colors.primary : colors.textSecondary} style={styles.switchText}>
                高铁推荐
              </AppText>
              {optionType === "rail" ? <View style={styles.switchLine} /> : null}
            </Pressable>
            <Pressable onPress={() => setOptionType("flight")} style={styles.switchItem}>
              <AppText variant="subtitle" color={optionType === "flight" ? colors.primary : colors.textSecondary} style={styles.switchText}>
                航班推荐
              </AppText>
              {optionType === "flight" ? <View style={styles.switchLine} /> : null}
            </Pressable>
          </View>

          {selectedOption ? (
            <Card style={styles.travelCard}>
              <View style={styles.timeBlock}>
                <AppText variant="hero">{selectedOption.fromTime}</AppText>
                <AppText variant="bodyLarge">{selectedOption.fromStation}</AppText>
              </View>
              <View style={styles.trainMiddle}>
                <AppText variant="body">{selectedOption.code}</AppText>
                <View style={styles.arrowLine} />
                <AppText variant="caption">{selectedOption.duration}</AppText>
              </View>
              <View style={styles.timeBlock}>
                <AppText variant="hero">{selectedOption.toTime}</AppText>
                <AppText variant="bodyLarge">{selectedOption.toStation}</AppText>
              </View>
              <View style={styles.priceBlock}>
                <AppText variant="title" color={colors.orange}>
                  {formatCurrency(selectedOption.price)}
                </AppText>
                <AppText variant="caption" color={colors.orange}>
                  起
                </AppText>
                <IconSymbol name="chevron-right" size={18} color={colors.textMuted} />
              </View>
            </Card>
          ) : null}

          <View style={styles.infoRow}>
            <Card style={styles.infoCard}>
              <IconSymbol name="car" color={colors.primary} />
              <View>
                <AppText variant="bodyLarge" style={styles.bold}>
                  市内交通预估
                </AppText>
                <AppText variant="caption">轨道交通 + 打车</AppText>
              </View>
              <AppText variant="bodyLarge" color={colors.primary}>
                ¥120起/天
              </AppText>
            </Card>
            <Card style={styles.infoCard}>
              <IconSymbol name="bed" color={colors.primary} />
              <View>
                <AppText variant="bodyLarge" style={styles.bold}>
                  建议游玩时长
                </AppText>
                <AppText variant="caption">深度体验重庆精华景点</AppText>
              </View>
              <AppText variant="bodyLarge" color={colors.primary}>
                3天2晚
              </AppText>
            </Card>
          </View>

          <Card style={styles.sectionCard}>
            <SectionHeader title="推荐景点（必去）" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {spots.map((spot) => (
                <DestinationMiniCard
                  key={spot.id}
                  item={spot}
                  width={142}
                  onPress={() => router.push({ pathname: "/attraction/[id]", params: { id: "hongyadong" } })}
                />
              ))}
            </ScrollView>
          </Card>

          <Card style={styles.budgetCard}>
            <View>
              <AppText variant="bodyLarge" style={styles.bold}>
                2人总预算（3天2晚）
              </AppText>
              <AppText variant="hero" color={colors.orange}>
                ¥2,980
                <AppText variant="bodyLarge" color={colors.orange}> 起</AppText>
              </AppText>
            </View>
            <View style={styles.budgetItems}>
              {budgetSummaryItems.map(({ label, amount, icon }) => (
                <View key={label} style={styles.budgetItem}>
                  <IconSymbol name={icon} color={colors.primary} size={18} />
                  <AppText variant="caption">{label}</AppText>
                  <AppText variant="body">{amount}</AppText>
                </View>
              ))}
            </View>
          </Card>

          <AppText variant="caption" style={styles.disclaimer}>
            价格为预估，实际费用可能因出行时间和选择有所变化
          </AppText>
          <AppButton title={savedRoute ? "已保存到我的行程" : "保存到我的行程"} onPress={handleSaveRoute} style={styles.saveButton} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: spacing.lg,
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  back: {
    width: 36
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "800"
  },
  headerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  headerActionText: {
    fontWeight: "700"
  },
  settings: {
    width: 34,
    alignItems: "flex-end"
  },
  categoryRow: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md
  },
  categoryChip: {
    minWidth: 86,
    minHeight: 38
  },
  sheet: {
    marginTop: -24,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm
  },
  handle: {
    alignSelf: "center",
    width: 70,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.divider,
    marginBottom: spacing.md
  },
  switchRow: {
    flexDirection: "row",
    gap: spacing.xxxl,
    marginBottom: spacing.md
  },
  switchItem: {
    alignItems: "center",
    gap: spacing.xs
  },
  switchText: {
    fontWeight: "800"
  },
  switchLine: {
    width: 42,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.primary
  },
  travelCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 82,
    marginBottom: spacing.md
  },
  timeBlock: {
    width: 92
  },
  trainMiddle: {
    flex: 1,
    alignItems: "center"
  },
  arrowLine: {
    width: "100%",
    height: 2,
    backgroundColor: colors.divider,
    marginVertical: spacing.xs
  },
  priceBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs
  },
  infoRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.md
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  bold: {
    fontWeight: "800"
  },
  sectionCard: {
    marginBottom: spacing.md,
    paddingRight: 0
  },
  budgetCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 86,
    marginBottom: spacing.md
  },
  budgetItems: {
    flexDirection: "row",
    gap: spacing.lg
  },
  budgetItem: {
    alignItems: "center",
    gap: spacing.xxs
  },
  disclaimer: {
    marginBottom: spacing.md
  },
  saveButton: {
    minHeight: 54,
    borderRadius: radius.lg,
    marginBottom: spacing.lg
  }
});
