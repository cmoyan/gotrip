import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { BottomActionBar } from "../../components/layout/BottomActionBar";
import { Header } from "../../components/layout/Header";
import { Screen } from "../../components/layout/Screen";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { communityService } from "../../services/communityService";
import { useUserStore } from "../../store/useUserStore";
import { Guide } from "../../types";
import { formatCompact } from "../../utils/format";
import { showToast } from "../../utils/toast";

export default function GuideDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const likedGuideIds = useUserStore((state) => state.likedGuideIds);
  const toggleGuideLike = useUserStore((state) => state.toggleGuideLike);
  const guideId = typeof id === "string" ? id : "shanghai-three-days";
  const liked = likedGuideIds.includes(guideId);

  useEffect(() => {
    async function load() {
      setGuide(await communityService.getGuide(guideId));
    }

    void load();
  }, [guideId]);

  if (!guide) {
    return (
      <Screen scroll={false}>
        <AppText variant="title">正在加载攻略...</AppText>
      </Screen>
    );
  }

  return (
    <View style={styles.root}>
      <Screen bottomSpace={116}>
        <Header title="攻略详情" rightIcon="share" onRightPress={() => showToast("分享攻略")} />
        <Card padded={false} style={styles.hero}>
          <Image source={{ uri: guide.image }} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={["rgba(0,0,0,0.06)", "rgba(0,0,0,0.45)"]} style={StyleSheet.absoluteFill} />
          <View style={styles.heroContent}>
            <Chip label={guide.tag} selected compact />
            <AppText variant="title" color={colors.white}>
              {guide.title}
            </AppText>
          </View>
        </Card>

        <View style={styles.authorRow}>
          <Image source={{ uri: guide.authorAvatar }} style={styles.avatar} />
          <View style={styles.authorText}>
            <AppText variant="bodyLarge" style={styles.bold}>
              {guide.author}
            </AppText>
            <AppText variant="caption">发布于 GoTrip · {guide.city}</AppText>
          </View>
          <Pressable onPress={() => showToast("已关注作者")} style={styles.follow}>
            <AppText variant="body" color={colors.primary} style={styles.bold}>
              关注
            </AppText>
          </Pressable>
        </View>

        <Card style={styles.contentCard}>
          <AppText variant="subtitle">路线亮点</AppText>
          <AppText variant="bodyLarge" color={colors.textSecondary}>
            {guide.summary}
          </AppText>
          {["09:00 城市地标打卡，避开高峰人流", "12:00 本地人常去餐厅，预算更友好", "16:00 CityWalk 拍照机位，光线更柔和", "20:00 夜景收尾，适合拍一组氛围大片"].map((line) => (
            <View key={line} style={styles.lineItem}>
              <View style={styles.lineDot} />
              <AppText variant="body">{line}</AppText>
            </View>
          ))}
        </Card>

        <Card style={styles.contentCard}>
          <AppText variant="subtitle">预算与提醒</AppText>
          <View style={styles.tips}>
            {["人均预算约 ¥600-900/天", "建议提前预约热门展馆", "夜景机位人多，三脚架需注意安全", "路线可一键加入我的行程后继续编辑"].map((tip) => (
              <View key={tip} style={styles.tip}>
                <IconSymbol name="sparkles" size={16} color={colors.primary} />
                <AppText variant="body">{tip}</AppText>
              </View>
            ))}
          </View>
        </Card>
      </Screen>
      <BottomActionBar>
        <Pressable onPress={() => toggleGuideLike(guideId)} style={styles.likeArea}>
          <IconSymbol name="heart" size={26} color={liked ? colors.red : colors.textMuted} />
          <AppText variant="caption">{liked ? "已点赞" : formatCompact(guide.likes)}</AppText>
        </Pressable>
        <AppButton title="加入我的行程" icon="calendar" onPress={() => router.push("/trip-detail")} style={styles.bottomButton} />
      </BottomActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  hero: {
    height: 260,
    overflow: "hidden",
    marginBottom: spacing.lg
  },
  heroContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.xl,
    gap: spacing.md
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radius.pill
  },
  authorText: {
    flex: 1
  },
  follow: {
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center"
  },
  contentCard: {
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  lineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  lineDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.primary
  },
  tips: {
    gap: spacing.md
  },
  tip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  likeArea: {
    width: 74,
    alignItems: "center",
    gap: spacing.xxs
  },
  bottomButton: {
    flex: 1
  },
  bold: {
    fontWeight: "800"
  }
});
