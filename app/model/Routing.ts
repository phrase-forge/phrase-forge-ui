import { NavigationProp } from "@react-navigation/native";

export enum ApplicationRoute {
    LOGGED_LAYOUT = 'Logged',
    NOT_LOGGED_LAYOUT = 'Not Logged',
    LOGIN = 'Login',
    REGISTER = 'Register',
    HOME = 'Home',
    GAMES = 'Games',
    ACCOUNT = 'Account',
    SETTINGS = 'Settings',
    STATS = 'Stats',
    ACHIEVEMENTS = 'Achievements',
    ACTIVITY = 'Activity'
}

export interface RouterProps {
    navigation: NavigationProp<never, never>;
}