import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";
import { BudgetItem } from "../../types";
import { formatCurrency } from "../../utils/format";
import { AppText } from "../ui/AppText";
import { IconSymbol } from "../ui/IconSymbol";

interface BudgetDonutProps {
  items: BudgetItem[];
  total: number;
}

const size = 122;
const strokeWidth = 20;
const radiusValue = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radiusValue;

export function BudgetDonut({ items, total }: BudgetDonutProps) {
  let offset = 0;
  return (
    <View style={styles.wrap}>
      <View style={styles.donut}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radiusValue}
            stroke={colors.divider}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {items
            .filter((item) => item.percent > 0)
            .map((item) => {
              const dash = (item.percent / 100) * circumference;
              const dashOffset = -offset;
              offset += dash;
              return (
                <Circle
                  key={item.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radiusValue}
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="butt"
                  fill="none"
                  rotation="-90"
                  origin={`${size / 2}, ${size / 2}`}
                />
              );
            })}
        </Svg>
        <View style={styles.center}>
          <AppText variant="caption">总预算</AppText>
          <AppText variant="subtitle">{formatCurrency(total)}</AppText>
        </View>
      </View>
      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={[styles.iconBox, { backgroundColor: item.color }]}>
              <IconSymbol name={item.icon} color={colors.white} size={14} />
            </View>
            <AppText variant="body" style={styles.label}>
              {item.label}
            </AppText>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${item.percent}%`, backgroundColor: item.color }]} />
            </View>
            <AppText variant="body" align="right" style={styles.amount}>
              {formatCurrency(item.amount)}
            </AppText>
            <AppText variant="caption" align="right" style={styles.percent}>
              {item.percent}%
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  donut: {
    width: size,
    height: size,
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    position: "absolute",
    alignItems: "center"
  },
  list: {
    flex: 1,
    gap: spacing.xs
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  iconBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    width: 64,
    fontWeight: "600"
  },
  track: {
    flex: 1,
    height: 6,
    borderRadius: 5,
    backgroundColor: colors.divider,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: 5
  },
  amount: {
    width: 62,
    fontWeight: "600"
  },
  percent: {
    width: 32
  }
});
