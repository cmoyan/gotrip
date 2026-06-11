import { Image, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { shadows } from "../../constants/shadows";
import { spacing } from "../../constants/spacing";
import { Guide } from "../../types";
import { formatCompact } from "../../utils/format";
import { AppText } from "../ui/AppText";
import { IconSymbol } from "../ui/IconSymbol";

interface CommunityGuideCardProps {
  guide: Guide;
  onPress: () => void;
}

export function CommunityGuideCard({ guide, onPress }: CommunityGuideCardProps) {
  const tagColor = getGuideTagColor(guide.tag);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed ? styles.pressed : null]}>
      <View>
        <Image source={{ uri: guide.image }} style={[styles.image, { height: guide.height ?? 240 }]} />
        <View style={[styles.tag, { backgroundColor: tagColor }]}>
          <AppText variant="caption" color={colors.white}>
            {guide.tag}
          </AppText>
        </View>
      </View>
      <View style={styles.body}>
        <AppText variant="body" numberOfLines={2} style={styles.title}>
          {guide.title}
        </AppText>
        <View style={styles.meta}>
          <View style={styles.author}>
            <Image source={{ uri: guide.authorAvatar }} style={styles.avatar} />
            <AppText variant="caption" numberOfLines={1} style={styles.authorName}>
              {guide.author}
            </AppText>
          </View>
          <View style={styles.like}>
            <IconSymbol name="heart" size={16} color={colors.textMuted} />
            <AppText variant="caption">{formatCompact(guide.likes)}</AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: radius.md,
    backgroundColor: colors.card,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card
  },
  image: {
    width: "100%",
    resizeMode: "cover"
  },
  tag: {
    position: "absolute",
    left: spacing.md,
    top: spacing.md,
    minHeight: 28,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    justifyContent: "center"
  },
  body: {
    padding: spacing.md,
    gap: spacing.sm
  },
  title: {
    fontWeight: "800",
    lineHeight: 20
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm
  },
  author: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: radius.pill
  },
  authorName: {
    flex: 1
  },
  like: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs
  },
  pressed: {
    opacity: 0.82
  }
});

function getGuideTagColor(tag: string): string {
  if (tag.includes("美食") || tag.includes("打卡")) {
    return colors.orange;
  }
  if (tag.includes("周边")) {
    return colors.green;
  }
  return colors.primary;
}
