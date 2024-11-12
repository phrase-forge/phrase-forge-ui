import { NavigationProp } from "@react-navigation/native";

export enum ApplicationRoute {
    // auth
    LOGGED_LAYOUT = 'Logged',
    NOT_LOGGED_LAYOUT = 'Not Logged',
    LOGIN = 'Login',
    REGISTER = 'Register',
    PREFERENCES = 'Preferences',

    // base path
    HOME = '/home',
    GAMES = '/games',
    DICTIONARY = '/dictionary',
    ACCOUNT = '/account',
    SETTINGS = '/settings',
    QUIZ_VIEW = '/quiz_view',
    TRANSLATE_VIEW = '/translate_view',
    GAPS_VIEW = '/gaps_view',
    PICTURES_VIEW = '/pictures_view',
    PAIRS_VIEW = '/pairs_view',
    SEQUENCE_VIEW = '/sequence_view',
    

    // games
    GAMES_VIEW = `${ApplicationRoute.GAMES}/list`,

    //game
    QUIZ = `${ApplicationRoute.GAMES}/quiz`,
    TRANSLATE = `${ApplicationRoute.GAMES}/translate`,
    ENDGAME = `${ApplicationRoute.GAMES}/endOfGame`,
    GAPS = `${ApplicationRoute.GAMES}/gaps`,
    PICTURES = `${ApplicationRoute.GAMES}/pictures`,
    PAIRS = `${ApplicationRoute.GAMES}/pairs`,
    SEQUENCE = `${ApplicationRoute.GAMES}/sequence`,

    // account
    STATS = `${ApplicationRoute.ACCOUNT}/stats`,
    ACHIEVEMENTS = `${ApplicationRoute.ACCOUNT}/achievements`,
    ACTIVITY = `${ApplicationRoute.ACCOUNT}/activity`,

    // settings
    SETTINGS_VIEW = `${ApplicationRoute.SETTINGS}/settings_view`,
    CHANGE_PASSWORD_VIEW = `${ApplicationRoute.PREFERENCES}/change_password_view`,
}

export interface RouterProps {
    navigation: NavigationProp<never, never>;
}