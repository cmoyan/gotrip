import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { spacing } from "../../constants/spacing";
import { AppText } from "../ui/AppText";
import { IconSymbol } from "../ui/IconSymbol";

interface BudgetAssistantBarProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function BudgetAssistantBar({ onPress, style }: BudgetAssistantBarProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.bar, pressed ? styles.pressed : null, style]}>
      <View style={styles.bot}>
        <IconSymbol name="sparkles" color={colors.primary} size={26} />
      </View>
      <View style={styles.main}>
        <AppText variant="bodyLarge" style={styles.title}>
          预算助手
        </AppText>
        <AppText variant="caption" numberOfLines={1}>智能估算旅行花费，合理规划预算</AppText>
      </View>
      <View style={styles.price}>
        <AppText variant="caption" numberOfLines={1}>上海3天2晚预算预估</AppText>
        <AppText variant="subtitle" color={colors.orange}>
          ¥2,980/人
        </AppText>
      </View>
      <View style={styles.button}>
        <AppText variant="body" color={colors.orange} style={styles.buttonText}>
          立即估算
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    minHeight: 70,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#BBD8FF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    ...shadows.floating
  },
  bot: {
    width: 48,
    height: 48,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    flex: 1,
    minWidth: 0
  },
  title: {
    fontWeight: "800"
  },
  price: {
    width: 98,
    alignItems: "flex-start"
  },
  button: {
    borderWidth: 1,
    borderColor: colors.orange,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  buttonText: {
    fontWeight: "700"
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92
  }
});
