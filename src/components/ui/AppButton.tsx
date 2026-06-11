import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { spacing } from "../../constants/spacing";
import { AppText } from "./AppText";
import { IconSymbol, IconSymbolName } from "./IconSymbol";

type ButtonVariant = "primary" | "outline" | "ghost" | "orange";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: IconSymbolName;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function AppButton({
  title,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  style
}: AppButtonProps) {
  const isSolid = variant === "primary" || variant === "orange";
  const textColor = isSolid ? colors.white : variant === "outline" ? colors.primary : colors.textSecondary;
  const iconColor = textColor;

  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        disabled ? styles.disabled : null,
        pressed ? styles.pressed : null,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon ? <IconSymbol name={icon} size={20} color={iconColor} /> : null}
          <AppText variant="bodyLarge" color={textColor} style={styles.title}>
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.xl
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.floating
  },
  orange: {
    backgroundColor: colors.orange
  },
  outline: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary
  },
  ghost: {
    backgroundColor: colors.primaryLight
  },
  disabled: {
    opacity: 0.5
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9
  },
  title: {
    fontWeight: "700"
  }
});
