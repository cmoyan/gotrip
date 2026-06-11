import { Image, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";
import { RouteNode } from "../../types";
import { AppText } from "../ui/AppText";

interface RouteMapMockProps {
  nodes: RouteNode[];
  height?: number;
}

export function RouteMapMock({ nodes, height = 420 }: RouteMapMockProps) {
  return (
    <View style={[styles.map, { height }]}>
      <View style={styles.regionA} />
      <View style={styles.regionB} />
      <View style={styles.regionC} />
      <AppText variant="caption" style={[styles.province, { left: "52%", top: "30%" }]}>
        安徽
      </AppText>
      <AppText variant="caption" style={[styles.province, { left: "30%", top: "42%" }]}>
        湖北
      </AppText>
      <AppText variant="caption" style={[styles.province, { left: "76%", top: "19%" }]}>
        江苏
      </AppText>
      <AppText variant="caption" style={[styles.province, { left: "72%", top: "57%" }]}>
        浙江
      </AppText>
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="route" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#0A5EDB" />
            <Stop offset="1" stopColor="#2F80FF" />
          </LinearGradient>
        </Defs>
        <Path
          d="M 86 25 C 76 35 67 35 58 39 C 50 43 48 52 42 55 C 35 59 33 67 25 56 C 20 52 16 57 14 60"
          stroke="url(#route)"
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M 83 31 C 70 41 60 46 47 57 C 36 66 23 66 14 60"
          stroke={colors.orange}
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 3"
          strokeLinecap="round"
        />
        {nodes.map((node) => (
          <Circle key={node.id} cx={node.x} cy={node.y} r={node.type === "start" || node.type === "end" ? 2.4 : 1.8} fill={colors.white} stroke={colors.primary} strokeWidth="0.8" />
        ))}
      </Svg>
      {nodes.map((node) => (
        <View key={node.id} style={[styles.node, { left: `${node.x}%`, top: `${node.y}%` }]}>
          {node.type === "start" || node.type === "end" ? (
            <View style={[styles.endpoint, node.type === "end" ? styles.end : null]}>
              <AppText variant="caption" color={colors.white} style={styles.endpointText}>
                {node.label}
              </AppText>
            </View>
          ) : (
            <Image source={{ uri: node.image }} style={styles.nodeImage} />
          )}
          <AppText variant="caption" style={styles.nodeName}>
            {node.name}
          </AppText>
        </View>
      ))}
      <View style={styles.legend}>
        <View style={styles.legendRow}>
          <View style={[styles.legendLine, { backgroundColor: colors.primary }]} />
          <AppText variant="caption">推荐路线</AppText>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: colors.orange }]} />
          <AppText variant="caption">备选路线</AppText>
        </View>
      </View>
      <View style={styles.floatControls}>
        <View style={styles.locateButton}>
          <AppText variant="title">⌖</AppText>
          <AppText variant="caption" style={styles.controlText}>定位</AppText>
        </View>
        <View style={styles.zoomBox}>
          <AppText variant="title">+</AppText>
          <View style={styles.zoomDivider} />
          <AppText variant="title">−</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    overflow: "hidden",
    backgroundColor: "#EAF6FF",
    position: "relative"
  },
  regionA: {
    position: "absolute",
    width: "58%",
    height: "58%",
    left: "8%",
    top: "18%",
    borderRadius: 200,
    backgroundColor: "#EEF8EF",
    transform: [{ rotate: "-10deg" }]
  },
  regionB: {
    position: "absolute",
    width: "55%",
    height: "68%",
    right: "-12%",
    top: "-5%",
    borderRadius: 220,
    backgroundColor: "#D9EEFF",
    transform: [{ rotate: "18deg" }]
  },
  regionC: {
    position: "absolute",
    width: "48%",
    height: "42%",
    left: "36%",
    bottom: "-8%",
    borderRadius: 180,
    backgroundColor: "#F4F8EA"
  },
  province: {
    position: "absolute",
    color: colors.textMuted,
    fontWeight: "700"
  },
  node: {
    position: "absolute",
    alignItems: "center",
    transform: [{ translateX: -36 }, { translateY: -28 }]
  },
  nodeImage: {
    width: 50,
    height: 50,
    borderRadius: radius.pill,
    borderWidth: 3,
    borderColor: colors.white
  },
  nodeName: {
    marginTop: spacing.xxs,
    color: colors.text,
    fontWeight: "800",
    textAlign: "center",
    textShadowColor: colors.white,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  endpoint: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  end: {
    backgroundColor: colors.orange
  },
  endpointText: {
    fontWeight: "900"
  },
  legend: {
    position: "absolute",
    left: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: radius.sm,
    padding: spacing.sm,
    gap: spacing.xs
  },
  floatControls: {
    position: "absolute",
    right: spacing.lg,
    top: "43%",
    alignItems: "center",
    gap: spacing.md
  },
  locateButton: {
    width: 64,
    height: 72,
    borderRadius: radius.lg,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center"
  },
  controlText: {
    color: colors.text
  },
  zoomBox: {
    width: 64,
    height: 112,
    borderRadius: radius.lg,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center"
  },
  zoomDivider: {
    width: 36,
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.sm
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  legendLine: {
    width: 18,
    height: 4,
    borderRadius: radius.pill
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill
  }
});
