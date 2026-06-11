import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { colors } from "../../constants/colors";
import { typography } from "../../constants/typography";

type AppTextVariant =
  | "logo"
  | "hero"
  | "title"
  | "subtitle"
  | "bodyLarge"
  | "body"
  | "meta"
  | "caption";

interface AppTextProps extends PropsWithChildren<TextProps> {
  variant?: AppTextVariant;
  color?: string;
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
}

export function AppText({
  variant = "body",
  color,
  align,
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[styles.base, styles[variant], color ? { color } : null, align ? { textAlign: align } : null, style]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
    includeFontPadding: false
  },
  logo: {
    color: colors.primary,
    fontSize: typography.size.logo,
    lineHeight: typography.lineHeight.hero,
    fontWeight: typography.weight.heavy,
    fontStyle: "italic"
  },
  hero: {
    fontSize: typography.size.hero,
    lineHeight: typography.lineHeight.hero,
    fontWeight: typography.weight.heavy
  },
  title: {
    fontSize: typography.size.title,
    lineHeight: typography.lineHeight.title,
    fontWeight: typography.weight.bold
  },
  subtitle: {
    fontSize: typography.size.subtitle,
    lineHeight: typography.lineHeight.subtitle,
    fontWeight: typography.weight.bold
  },
  bodyLarge: {
    fontSize: typography.size.bodyLarge,
    lineHeight: typography.lineHeight.bodyLarge,
    fontWeight: typography.weight.medium
  },
  body: {
    fontSize: typography.size.body,
    lineHeight: typography.lineHeight.body,
    fontWeight: typography.weight.regular
  },
  meta: {
    fontSize: typography.size.meta,
    lineHeight: typography.lineHeight.caption,
    fontWeight: typography.weight.regular,
    color: colors.textMuted
  },
  caption: {
    fontSize: typography.size.caption,
    lineHeight: typography.lineHeight.caption,
    fontWeight: typography.weight.medium,
    color: colors.textMuted
  }
});
