import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Screen } from "../components/layout/Screen";
import { AppButton } from "../components/ui/AppButton";
import { AppText } from "../components/ui/AppText";
import { colors } from "../constants/colors";
import { spacing } from "../constants/spacing";

export default function NotFoundScreen() {
  return (
    <Screen scroll={false}>
      <View style={styles.center}>
        <AppText variant="hero" color={colors.primary}>
          GoTrip
        </AppText>
        <AppText variant="subtitle">页面走丢了</AppText>
        <AppButton title="回到首页" onPress={() => router.replace("/")} style={styles.button} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg
  },
  button: {
    width: 180
  }
});
