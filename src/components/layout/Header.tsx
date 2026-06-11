import { Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { AppText } from "../ui/AppText";
import { IconSymbol, IconSymbolName } from "../ui/IconSymbol";

interface HeaderProps {
  title: string;
  rightLabel?: string;
  rightIcon?: IconSymbolName;
  onRightPress?: () => void;
}

export function Header({ title, rightLabel, rightIcon, onRightPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.iconButton}>
        <IconSymbol name="chevron-back" size={30} color={colors.text} />
      </Pressable>
      <AppText variant="title" align="center" style={styles.title}>
        {title}
      </AppText>
      <Pressable onPress={onRightPress} style={styles.right}>
        {rightIcon ? <IconSymbol name={rightIcon} size={24} color={colors.text} /> : null}
        {rightLabel ? (
          <AppText variant="body" color={colors.primary} style={styles.rightText}>
            {rightLabel}
          </AppText>
        ) : null}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  title: {
    flex: 1
  },
  right: {
    width: 72,
    minHeight: 44,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs
  },
  rightText: {
    fontWeight: "700"
  }
});
