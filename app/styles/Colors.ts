import { DefaultTheme } from "react-native-paper";

export const DEFAULT_COLORS = {
    primaryDark: '#1F1F39',
    primaryGray: '#858597',
    secondaryGray: '#B8B8D2',
    primaryBlue: '#68AFBF',
    primaryWhite: '#FFFFFF',
    primaryPink: '#ffe4e1',
};

export const DEFAULT_THEME = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: DEFAULT_COLORS.primaryBlue
    }
};