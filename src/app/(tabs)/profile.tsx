import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "../../components/layout/Screen";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { Card } from "../../components/ui/Card";
import { IconSymbol, IconSymbolName } from "../../components/ui/IconSymbol";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { userService } from "../../services/userService";
import { UserProfile } from "../../types";
import { formatCurrency } from "../../utils/format";
import { showToast } from "../../utils/toast";

const orderItems: { label: string; icon: IconSymbolName }[] = [
  { label: "全部订单", icon: "receipt" },
  { label: "待付款", icon: "wallet" },
  { label: "待出行", icon: "clipboard" },
  { label: "待点评", icon: "chat" },
  { label: "退款/售后", icon: "wallet" }
];

const toolItems: { label: string; icon: IconSymbolName }[] = [
  { label: "收藏", icon: "star" },
  { label: "浏览记录", icon: "time" },
  { label: "我的攻略", icon: "book" },
  { label: "足迹地图", icon: "map" },
  { label: "钱包卡券", icon: "wallet" }
];

const serviceItems: { label: string; icon: IconSymbolName }[] = [
  { label: "客服中心", icon: "help" },
  { label: "帮助与反馈", icon: "chat" },
  { label: "关于GoTrip", icon: "location" },
  { label: "设置", icon: "settings" }
];

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function load() {
      setProfile(await userService.getProfile());
    }

    void load();
  }, []);

  if (!profile) {
    return (
      <Screen scroll={false}>
        <AppText variant="title">正在加载我的页面...</AppText>
      </Screen>
    );
  }

  return (
    <Screen bottomSpace={118}>
      <View style={styles.top}>
        <AppText variant="logo">GoTrip</AppText>
        <View style={styles.topIcons}>
          <Pressable onPress={() => showToast("扫码功能暂未接入")}>
            <IconSymbol name="scan" size={26} />
          </Pressable>
          <Pressable onPress={() => showToast("设置入口")}>
          <Pressable onPress={() => router.push("/side-drawer" as any)}>
            <IconSymbol name="menu" size={26} />
          </Pressable>
            <IconSymbol name="settings" size={26} />
          </Pressable>
          <Pressable onPress={() => showToast("暂无新通知")} style={styles.bell}>
            <IconSymbol name="bell" size={27} />
            <View style={styles.redDot} />
          </Pressable>
        </View>
      </View>

      <View style={styles.profileRow}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <View style={styles.profileMain}>
          <View style={styles.nameRow}>
            <AppText variant="title">{profile.nickname}</AppText>
            <Pressable onPress={() => showToast("编辑资料暂未接入")} style={styles.edit}>
              <IconSymbol name="book" size={16} color={colors.primary} />
              <AppText variant="body" color={colors.primary}>
                编辑资料
              </AppText>
            </Pressable>
          </View>
          <View style={styles.level}>
            <AppText variant="bodyLarge" color={colors.primary} style={styles.bold}>
              {profile.level}
            </AppText>
          </View>
          <View style={styles.stats}>
            <Stat label="关注" value={profile.following} />
            <Stat label="粉丝" value={profile.followers} />
            <Stat label="获赞" value={profile.likes} />
          </View>
        </View>
      </View>

      <LinearGradient colors={["#7EC7FF", "#BFE6FF"]} style={styles.footprint}>
        <View style={styles.footprintText}>
          <AppText variant="subtitle" color={colors.white}>
            我的足迹
          </AppText>
          <AppText variant="subtitle" color={colors.white}>
            已点亮 {profile.footprintCities} 个城市
          </AppText>
          <AppText variant="subtitle" color={colors.white}>
            走过 {profile.distance}
          </AppText>
          <AppButton title="查看足迹地图" icon="chevron-right" onPress={() => showToast("足迹地图暂未接入")} style={styles.footButton} />
        </View>
        <View style={styles.mapDots}>
          {Array.from({ length: 22 }, (_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  left: `${10 + ((index * 17) % 78)}%`,
                  top: `${12 + ((index * 23) % 70)}%`,
                  transform: [{ scale: 0.7 + (index % 4) * 0.25 }]
                }
              ]}
            />
          ))}
        </View>
      </LinearGradient>

      <GridCard title="我的订单" action="全部订单" items={orderItems} />
      <GridCard title="常用工具" items={toolItems} />

      <Card style={styles.walletCard}>
        <WalletStat label="钱包余额" value={formatCurrency(profile.walletBalance)} />
        <WalletStat label="优惠券" value={`${profile.coupons}`} />
        <WalletStat label="创作收益" value={`${profile.income}`} />
        <WalletStat label="积分" value={`${profile.points}`} />
        <View style={styles.creatorBanner}>
          <View>
            <AppText variant="subtitle">分享攻略成为创作者</AppText>
            <AppText variant="body" color={colors.textSecondary}>
              发布优质攻略，赢取现金奖励 & 专属权益
            </AppText>
          </View>
          <AppButton title="去分享" variant="orange" onPress={() => showToast("跳转发布攻略")} style={styles.shareButton} />
        </View>
      </Card>

      <GridCard title="" items={serviceItems} />
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="body" color={colors.textSecondary}>
        {label}
      </AppText>
      <AppText variant="subtitle">{value}</AppText>
    </View>
  );
}

