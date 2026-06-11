import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BudgetAssistantBar } from "../../components/cards/BudgetAssistantBar";
import { DestinationMiniCard } from "../../components/cards/DestinationMiniCard";
import { FeatureGrid } from "../../components/cards/FeatureGrid";
import { GuideRow } from "../../components/cards/GuideRow";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { BudgetModal } from "../../components/ui/BudgetModal";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { colors } from "../../constants/colors";
import { images } from "../../constants/images";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { layout } from "../../constants/layout";
import { spacing } from "../../constants/spacing";
import { destinationService } from "../../services/destinationService";
import { tripService } from "../../services/tripService";
import { DestinationCardData, FeatureEntry, Guide } from "../../types";
import { showToast } from "../../utils/toast";
import { communityService } from "../../services/communityService";

const channels = ["推荐", "攻略", "周边游", "美食", "拍照", "预算"];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [activeChannel, setActiveChannel] = useState("推荐");
  const [features, setFeatures] = useState<FeatureEntry[]>([]);
  const [localItems, setLocalItems] = useState<DestinationCardData[]>([]);
  const [weekendItems, setWeekendItems] = useState<DestinationCardData[]>([]);
  const [hotItems, setHotItems] = useState<DestinationCardData[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [budgetVisible, setBudgetVisible] = useState(false);

  useEffect(() => {
    async function load() {
      const [featureData, localData, weekendData, hotData, guideData] = await Promise.all([
        tripService.getHomeFeatures(),
        destinationService.getLocalRecommendations(),
        destinationService.getWeekendTrips(),
        destinationService.getHotDestinations(),
        communityService.getPopularGuides()
      ]);
      setFeatures(featureData);
      setLocalItems(localData);
      setWeekendItems(weekendData);
      setHotItems(hotData);
      setGuides(guideData);
    }

    void load();
  }, []);

  function handleFeaturePress(id: string) {
    if (id === "ai") {
      router.push("/ai-planner");
      return;
    }
    if (id === "map") {
      router.push("/map");
      return;
    }
    if (id === "ticket") {
      router.push({ pathname: "/attraction/[id]", params: { id: "hongyadong" } });
      return;
    }
    if (id === "food") {
      router.push({ pathname: "/destination/[id]", params: { id: "chongqing" } });
      return;
    }
    showToast("功能已加入体验队列");
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + 168
          }
        ]}
      >
        <View style={styles.topRow}>
          <Pressable onPress={() => router.push("/side-drawer" as any)} hitSlop={8}>
            <IconSymbol name="menu" size={26} color={colors.text} />
          </Pressable>
          <AppText variant="logo" style={styles.logo}>GoTrip</AppText>
          <Pressable style={styles.cityPill} onPress={() => showToast("当前城市：上海")}>
            <AppText variant="bodyLarge" style={styles.cityText}>
              上海
            </AppText>
            <IconSymbol name="chevron-right" size={15} color={colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.searchBox} onPress={() => showToast("搜索功能暂用假数据展示")}>
            <IconSymbol name="search" size={20} color={colors.textMuted} />
            <AppText variant="body" color={colors.textMuted} numberOfLines={1}>
              搜索目的地/攻略/景点/酒店
            </AppText>
          </Pressable>
          <Pressable style={styles.notify} onPress={() => showToast("暂无新通知")}>
            <IconSymbol name="bell" size={25} color={colors.text} />
            <View style={styles.redDot} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.channelRow}>
          {channels.map((channel) => (
            <Pressable key={channel} onPress={() => setActiveChannel(channel)} style={styles.channelItem}>
              <AppText variant="subtitle" color={activeChannel === channel ? colors.primary : colors.textSecondary} style={styles.channelText}>
                {channel}
              </AppText>
              {activeChannel === channel ? <View style={styles.channelUnderline} /> : null}
            </Pressable>
          ))}
        </ScrollView>

        <Pressable onPress={() => router.push("/ai-planner")} style={({ pressed }) => [styles.banner, pressed ? styles.pressed : null]}>
          <Image source={{ uri: images.shanghaiSkyline }} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={["rgba(255,255,255,0.96)", "rgba(255,255,255,0.72)", "rgba(255,255,255,0.08)"]} style={StyleSheet.absoluteFill} />
          <View style={styles.bannerContent}>
            <AppText variant="hero" color={colors.primary} style={styles.bannerTitle}>
              AI 智能行程规划
            </AppText>
            <AppText variant="subtitle">定制你的完美旅程</AppText>
            <View style={styles.bannerChecks}>
              {["路线规划", "预算估算", "省心省力"].map((text) => (
                <View key={text} style={styles.checkItem}>
                  <IconSymbol name="star-filled" size={15} color={colors.primary} />
                  <AppText variant="caption" color={colors.textSecondary}>
                    {text}
                  </AppText>
                </View>
              ))}
            </View>
            <AppButton title="立即规划行程" icon="chevron-right" onPress={() => router.push("/ai-planner")} style={styles.bannerButton} />
          </View>
        </Pressable>

        <FeatureGrid items={features} onPress={handleFeaturePress} />

        <Card style={styles.sectionCard}>
          <SectionHeader title="本地推荐" icon="location" onAction={() => showToast("查看更多本地推荐")} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {localItems.map((item) => (
              <DestinationMiniCard key={item.id} item={item} width={136} onPress={() => showToast(`${item.name} 已加入浏览记录`)} />
            ))}
          </ScrollView>
        </Card>

        <Card style={styles.sectionCard}>
          <SectionHeader title="热门攻略" icon="book" onAction={() => router.push("/community")} />
          {guides.map((guide) => (
            <GuideRow key={guide.id} guide={guide} onPress={() => router.push({ pathname: "/guide/[id]", params: { id: guide.id } })} />
          ))}
        </Card>

        <View style={styles.twoColumn}>
          <Card style={styles.halfCard}>
            <SectionHeader title="周末周边" onAction={() => showToast("周边游筛选已打开")} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.smallCardRow}>
              {weekendItems.map((item) => (
                <DestinationMiniCard key={item.id} item={item} width={96} />
              ))}
            </ScrollView>
          </Card>
          <Card style={styles.halfCard}>
            <SectionHeader title="热门目的地" onAction={() => router.push({ pathname: "/destination/[id]", params: { id: "chongqing" } })} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.smallCardRow}>
              {hotItems.map((item) => (
                <DestinationMiniCard key={item.id} item={item} width={96} />
              ))}
            </ScrollView>
          </Card>
        </View>
      </ScrollView>
      <BudgetAssistantBar onPress={() => setBudgetVisible(true)} style={{ bottom: insets.bottom + 88 }} />
      <BudgetModal visible={budgetVisible} onClose={() => setBudgetVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingHorizontal: layout.pagePadding
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: layout.homeHeaderHeight
  },
  logo: {
    fontSize: 33,
    lineHeight: 38
  },
  cityPill: {
    height: 38,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  cityText: {
    fontWeight: "700"
  },
  searchBox: {
    flex: 1,
    height: layout.searchHeight,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.sm
  },
  notify: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center"
  },
  redDot: {
    position: "absolute",
    top: 7,
    right: 5,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: colors.red
  },
  channelRow: {
    gap: 30,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg
  },
  channelItem: {
    alignItems: "center",
    gap: spacing.xs,
    minWidth: 54
  },
  channelText: {
    fontWeight: "800",
    fontSize: 19,
    lineHeight: 25
  },
  channelUnderline: {
    width: 30,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.primary
  },
  banner: {
    height: layout.homeBannerHeight,
    overflow: "hidden",
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    ...shadows.card
  },
  bannerContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
    gap: spacing.xs
  },
  bannerTitle: {
    letterSpacing: 0,
    fontSize: 29,
    lineHeight: 35
  },
  bannerChecks: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xs,
    marginBottom: spacing.md
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs
  },
  bannerButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg
  },
  sectionCard: {
    marginTop: spacing.lg,
    borderRadius: radius.xl
  },
  twoColumn: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg
  },
  halfCard: {
    flex: 1,
    paddingHorizontal: spacing.md
  },
  smallCardRow: {
    flexDirection: "row",
    paddingRight: spacing.md
  },
  pressed: {
    opacity: 0.9
  }
});
