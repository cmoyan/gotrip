import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { layout } from "../../constants/layout";
import { spacing } from "../../constants/spacing";
import { FeatureEntry } from "../../types";
import { Card } from "../ui/Card";
import { AppText } from "../ui/AppText";
import { IconSymbol } from "../ui/IconSymbol";

interface FeatureGridProps {
  items: FeatureEntry[];
  onPress: (id: string) => void;
}

const accentMap = {
  blue: { bg: colors.primaryLight, fg: colors.primary },
  orange: { bg: colors.orangeLight, fg: colors.orange },
  green: { bg: colors.greenLight, fg: colors.green },
  purple: { bg: colors.purpleLight, fg: colors.purple }
} as const;

export function FeatureGrid({ items, onPress }: FeatureGridProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.grid}>
        {items.map((item) => {
          const accent = accentMap[item.accent ?? "blue"];
          return (
            <Pressable key={item.id} style={({ pressed }) => [styles.item, pressed ? styles.pressed : null]} onPress={() => onPress(item.id)}>
              <View style={[styles.iconBox, { backgroundColor: accent.bg }]}>
                <IconSymbol name={item.icon} color={accent.fg} size={28} />
              </View>
              {item.badge ? (
                <View style={styles.badge}>
                  <AppText variant="caption" color={colors.white}>
                    {item.badge}
                  </AppText>
                </View>
              ) : null}
              <AppText variant="body" align="center" style={styles.label}>
                {item.title}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.md,
    paddingVertical: layout.featureCardVertical,
    borderRadius: radius.xl
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  item: {
    width: "25%",
    alignItems: "center",
    paddingVertical: spacing.md,
    position: "relative"
  },
  iconBox: {
    width: layout.featureIconSize,
    height: layout.featureIconSize,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
    ...shadows.card
  },
  badge: {
    position: "absolute",
    top: spacing.xs,
    right: 8,
    backgroundColor: colors.orange,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radius.pill
  },
  label: {
    fontWeight: "600"
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }]
  }
});
