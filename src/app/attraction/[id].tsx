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
import { SectionHeader } from "../../components/ui/SectionHeader";
import { colors } from "../../constants/colors";
import { layout } from "../../constants/layout";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { destinationService } from "../../services/destinationService";
import { useTripStore } from "../../store/useTripStore";
import { useUserStore } from "../../store/useUserStore";
import { Attraction } from "../../types";
import { showToast } from "../../utils/toast";

export default function AttractionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const favoriteIds = useUserStore((state) => state.favoriteIds);
  const toggleFavorite = useUserStore((state) => state.toggleFavorite);
  const joinTrip = useTripStore((state) => state.joinTrip);
  const attractionId = typeof id === "string" ? id : "hongyadong";
  const favoriteKey = attractionId;
  const isFavorite = favoriteIds.includes(favoriteKey);

  useEffect(() => {
    async function load() {
      setAttraction(await destinationService.getAttraction(favoriteKey));
    }

    void load();
  }, [favoriteKey]);

  if (!attraction) {
    return (
      <View style={styles.root}>
        <AppText variant="title">正在加载景点...</AppText>
      </View>
    );
  }

  function handleJoin() {
    joinTrip("hongyadong-night-route");
    showToast("洪崖洞已加入行程");
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 112
        }}
      >
        <View style={styles.hero}>
          <Image source={{ uri: attraction.image }} style={StyleSheet.absoluteFill} />
          <View style={[styles.heroTop, { paddingTop: insets.top + spacing.md }]}>
            <Pressable onPress={() => router.back()} style={styles.roundButton}>
              <IconSymbol name="chevron-back" size={28} />
            </Pressable>
            <View style={styles.heroRight}>
              <Pressable onPress={() => showToast("已打开分享入口")} style={styles.roundButton}>
                <IconSymbol name="share" size={24} />
              </Pressable>
              <Pressable onPress={() => toggleFavorite(favoriteKey)} style={styles.roundButton}>
                <IconSymbol name={isFavorite ? "star-filled" : "star"} size={24} color={isFavorite ? colors.orange : colors.text} />
              </Pressable>
            </View>
          </View>
          <View style={styles.photoCount}>
            <AppText variant="caption" color={colors.white}>
              1/12
            </AppText>
          </View>
        </View>

        <View style={styles.content}>
          <Card style={styles.titleCard}>
            <View style={styles.titleRow}>
              <View style={styles.titleMain}>
                <View style={styles.nameRow}>
                  <AppText variant="title">{attraction.name}</AppText>
                  <Chip label="4A景区" selected compact />
                </View>
                <View style={styles.metaRow}>
                  <IconSymbol name="location" size={17} color={colors.textMuted} />
                  <AppText variant="body" color={colors.textMuted}>
                    {attraction.address}
                  </AppText>
                </View>
                <View style={styles.metaRow}>
                  <IconSymbol name="time" size={17} color={colors.textMuted} />
                  <AppText variant="body" color={colors.textMuted}>
                    {attraction.openTime}
                  </AppText>
                </View>
              </View>
              <View style={styles.score}>
                <AppText variant="title" color={colors.orange}>
                  ★ {attraction.rating}分
                </AppText>
                <AppText variant="body" color={colors.textMuted}>
                  12.7万人去过
                </AppText>
              </View>
            </View>
            <View style={styles.tags}>
              {attraction.tags.map((tag) => (
                <Chip key={tag} label={tag} selected compact />
              ))}
            </View>
            <View style={styles.notice}>
              <View style={styles.noticeBlock}>
                <AppText variant="bodyLarge" style={styles.bold}>
                  最佳游玩时间
                </AppText>
                <AppText variant="body" color={colors.textSecondary}>
                  {attraction.bestTime}
                </AppText>
              </View>
              <View style={styles.noticeBlock}>
                <AppText variant="bodyLarge" color={colors.red} style={styles.bold}>
                  避坑提醒
                </AppText>
                {attraction.warning.map((item) => (
                  <AppText key={item} variant="body" color={colors.textSecondary}>
                    · {item}
                  </AppText>
                ))}
              </View>
            </View>
          </Card>

          <HorizontalDestinationSection
            title="拍照机位推荐"
            items={attraction.photoSpots}
            itemWidth={150}
            imageHeight={88}
            onMore={() => showToast("查看更多拍照机位推荐")}
          />
          <HorizontalDestinationSection
            title="附近美食"
            items={attraction.foods}
            itemWidth={150}
            imageHeight={88}
            onMore={() => showToast("查看更多附近美食")}
          />

          <View style={styles.twoCards}>
            <InfoCard title="门票/预约信息" icon="ticket" lines={["免费开放", "无需预约，随到随玩", "景区开放时间：10:00-22:30"]} />
            <InfoCard title="交通到达" icon="car" lines={["距较场口地铁站 340m", "2号线 / 1号线", "步行约5分钟"]} />
          </View>

          <View style={styles.twoCards}>
            <Card style={styles.mapCard}>
              <SectionHeader title="景区地图" />
              <View style={styles.miniMap}>
                <View style={styles.river} />
                <View style={styles.mapPin}>
                  <IconSymbol name="location" color={colors.white} size={22} />
                </View>
                <AppText variant="caption" style={styles.mapText}>
                  洪崖洞民俗风貌区
                </AppText>
              </View>
            </Card>
            <Card style={styles.routeRecommend}>
              <SectionHeader title="周边路线推荐" />
              <Image source={{ uri: attraction.image }} style={styles.routeThumb} />
              <AppText variant="bodyLarge" style={styles.bold}>
                洪崖洞夜景打卡路线
              </AppText>
              <AppText variant="caption">洪崖洞 → 千厮门大桥 → 解放碑</AppText>
              <AppText variant="caption">步行约2.3km · 建议2-3小时</AppText>
            </Card>
          </View>

          <Card style={styles.sectionCard}>
            <SectionHeader title="达人攻略" onAction={() => router.push("/community")} />
            {["重庆洪崖洞超全攻略｜夜景拍照+美食+避坑指南", "本地人私藏的洪崖洞玩法，避开人流拍大片"].map((title) => (
              <Pressable key={title} onPress={() => router.push({ pathname: "/guide/[id]", params: { id: "night-photo" } })} style={styles.guideRow}>
                <Image source={{ uri: attraction.image }} style={styles.guideThumb} />
                <View style={styles.guideText}>
                  <AppText variant="bodyLarge" numberOfLines={1} style={styles.bold}>
                    {title}
                  </AppText>
                  <AppText variant="caption">旅行达人小鹿 · 2.6万阅读</AppText>
                </View>
                <Chip label="热门" compact />
              </Pressable>
            ))}
          </Card>
        </View>
      </ScrollView>
      <BottomActionBar>
        <Pressable onPress={() => toggleFavorite(favoriteKey)} style={styles.saveArea}>
          <IconSymbol name={isFavorite ? "star-filled" : "star"} color={isFavorite ? colors.orange : colors.textMuted} size={26} />
          <AppText variant="caption">{isFavorite ? "已保存" : "保存"}</AppText>
        </Pressable>
        <AppButton title="加入行程" icon="calendar" variant="outline" onPress={handleJoin} style={styles.bottomButton} />
        <AppButton title="导航去这里" icon="location" onPress={() => showToast("导航：距你 3.4km · 约14分钟")} style={styles.bottomButton} />
      </BottomActionBar>
    </View>
  );
}

