import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomActionBar } from "../../components/layout/BottomActionBar";
import { HorizontalDestinationSection } from "../../components/cards/HorizontalDestinationSection";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { colors } from "../../constants/colors";
import { images } from "../../constants/images";
import { layout } from "../../constants/layout";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { destinationService } from "../../services/destinationService";
import { useTripStore } from "../../store/useTripStore";
import { useUserStore } from "../../store/useUserStore";
import { DestinationCardData } from "../../types";
import { showToast } from "../../utils/toast";

const tabs = ["推荐", "打卡点", "美食", "拍照", "预算"];

export default function DestinationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("推荐");
  const [spots, setSpots] = useState<DestinationCardData[]>([]);
  const [foods, setFoods] = useState<DestinationCardData[]>([]);
  const [photos, setPhotos] = useState<DestinationCardData[]>([]);
  const favoriteIds = useUserStore((state) => state.favoriteIds);
  const toggleFavorite = useUserStore((state) => state.toggleFavorite);
  const joinTrip = useTripStore((state) => state.joinTrip);
  const destinationId = typeof id === "string" ? id : "chongqing";
  const favoriteKey = destinationId;
  const isFavorite = favoriteIds.includes(favoriteKey);

  useEffect(() => {
    async function load() {
      const [spotData, foodData, photoData] = await Promise.all([
        destinationService.getChongqingSpots(),
        destinationService.getChongqingFoods(),
        destinationService.getPhotoSpots()
      ]);
      setSpots(spotData);
      setFoods(foodData);
      setPhotos(photoData);
    }

    void load();
  }, []);

  function handleJoin() {
    joinTrip("chongqing-route-3d2n");
    showToast("已加入重庆3天2晚精华行程");
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingBottom: insets.bottom + 116
        }}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <IconSymbol name="chevron-back" size={30} />
          </Pressable>
          <AppText variant="title" style={styles.title}>
            重庆目的地
          </AppText>
          <Pressable onPress={() => toggleFavorite(favoriteKey)} style={styles.iconButton}>
            <IconSymbol name={isFavorite ? "star-filled" : "star"} size={26} color={isFavorite ? colors.orange : colors.text} />
          </Pressable>
          <Pressable onPress={() => showToast("分享重庆目的地")} style={styles.iconButton}>
            <IconSymbol name="share" size={25} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {tabs.map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
              <AppText variant="subtitle" color={activeTab === tab ? colors.primary : colors.textSecondary} style={styles.tabText}>
                {tab}
              </AppText>
              {activeTab === tab ? <View style={styles.tabLine} /> : null}
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.content}>
          <Card padded={false} style={styles.hero}>
            <Image source={{ uri: images.chongqingNight }} style={StyleSheet.absoluteFill} />
            <LinearGradient colors={["rgba(7,23,49,0.08)", "rgba(7,23,49,0.2)", "rgba(7,23,49,0.72)"]} style={StyleSheet.absoluteFill} />
            <View style={styles.heroContent}>
              <AppText variant="hero" color={colors.white}>
                重庆
              </AppText>
              <AppText variant="subtitle" color={colors.white}>
                山城雾都 · 魔幻8D之城
              </AppText>
              <View style={styles.heroTags}>
                {["火锅", "夜景", "山城", "轻轨穿楼"].map((tag) => (
                  <View key={tag} style={styles.heroTag}>
                    <AppText variant="caption" color={colors.text}>
                      {tag}
                    </AppText>
                  </View>
                ))}
              </View>
            </View>
          </Card>

          <Card style={styles.routeCard}>
            <View style={styles.routeTop}>
              <View>
                <View style={styles.recommendRow}>
                  <AppText variant="subtitle">首次来重庆 3天2晚精华路线</AppText>
                  <Chip label="推荐" selected compact />
                </View>
                <AppText variant="body" color={colors.textSecondary}>
                  经典景点 + 地道美食 + 山城夜景
                </AppText>
              </View>
              <Image source={{ uri: images.chongqingBridge }} style={styles.routeImage} />
            </View>
            <View style={styles.routeSteps}>
              {["解放碑\nDAY1", "洪崖洞\nDAY1", "磁器口\nDAY2", "长江索道\nDAY2", "南山一棵树\nDAY3"].map((step) => (
                <View key={step} style={styles.step}>
                  <View style={styles.stepDot} />
                  <AppText variant="caption" align="center">
                    {step}
                  </AppText>
                </View>
              ))}
            </View>
            <Pressable onPress={() => router.push("/trip-detail")} style={styles.detailLink}>
              <AppText variant="body" color={colors.primary} style={styles.bold}>
                查看详情
              </AppText>
              <IconSymbol name="chevron-right" color={colors.primary} size={17} />
            </Pressable>
          </Card>

          <HorizontalDestinationSection
            title="必打卡景点"
            items={spots}
            itemWidth={154}
            imageHeight={92}
            onMore={() => showToast("更多重庆景点")}
            onItemPress={() => router.push({ pathname: "/attraction/[id]", params: { id: "hongyadong" } })}
          />
          <HorizontalDestinationSection
            title="美食推荐"
            items={foods}
            itemWidth={154}
            imageHeight={92}
            onMore={() => showToast("更多重庆美食")}
            onItemPress={() => router.push({ pathname: "/attraction/[id]", params: { id: "hongyadong" } })}
          />
          <HorizontalDestinationSection
            title="拍照机位推荐"
            items={photos}
            itemWidth={158}
            imageHeight={88}
            onMore={() => showToast("更多拍照机位")}
            onItemPress={() => router.push({ pathname: "/attraction/[id]", params: { id: "hongyadong" } })}
          />

          <Card style={styles.budget}>
            <View style={styles.budgetIcon}>
              <IconSymbol name="wallet" color={colors.orange} size={28} />
            </View>
            <View style={styles.budgetMiddle}>
              <AppText variant="subtitle">预算参考</AppText>
              <AppText variant="caption">人均（不含往返交通）</AppText>
            </View>
            <View style={styles.budgetLevel}>
              <AppText variant="caption">经济型</AppText>
              <AppText variant="body">¥600-900/天</AppText>
            </View>
            <View style={styles.budgetLevel}>
              <AppText variant="caption">舒适型</AppText>
              <AppText variant="body">¥900-1500/天</AppText>
            </View>
            <View style={styles.budgetPrice}>
              <AppText variant="caption" color={colors.orange}>
                人均参考
              </AppText>
              <AppText variant="subtitle" color={colors.orange}>
                ¥900-1500
              </AppText>
            </View>
          </Card>
        </View>
      </ScrollView>
      <BottomActionBar>
        <Pressable onPress={() => toggleFavorite(favoriteKey)} style={styles.saveArea}>
          <IconSymbol name={isFavorite ? "star-filled" : "star"} color={isFavorite ? colors.orange : colors.textMuted} size={26} />
          <AppText variant="caption">{isFavorite ? "已收藏" : "收藏"}</AppText>
        </Pressable>
        <AppButton title="加入行程" variant="outline" onPress={handleJoin} style={styles.bottomButton} />
        <AppButton title="查看地图路线" icon="location" onPress={() => router.push("/map")} style={styles.bottomButton} />
      </BottomActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 54
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flex: 1,
    textAlign: "center"
  },
  tabs: {
    gap: 46,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg
  },
  tab: {
    alignItems: "center",
    gap: spacing.xs
  },
  tabText: {
    fontWeight: "800"
  },
  tabLine: {
    width: 32,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.primary
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md
  },
  hero: {
    height: layout.destinationHeroHeight,
    overflow: "hidden",
    borderRadius: radius.xl
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.xxl,
    gap: spacing.sm
  },
  heroTags: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
    marginTop: spacing.sm
  },
  heroTag: {
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minHeight: 32,
    justifyContent: "center"
  },
  routeCard: {
    gap: spacing.md,
    minHeight: 154
  },
  routeTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.lg
  },
  recommendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xs
  },
  routeImage: {
    width: 144,
    height: 86,
    borderRadius: radius.md
  },
  routeSteps: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: colors.primaryLight,
    paddingTop: spacing.sm
  },
  step: {
    alignItems: "center",
    width: 68,
    gap: spacing.xs
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
    marginTop: -14
  },
  detailLink: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  budget: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flexWrap: "wrap",
    minHeight: 88,
    borderColor: "#D5E7FF",
    backgroundColor: "#FBFDFF"
  },
  budgetIcon: {
    width: 54,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.orangeLight,
    alignItems: "center",
    justifyContent: "center"
  },
  budgetMiddle: {
    flex: 1,
    minWidth: 120
  },
  budgetLevel: {
    width: "30%",
    alignItems: "center"
  },
  budgetPrice: {
    marginLeft: "auto",
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: "center"
  },
  saveArea: {
    width: 70,
    alignItems: "center",
    gap: spacing.xxs
  },
  bottomButton: {
    flex: 1,
    minHeight: 54
  },
  bold: {
    fontWeight: "800"
  }
});
