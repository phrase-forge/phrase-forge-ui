import { NavigationProp } from "@react-navigation/native";

export enum ApplicationRoute {
    // auth
    LOGGED_LAYOUT = 'Logged',
    NOT_LOGGED_LAYOUT = 'Not Logged',
    LOGIN = 'Login',
    REGISTER = 'Register',

    // base path
    HOME = '/home',
    GAMES = '/games',
    ACCOUNT = '/account',
    SETTINGS = '/settings',
    QUIZ_VIEW = '/quiz_view',
    TRANSLATE_VIEW = '/translate_view',
    

    // games
    GAMES_VIEW = `${ApplicationRoute.GAMES}/list`,

    //game

    QUIZ = `${ApplicationRoute.GAMES}/quiz`,
    TRANSLATE = `${ApplicationRoute.GAMES}/translate`,
    ENDGAME = `${ApplicationRoute.GAMES}/endOfGame`,

    // account
    STATS = `${ApplicationRoute.ACCOUNT}/stats`,
    ACHIEVEMENTS = `${ApplicationRoute.ACCOUNT}/achievements`,
    ACTIVITY = `${ApplicationRoute.ACCOUNT}/activity`
}

export interface RouterProps {
    navigation: NavigationProp<never, never>;
}