import { useState } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "../components/layout/Screen";
import { Header } from "../components/layout/Header";
import { AppText } from "../components/ui/AppText";
import { Card } from "../components/ui/Card";
import { IconSymbol, IconSymbolName } from "../components/ui/IconSymbol";
import { colors } from "../constants/colors";
import { radius } from "../constants/radius";
import { spacing } from "../constants/spacing";
import { showToast } from "../utils/toast";

interface SettingRow {
  label: string;
  icon: IconSymbolName;
  type: "toggle" | "link";
  value?: boolean;
}

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(true);

  return (
    <Screen bottomSpace={32}>
      <Header title="设置" />

      <AppText variant="subtitle" style={styles.sectionTitle}>
        账号信息
      </AppText>
      <Card style={styles.groupCard}>
        <Pressable
          onPress={() => showToast("账号信息编辑暂未开放")}
          style={({ pressed }) => [styles.row, styles.borderBottom, pressed ? styles.pressed : null]}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
              <IconSymbol name="person" size={20} color={colors.primary} />
            </View>
            <View>
              <AppText variant="bodyLarge">个人信息</AppText>
              <AppText variant="caption" color={colors.textMuted}>
                修改头像、昵称、手机号
              </AppText>
            </View>
          </View>
          <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
        <Pressable
          onPress={() => showToast("账号绑定管理暂未开放")}
          style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.orangeLight }]}>
              <IconSymbol name="wallet" size={20} color={colors.orange} />
            </View>
            <View>
              <AppText variant="bodyLarge">账号绑定</AppText>
              <AppText variant="caption" color={colors.textMuted}>
                微信、支付宝绑定管理
              </AppText>
            </View>
          </View>
          <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
      </Card>

      <AppText variant="subtitle" style={styles.sectionTitle}>
        通知与隐私
      </AppText>
      <Card style={styles.groupCard}>
        <View style={[styles.row, styles.borderBottom]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.greenLight }]}>
              <IconSymbol name="bell" size={20} color={colors.green} />
            </View>
            <AppText variant="bodyLarge">推送通知</AppText>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor={colors.white}
          />
        </View>
        <View style={[styles.row, styles.borderBottom]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.purpleLight }]}>
              <IconSymbol name="eye" size={20} color={colors.purple} />
            </View>
            <AppText variant="bodyLarge">隐私模式</AppText>
          </View>
          <Switch
            value={privateMode}
            onValueChange={setPrivateMode}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor={colors.white}
          />
        </View>
        <Pressable
          onPress={() => showToast("隐私设置详情暂未开放")}
          style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
              <IconSymbol name="lock" size={20} color={colors.primary} />
            </View>
            <AppText variant="bodyLarge">隐私设置</AppText>
          </View>
          <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
      </Card>

      <AppText variant="subtitle" style={styles.sectionTitle}>
        通用设置
      </AppText>
      <Card style={styles.groupCard}>
        <View style={[styles.row, styles.borderBottom]}>
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.orangeLight }]}>
              <IconSymbol name="wifi" size={20} color={colors.orange} />
            </View>
            <AppText variant="bodyLarge">仅Wi-Fi下载</AppText>
          </View>
          <Switch
            value={wifiOnly}
            onValueChange={setWifiOnly}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor={colors.white}
          />
        </View>
        <Pressable
          onPress={() => showToast("语言切换暂未开放")}
          style={({ pressed }) => [styles.row, styles.borderBottom, pressed ? styles.pressed : null]}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.greenLight }]}>
              <IconSymbol name="globe" size={20} color={colors.green} />
            </View>
            <AppText variant="bodyLarge">语言</AppText>
          </View>
          <View style={styles.rowRight}>
            <AppText variant="body" color={colors.textMuted}>
              简体中文
            </AppText>
            <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => showToast("缓存已清理")}
          style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.purpleLight }]}>
              <IconSymbol name="trash" size={20} color={colors.purple} />
            </View>
            <View>
              <AppText variant="bodyLarge">清理缓存</AppText>
              <AppText variant="caption" color={colors.textMuted}>
                当前缓存 23.5MB
              </AppText>
            </View>
          </View>
          <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
      </Card>

      <AppText variant="subtitle" style={styles.sectionTitle}>
        关于
      </AppText>
      <Card style={styles.groupCard}>
        <Pressable
          onPress={() => showToast("帮助与反馈页面暂未开放")}
          style={({ pressed }) => [styles.row, styles.borderBottom, pressed ? styles.pressed : null]}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.primaryLight }]}>
              <IconSymbol name="help" size={20} color={colors.primary} />
            </View>
            <AppText variant="bodyLarge">帮助与反馈</AppText>
          </View>
          <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
        <Pressable
          onPress={() => showToast("GoTrip v1.0.0")}
          style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}
        >
          <View style={styles.rowLeft}>
            <View style={[styles.iconBox, { backgroundColor: colors.orangeLight }]}>
              <IconSymbol name="info" size={20} color={colors.orange} />
            </View>
            <View>
              <AppText variant="bodyLarge">关于 GoTrip</AppText>
              <AppText variant="caption" color={colors.textMuted}>
                版本 1.0.0
              </AppText>
            </View>
          </View>
          <IconSymbol name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
      </Card>

      <Pressable
        onPress={() => showToast("退出登录成功")}
        style={({ pressed }) => [styles.logoutBtn, pressed ? styles.pressed : null]}
      >
        <AppText variant="bodyLarge" color={colors.red} style={{ fontWeight: "700" }}>
          退出登录
        </AppText>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  groupCard: {
    padding: 0,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  pressed: {
    opacity: 0.72,
  },
  logoutBtn: {
    marginTop: spacing.xxxl,
    marginBottom: spacing.xl,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
});
