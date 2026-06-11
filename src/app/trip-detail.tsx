import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { BottomActionBar } from "../components/layout/BottomActionBar";
import { Header } from "../components/layout/Header";
import { Screen } from "../components/layout/Screen";
import { BudgetDonut } from "../components/cards/BudgetDonut";
import { TripDayCard } from "../components/cards/TripDayCard";
import { AppButton } from "../components/ui/AppButton";
import { AppText } from "../components/ui/AppText";
import { Card } from "../components/ui/Card";
import { IconSymbol } from "../components/ui/IconSymbol";
import { SectionHeader } from "../components/ui/SectionHeader";
import { colors } from "../constants/colors";
import { radius } from "../constants/radius";
import { spacing } from "../constants/spacing";
import { tripService } from "../services/tripService";
import { useTripStore } from "../store/useTripStore";
import { Booking, Trip } from "../types";
import { showToast } from "../utils/toast";

export default function TripDetailScreen() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const favoriteTripIds = useTripStore((state) => state.favoriteTripIds);
  const toggleFavoriteTrip = useTripStore((state) => state.toggleFavoriteTrip);
  const joinTrip = useTripStore((state) => state.joinTrip);
  const joinedTripIds = useTripStore((state) => state.joinedTripIds);
  const isFavorite = trip ? favoriteTripIds.includes(trip.id) : false;
  const isJoined = trip ? joinedTripIds.includes(trip.id) : false;

  useEffect(() => {
    async function load() {
      setTrip(await tripService.getTripDetail());
    }

    void load();
  }, []);

  if (!trip) {
    return (
      <Screen scroll={false}>
        <View style={styles.loading}>
          <AppText variant="title">正在加载行程...</AppText>
        </View>
      </Screen>
    );
  }

  function handleJoin() {
    if (!trip) {
      return;
    }
    joinTrip(trip.id);
    showToast(isJoined ? "行程已在我的行程中" : "已一键加入我的行程");
  }

  return (
    <View style={styles.root}>
      <Screen bottomSpace={126}>
        <Header title={trip.title} rightLabel="•••" />
        <Card padded={false} style={styles.heroCard}>
          <Image source={{ uri: trip.cover }} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={["rgba(255,255,255,0.98)", "rgba(255,255,255,0.76)", "rgba(255,255,255,0.08)"]} style={StyleSheet.absoluteFill} />
          <View style={styles.heroContent}>
            <AppText variant="subtitle">{trip.dateRange}</AppText>
            <View style={styles.infoLine}>
              <IconSymbol name="person" size={18} />
              <AppText variant="bodyLarge">{trip.companion}</AppText>
              <View style={styles.verticalLine} />
              <IconSymbol name="location" size={18} />
              <AppText variant="bodyLarge">{trip.travelStyle}</AppText>
            </View>
            <View style={styles.actions}>
              <ActionPill
                icon={isFavorite ? "star-filled" : "star"}
                label={isFavorite ? "已收藏" : "收藏"}
                onPress={() => toggleFavoriteTrip(trip.id)}
              />
              <ActionPill icon="share" label="分享" onPress={() => showToast("分享面板暂未接入")} />
              <ActionPill icon="download" label="导出PDF" onPress={() => showToast("PDF 导出将在接后端后生成")} />
            </View>
          </View>
        </Card>

        <SectionHeader title="每日行程安排" actionText="查看地图" onAction={() => router.push("/map")} />
        {trip.days.map((day) => (
          <TripDayCard key={day.day} day={day} />
        ))}

        <Card style={styles.section}>
          <SectionHeader title="预算明细（2人·3天2晚）" actionText="预算说明" onAction={() => showToast("预算由交通、住宿、餐饮、门票组成")} />
          <BudgetDonut items={trip.budget} total={trip.totalBudget} />
        </Card>

        <Card style={styles.section}>
          <SectionHeader title="已包含预订" />
          <View style={styles.bookingRow}>
            {trip.bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </View>
        </Card>
      </Screen>
      <BottomActionBar>
        <AppButton title={isJoined ? "已加入我的行程" : "一键加入我的行程"} onPress={handleJoin} style={styles.joinButton} />
      </BottomActionBar>
    </View>
  );
}

function ActionPill({
  icon,
  label,
  onPress
}: {
  icon: "star" | "star-filled" | "share" | "download";
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.actionPill, pressed ? styles.pressed : null]}>
      <IconSymbol name={icon} size={20} />
      <AppText variant="body">{label}</AppText>
    </Pressable>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const icon = booking.type === "train" ? "train" : booking.type === "hotel" ? "bed" : "ticket";
  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHead}>
        <IconSymbol name={icon} color={colors.primary} />
        <AppText variant="bodyLarge" style={styles.bold}>
          {booking.title}
        </AppText>
        <View style={styles.confirmed}>
          <AppText variant="caption" color={colors.green}>
            {booking.status}
          </AppText>
        </View>
      </View>
      <AppText variant="caption" style={styles.bookingDetail}>
        {booking.detail}
      </AppText>
      <AppText variant="body" color={colors.primary} style={styles.bold}>
        查看详情
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  heroCard: {
    height: 190,
    overflow: "hidden",
    borderRadius: radius.lg,
    marginBottom: spacing.lg
  },
  heroContent: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.sm
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  verticalLine: {
    width: 1,
    height: 16,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  actionPill: {
    minHeight: 40,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  section: {
    marginTop: spacing.md,
    borderRadius: radius.lg
  },
  bookingRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  bookingCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.sm
  },
  bookingHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  confirmed: {
    marginLeft: "auto",
    borderRadius: radius.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    backgroundColor: colors.greenLight
  },
  bookingDetail: {
    minHeight: 42
  },
  bold: {
    fontWeight: "800"
  },
  joinButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: radius.lg
  },
  pressed: {
    opacity: 0.75
  }
});
