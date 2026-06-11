import { Image, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { spacing } from "../../constants/spacing";
import { TripDay } from "../../types";
import { AppText } from "../ui/AppText";
import { Card } from "../ui/Card";
import { IconSymbol } from "../ui/IconSymbol";

interface TripDayCardProps {
  day: TripDay;
}

export function TripDayCard({ day }: TripDayCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.main}>
        <View style={styles.left}>
          <View style={styles.dayTitle}>
            <View style={styles.dayBadge}>
              <AppText variant="body" color={colors.white} style={styles.dayText}>
                {day.day}
              </AppText>
            </View>
            <AppText variant="bodyLarge" style={styles.title}>
              {day.title}
            </AppText>
          </View>
          <Image source={{ uri: day.image }} style={styles.image} />
        </View>
        <View style={styles.timeline}>
          {day.stops.map((stop, index) => (
            <View key={`${stop.time}-${stop.title}`} style={styles.stop}>
              <View style={styles.timeCol}>
                <View style={styles.dot} />
                {index < day.stops.length - 1 ? <View style={styles.line} /> : null}
              </View>
              <AppText variant="body" style={styles.time}>
                {stop.time}
              </AppText>
              <View style={styles.stopText}>
                <AppText variant="body" style={styles.stopTitle}>
                  {stop.title}
                </AppText>
                <AppText variant="caption" numberOfLines={2}>
                  {stop.description}
                </AppText>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.stats}>
          <Stat icon="walk" label="步行" value={`约 ${day.distanceKm} km`} />
          <Stat icon="restaurant" label="餐饮" value={`¥${day.foodCost}/人`} />
          <Stat icon="camera" label="打卡点" value={`${day.checkins}个`} />
        </View>
      </View>
    </Card>
  );
}

function Stat({ icon, label, value }: { icon: "walk" | "restaurant" | "camera"; label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <IconSymbol name={icon} color={colors.primary} size={20} />
      <AppText variant="body" style={styles.statLabel}>
        {label}
      </AppText>
      <AppText variant="caption">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderRadius: radius.lg
  },
  main: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "stretch"
  },
  left: {
    width: 128
  },
  dayTitle: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.sm
  },
  dayBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.xs
  },
  dayText: {
    fontWeight: "800"
  },
  title: {
    flex: 1,
    fontWeight: "800"
  },
  image: {
    width: "100%",
    height: 102,
    borderRadius: radius.md
  },
  timeline: {
    flex: 1,
    gap: spacing.xxs
  },
  stop: {
    flexDirection: "row",
    minHeight: 41
  },
  timeCol: {
    width: 16,
    alignItems: "center"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginTop: 5
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.primary,
    marginTop: 2
  },
  time: {
    width: 46,
    fontWeight: "600"
  },
  stopText: {
    flex: 1
  },
  stopTitle: {
    fontWeight: "800"
  },
  stats: {
    width: 80,
    borderRadius: radius.md,
    backgroundColor: colors.cardSoft,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
    ...shadows.card
  },
  stat: {
    alignItems: "center",
    gap: spacing.xxs
  },
  statLabel: {
    fontWeight: "700"
  }
});
