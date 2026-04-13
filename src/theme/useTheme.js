import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';

export const useTheme = () => {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    const colors = isDark ? darkColors : lightColors;

    return {
        isDark,
        colors,
    };
};