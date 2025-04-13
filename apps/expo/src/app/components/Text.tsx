import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import clsx from 'clsx';
import { useFonts } from 'expo-font';

interface CustomTextProps extends TextProps {
    className?: string;
}

export default function Text({ style, className, ...props }: CustomTextProps) {

    const [fontsloaded] = useFonts({
        'Raleway': require('../../../assets/fonts/Raleway.ttf'),
    })
    return <RNText {...props} style={[styles.default, style]} className={clsx(className)} />;
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Sora',
    },
});
