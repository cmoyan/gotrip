import { Image, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { layout } from "../../constants/layout";
import { spacing } from "../../constants/spacing";
import { Guide } from "../../types";
import { formatCompact } from "../../utils/format";
import { AppText } from "../ui/AppText";
import { IconSymbol } from "../ui/IconSymbol";

interface GuideRowProps {
  guide: Guide;
  onPress?: () => void;
}

export function GuideRow({ guide, onPress }: GuideRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}>
      <Image source={{ uri: guide.image }} style={styles.image} />
      <View style={styles.content}>
        <AppText variant="bodyLarge" numberOfLines={1} style={styles.title}>
          {guide.title}
        </AppText>
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <AppText variant="caption" color={colors.primary}>
              {guide.tag}
            </AppText>
          </View>
          <AppText variant="caption">{guide.author}</AppText>
        </View>
      </View>
      <View style={styles.views}>
        <IconSymbol name="eye" size={16} color={colors.textMuted} />
        <AppText variant="caption">{guide.views ?? `${formatCompact(guide.likes)}赞`}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    minHeight: 74,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider
  },
  image: {
    width: layout.guideThumbWidth,
    height: layout.guideThumbHeight,
    borderRadius: radius.sm,
    marginRight: spacing.md
  },
  content: {
    flex: 1
  },
  title: {
    fontWeight: "800",
    marginBottom: spacing.xs
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radius.xs
  },
  views: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    marginLeft: spacing.sm,
    minWidth: 54,
    justifyContent: "flex-end"
  },
  pressed: {
    opacity: 0.75
  }
});
