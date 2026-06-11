import { PropsWithChildren } from "react";
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/spacing";

interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  padded?: boolean;
  bottomSpace?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function Screen({
  children,
  scroll = true,
  padded = true,
  bottomSpace = 32,
  style,
  contentStyle
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const containerStyle = [
    styles.container,
    {
      paddingTop: insets.top + spacing.md
    },
    padded ? styles.padded : null,
    style
  ];

  if (!scroll) {
    return (
      <View style={containerStyle}>
        <StatusBar style="dark" />
        {children}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.md,
            paddingBottom: insets.bottom + bottomSpace
          },
          padded ? styles.padded : null,
          contentStyle
        ]}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  padded: {
    paddingHorizontal: spacing.lg
  },
  scrollContent: {
    backgroundColor: colors.background
  }
});
