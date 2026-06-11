import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Screen } from "../../components/layout/Screen";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { Card } from "../../components/ui/Card";
import { Chip } from "../../components/ui/Chip";
import { IconSymbol } from "../../components/ui/IconSymbol";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { showToast } from "../../utils/toast";

export default function PublishScreen() {
  return (
    <Screen bottomSpace={112}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <IconSymbol name="chevron-back" size={30} />
        </Pressable>
        <AppText variant="title" style={styles.title}>
          发布旅行攻略
        </AppText>
        <Pressable onPress={() => showToast("草稿已保存")} style={styles.draft}>
          <AppText variant="body" color={colors.primary}>
            草稿
          </AppText>
        </Pressable>
      </View>

      <Card style={styles.upload}>
        <View style={styles.uploadIcon}>
          <IconSymbol name="camera" size={42} color={colors.primary} />
        </View>
        <AppText variant="subtitle">添加旅行照片或视频</AppText>
        <AppText variant="body" color={colors.textMuted}>
          支持多图、路线、预算和清单，当前为前端演示
        </AppText>
      </Card>

      <Card style={styles.formCard}>
        <AppText variant="bodyLarge" style={styles.bold}>
          攻略标题
        </AppText>
        <View style={styles.inputLike}>
          <AppText variant="body" color={colors.textMuted}>
            例如：重庆3天2晚避坑路线
          </AppText>
        </View>
        <AppText variant="bodyLarge" style={styles.bold}>
          攻略标签
        </AppText>
        <View style={styles.tags}>
          {["上海攻略", "周边游", "美食打卡", "CityWalk", "拍照机位"].map((tag, index) => (
            <Chip key={tag} label={tag} selected={index < 2} compact />
          ))}
        </View>
      </Card>

      <Card style={styles.reward}>
        <IconSymbol name="sparkles" size={28} color={colors.orange} />
        <View style={styles.rewardText}>
          <AppText variant="subtitle">创作者激励</AppText>
          <AppText variant="body" color={colors.textSecondary}>
            优质攻略可获得曝光扶持与现金奖励。
          </AppText>
        </View>
      </Card>

      <AppButton title="发布攻略" onPress={() => showToast("攻略已发布到社区（模拟）")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl
  },
  back: {
    width: 52
  },
  title: {
    flex: 1,
    textAlign: "center"
  },
  draft: {
    width: 52,
    alignItems: "flex-end"
  },
  upload: {
    minHeight: 210,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
    borderStyle: "dashed"
  },
  uploadIcon: {
    width: 86,
    height: 86,
    borderRadius: radius.xl,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center"
  },
  formCard: {
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  inputLike: {
    minHeight: 48,
    borderRadius: radius.md,
    backgroundColor: colors.cardSoft,
    paddingHorizontal: spacing.lg,
    justifyContent: "center"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  reward: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.orangeLight
  },
  rewardText: {
    flex: 1
  },
  bold: {
    fontWeight: "800"
  }
});