function GridCard({
  title,
  action,
  items
}: {
  title: string;
  action?: string;
  items: { label: string; icon: IconSymbolName }[];
}) {
  return (
    <Card style={styles.gridCard}>
      {title ? (
        <View style={styles.gridHead}>
          <AppText variant="subtitle">{title}</AppText>
          {action ? (
            <Pressable onPress={() => showToast(action)} style={styles.gridAction}>
              <AppText variant="body" color={colors.textMuted}>
                {action}
              </AppText>
              <IconSymbol name="chevron-right" size={16} color={colors.textMuted} />
            </Pressable>
          ) : null}
        </View>
      ) : null}
      <View style={styles.grid}>
        {items.map((item) => (
          <Pressable key={item.label} onPress={() => showToast(`${item.label} 暂未接入`)} style={({ pressed }) => [styles.gridItem, pressed ? styles.pressed : null]}>
            <View style={styles.gridIconBox}>
              <IconSymbol name={item.icon} size={28} />
            </View>
            <AppText variant="body" align="center">
              {item.label}
            </AppText>
          </Pressable>
        ))}
      </View>
    </Card>
  );
}

function WalletStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.walletStat}>
      <AppText variant="title">{value}</AppText>
      <AppText variant="body" color={colors.textSecondary}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl
  },
  topIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl
  },
  bell: {
    position: "relative"
  },
  redDot: {
    position: "absolute",
    right: -1,
    top: -1,
    width: 9,
    height: 9,
    borderRadius: 9,
    backgroundColor: colors.red
  },
  profileRow: {
    flexDirection: "row",
    gap: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.lg
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: radius.pill
  },
  profileMain: {
    flex: 1,
    gap: spacing.md
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flexWrap: "wrap"
  },
  edit: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  level: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  stat: {
    gap: spacing.xs
  },
  footprint: {
    height: 206,
    borderRadius: radius.xl,
    padding: spacing.xl,
    overflow: "hidden",
    marginBottom: spacing.lg
  },
  footprintText: {
    zIndex: 2,
    gap: spacing.md
  },
  footButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    marginTop: spacing.sm
  },
  mapDots: {
    ...StyleSheet.absoluteFillObject
  },
  dot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: colors.orange,
    borderWidth: 2,
    borderColor: colors.white
  },
  gridCard: {
    marginBottom: spacing.md,
    borderRadius: radius.xl
  },
  gridHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md
  },
  gridAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  gridItem: {
    flex: 1,
    alignItems: "center",
    gap: spacing.sm
  },
  gridIconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  walletCard: {
    marginBottom: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg
  },
  walletStat: {
    width: "22%",
    alignItems: "center",
    gap: spacing.xs
  },
  creatorBanner: {
    width: "100%",
    borderRadius: radius.lg,
    backgroundColor: colors.orangeLight,
    padding: spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md
  },
  shareButton: {
    minHeight: 44
  },
  bold: {
    fontWeight: "800"
  },
  pressed: {
    opacity: 0.72
  }
});