function InfoCard({ title, icon, lines }: { title: string; icon: "ticket" | "car"; lines: string[] }) {
  return (
    <Card style={styles.infoCard}>
      <View style={styles.infoHead}>
        <IconSymbol name={icon} color={colors.primary} />
        <AppText variant="bodyLarge" style={styles.bold}>
          {title}
        </AppText>
      </View>
      {lines.map((line) => (
        <AppText key={line} variant="body" color={line.includes("免费") || line.includes("340m") ? colors.primary : colors.textSecondary}>
          {line}
        </AppText>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  hero: {
    height: layout.attractionHeroHeight,
    position: "relative",
    overflow: "hidden"
  },
  heroTop: {
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  heroRight: {
    flexDirection: "row",
    gap: spacing.md
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center"
  },
  photoCount: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: "rgba(0,0,0,0.38)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  content: {
    marginTop: -34,
    paddingHorizontal: spacing.lg,
    gap: spacing.md
  },
  titleCard: {
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingTop: spacing.xl
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md
  },
  titleMain: {
    flex: 1,
    gap: spacing.sm
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexWrap: "wrap"
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  score: {
    minWidth: 86,
    alignItems: "flex-end",
    gap: spacing.xs
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  notice: {
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: "#DDEBFF",
    borderRadius: radius.md,
    padding: spacing.lg,
    flexDirection: "row",
    gap: spacing.lg,
    minHeight: 104,
    backgroundColor: "#FBFDFF"
  },
  noticeBlock: {
    flex: 1,
    gap: spacing.sm
  },
  twoCards: {
    flexDirection: "row",
    gap: spacing.md
  },
  infoCard: {
    flex: 1,
    gap: spacing.sm,
    minHeight: 146
  },
  infoHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  mapCard: {
    flex: 1
  },
  miniMap: {
    height: 128,
    borderRadius: radius.md,
    backgroundColor: "#D9F0FF",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center"
  },
  river: {
    position: "absolute",
    width: "120%",
    height: 44,
    backgroundColor: "#9ED6FF",
    transform: [{ rotate: "-18deg" }]
  },
  mapPin: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  mapText: {
    marginTop: spacing.sm,
    fontWeight: "800"
  },
  routeRecommend: {
    flex: 1,
    gap: spacing.sm,
    minHeight: 156
  },
  routeThumb: {
    width: "100%",
    height: 70,
    borderRadius: radius.sm
  },
  guideRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  guideThumb: {
    width: 78,
    height: 52,
    borderRadius: radius.sm
  },
  guideText: {
    flex: 1
  },
  sectionCard: {
    paddingRight: 0
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
