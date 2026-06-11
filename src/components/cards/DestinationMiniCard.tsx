import { Image, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { layout } from "../../constants/layout";
import { spacing } from "../../constants/spacing";
import { DestinationCardData } from "../../types";
import { AppText } from "../ui/AppText";
import { Card } from "../ui/Card";
import { IconSymbol } from "../ui/IconSymbol";

interface DestinationMiniCardProps {
  item: DestinationCardData;
  width?: number;
  imageHeight?: number;
  onPress?: () => void;
}

export function DestinationMiniCard({ item, width = 148, imageHeight = layout.destinationImageHeight, onPress }: DestinationMiniCardProps) {
  const tagColor = getTagColor(item.tag);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed ? styles.pressed : null]}>
      <Card padded={false} style={[styles.card, { width }]}>
        <View>
          <Image source={{ uri: item.image }} style={[styles.image, { height: imageHeight }]} />
          {item.tag ? (
            <View style={[styles.tag, { backgroundColor: tagColor }]}>
              <AppText variant="caption" color={colors.white}>
                {item.tag}
              </AppText>
            </View>
          ) : null}
          {item.distance ? (
            <View style={styles.distance}>
              <IconSymbol name="location" color={colors.white} size={12} />
              <AppText variant="caption" color={colors.white}>
                {item.distance}
              </AppText>
            </View>
          ) : null}
        </View>
        <View style={styles.body}>
          <AppText variant="body" numberOfLines={1} style={styles.name}>
            {item.name}
          </AppText>
          <View style={styles.metaRow}>
            {item.rating ? (
              <>
                <IconSymbol name="star-filled" color={colors.orange} size={13} />
                <AppText variant="caption" color={colors.orange}>
                  {item.rating.toFixed(1)}分
                </AppText>
              </>
            ) : null}
            <AppText variant="caption" numberOfLines={1} style={styles.metaText}>
              {item.visitedText ?? item.subtitle}
            </AppText>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    marginRight: spacing.md,
    borderRadius: radius.md
  },
  image: {
    width: "100%",
    height: layout.destinationImageHeight,
    resizeMode: "cover"
  },
  tag: {
    position: "absolute",
    left: spacing.sm,
    top: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    backgroundColor: colors.primary,
    borderRadius: radius.pill
  },
  distance: {
    position: "absolute",
    left: spacing.sm,
    bottom: spacing.sm,
    backgroundColor: "rgba(17,24,39,0.48)",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill
  },
  body: {
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm
  },
  name: {
    fontWeight: "700",
    marginBottom: spacing.xs
  },
  metaRow: {
    minHeight: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs
  },
  metaText: {
    flex: 1
  },
  pressed: {
    opacity: 0.82
  }
});

function getTagColor(tag?: string): string {
  if (!tag) {
    return colors.primary;
  }
  if (tag.includes("人气") || tag.includes("TOP")) {
    return colors.orange;
  }
  if (tag.includes("文化") || tag.includes("机位")) {
    return colors.green;
  }
  return colors.primary;
}
