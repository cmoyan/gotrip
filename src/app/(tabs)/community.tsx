import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommunityGuideCard } from "../../components/cards/CommunityGuideCard";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { Chip } from "../../components/ui/Chip";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { spacing } from "../../constants/spacing";
import { communityService } from "../../services/communityService";
import { Guide } from "../../types";
import { showToast } from "../../utils/toast";

const channels = ["关注", "发现", "攻略榜"];
const filters = ["全部", "上海", "周边游", "国内", "国外", "CityWalk"];

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const [activeChannel, setActiveChannel] = useState("发现");
  const [activeFilter, setActiveFilter] = useState("全部");
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    async function load() {
      setGuides(await communityService.getCommunityGuides());
    }

    void load();
  }, []);

  const visibleGuides = useMemo(() => {
    if (activeFilter === "全部") {
      return guides;
    }
    return guides.filter((guide) => guide.tag === activeFilter || guide.city === activeFilter || guide.title.includes(activeFilter));
  }, [activeFilter, guides]);

  const leftColumn = visibleGuides.filter((_, index) => index % 2 === 0);
  const rightColumn = visibleGuides.filter((_, index) => index % 2 === 1);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.md,
          paddingBottom: insets.bottom + 112
        }}
      >
        <View style={styles.header}>
          <AppText variant="logo" style={styles.logo}>GoTrip</AppText>
          <View style={styles.channelTabs}>
            {channels.map((channel) => (
              <Pressable key={channel} onPress={() => setActiveChannel(channel)} style={styles.channelTab}>
                <AppText variant="subtitle" color={activeChannel === channel ? colors.text : colors.textMuted} style={styles.channelText}>
                  {channel}
                </AppText>
                {activeChannel === channel ? <View style={styles.channelLine} /> : null}
              </Pressable>
            ))}
          </View>
          <Pressable onPress={() => showToast("暂无新消息")} style={styles.bell}>
            <IconSymbol name="bell" size={26} />
            <View style={styles.redDot} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              selected={activeFilter === filter}
              solidSelected
              style={styles.filterChip}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
          <Pressable onPress={() => showToast("更多筛选暂未开放")} style={styles.moreFilter}>
            <IconSymbol name="chevron-right" size={18} color={colors.textSecondary} />
          </Pressable>
        </ScrollView>

        <View style={styles.waterfall}>
          <View style={styles.column}>
            {leftColumn.map((guide) => (
              <CommunityGuideCard key={guide.id} guide={guide} onPress={() => router.push({ pathname: "/guide/[id]", params: { id: guide.id } })} />
            ))}
          </View>
          <View style={styles.column}>
            {rightColumn.slice(0, 2).map((guide) => (
              <CommunityGuideCard key={guide.id} guide={guide} onPress={() => router.push({ pathname: "/guide/[id]", params: { id: guide.id } })} />
            ))}
            <CreatorCard />
            {rightColumn.slice(2).map((guide) => (
              <CommunityGuideCard key={guide.id} guide={guide} onPress={() => router.push({ pathname: "/guide/[id]", params: { id: guide.id } })} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function CreatorCard() {
  return (
    <LinearGradient colors={["#EAF3FF", "#F7FBFF"]} style={styles.creator}>
      <View style={styles.creatorText}>
        <AppText variant="subtitle" color={colors.primary}>
          分享你的旅行攻略
        </AppText>
        <AppText variant="subtitle" color={colors.primary}>
          赢取创作奖励
        </AppText>
        <AppText variant="body" color={colors.textSecondary}>
          优质攻略享流量扶持，瓜分万元现金奖励
        </AppText>
        <AppButton title="去发布" icon="chevron-right" onPress={() => router.push("/publish")} style={styles.creatorButton} />
      </View>
      <View style={styles.creatorIcon}>
        <IconSymbol name="book" size={42} color={colors.primary} />
      </View>
    </LinearGradient>
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
    gap: spacing.xl,
    minHeight: 52
  },
  logo: {
    fontSize: 32,
    letterSpacing: 0
  },
  channelTabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  channelTab: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minHeight: 44
  },
  channelText: {
    fontWeight: "800",
    fontSize: 18
  },
  channelLine: {
    width: 28,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: colors.primary
  },
  bell: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  redDot: {
    position: "absolute",
    top: 5,
    right: 4,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: colors.red
  },
  filterRow: {
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg
  },
  filterChip: {
    minHeight: 42,
    paddingHorizontal: spacing.xl
  },
  moreFilter: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "90deg" }]
  },
  waterfall: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.xl
  },
  column: {
    flex: 1
  },
  creator: {
    minHeight: 238,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadows.card
  },
  creatorText: {
    flex: 1,
    gap: spacing.sm
  },
  creatorButton: {
    alignSelf: "flex-start",
    minHeight: 42,
    marginTop: spacing.sm
  },
  creatorIcon: {
    position: "absolute",
    right: spacing.lg,
    bottom: spacing.lg,
    width: 92,
    height: 92,
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-8deg" }]
  }
});
