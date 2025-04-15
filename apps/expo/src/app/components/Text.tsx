import { Text as RNText, StyleSheet, TextProps } from "react-native";
import { useFonts } from "expo-font";
import clsx from "clsx";

interface CustomTextProps extends TextProps {
  className?: string;
}

export default function Text({ style, className, ...props }: CustomTextProps) {
  const [fontsloaded] = useFonts({
    Raleway: require("../../../assets/fonts/Raleway.ttf"),
  });
  return (
    <RNText
      {...props}
      style={[styles.default, style]}
      className={clsx(className)}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "Sora",
  },
});
