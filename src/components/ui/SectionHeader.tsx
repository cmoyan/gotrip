import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { AppText } from "./AppText";
import { IconSymbol, IconSymbolName } from "./IconSymbol";

interface SectionHeaderProps {
  title: string;
  icon?: IconSymbolName;
  actionText?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, icon, actionText = "更多", onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.titleRow}>
        {icon ? <IconSymbol name={icon} size={20} color={colors.primary} /> : null}
        <AppText variant="subtitle">{title}</AppText>
      </View>
      {onAction ? (
        <Pressable onPress={onAction} style={styles.action}>
          <AppText variant="body" color={colors.textMuted}>
            {actionText}
          </AppText>
          <IconSymbol name="chevron-right" size={16} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs
  }
});
