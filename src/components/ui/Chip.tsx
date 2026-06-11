import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { AppText } from "./AppText";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  solidSelected?: boolean;
}

export function Chip({ label, selected = false, onPress, style, compact = false, solidSelected = false }: ChipProps) {
  const selectedTextColor = solidSelected ? colors.white : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? (solidSelected ? styles.solidSelected : styles.selected) : null,
        compact ? styles.compact : null,
        pressed ? styles.pressed : null,
        style
      ]}
    >
      <AppText variant="body" color={selected ? selectedTextColor : colors.textSecondary} style={selected ? styles.textSelected : null}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center"
  },
  compact: {
    minHeight: 30,
    paddingHorizontal: spacing.md
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight
  },
  solidSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary
  },
  textSelected: {
    fontWeight: "700"
  },
  pressed: {
    opacity: 0.78
  }
});
