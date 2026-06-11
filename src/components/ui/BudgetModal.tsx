import { Modal, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { spacing } from "../../constants/spacing";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";
import { IconSymbol } from "./IconSymbol";

interface BudgetModalProps {
  visible: boolean;
  onClose: () => void;
}

const rows = [
  { label: "交通", amount: "¥1,346", icon: "train" },
  { label: "住宿", amount: "¥960", icon: "bed" },
  { label: "餐饮", amount: "¥420", icon: "restaurant" },
  { label: "门票", amount: "¥254", icon: "ticket" }
] as const;

export function BudgetModal({ visible, onClose }: BudgetModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.panel}>
          <View style={styles.header}>
            <View>
              <AppText variant="title">预算助手</AppText>
              <AppText variant="body" color={colors.textSecondary}>
                上海3天2晚预算预估
              </AppText>
            </View>
            <Pressable onPress={onClose} style={styles.close}>
              <IconSymbol name="add" size={26} color={colors.textSecondary} />
            </Pressable>
          </View>
          <View style={styles.totalBox}>
            <AppText variant="body" color={colors.textSecondary}>
              预计总预算
            </AppText>
            <AppText variant="hero" color={colors.orange}>
              ¥2,980/人
            </AppText>
          </View>
          {rows.map((row) => (
            <View key={row.label} style={styles.row}>
              <View style={styles.iconBox}>
                <IconSymbol name={row.icon} size={19} color={colors.primary} />
              </View>
              <AppText variant="bodyLarge" style={styles.rowLabel}>
                {row.label}
              </AppText>
              <AppText variant="bodyLarge" color={colors.textSecondary}>
                {row.amount}
              </AppText>
            </View>
          ))}
          <AppButton title="知道了" onPress={onClose} style={styles.button} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(17,24,39,0.35)",
    justifyContent: "flex-end",
    padding: spacing.lg
  },
  panel: {
    borderRadius: radius.xl,
    backgroundColor: colors.card,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadows.floating
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.cardSoft,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "45deg" }]
  },
  totalBox: {
    borderRadius: radius.lg,
    backgroundColor: colors.orangeLight,
    padding: spacing.lg,
    gap: spacing.xs
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center"
  },
  rowLabel: {
    flex: 1,
    fontWeight: "800"
  },
  button: {
    marginTop: spacing.sm
  }
});
