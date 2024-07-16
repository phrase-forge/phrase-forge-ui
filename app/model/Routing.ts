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
    GAME = '/game',
    

    // games
    GAMES_VIEW = `${ApplicationRoute.GAMES}/list`,

    //game
    
    QUIZ = `${ApplicationRoute.GAME}/quiz`,
    ENDGAME = `${ApplicationRoute.GAME}/endOfGame`,

    // account
    STATS = `${ApplicationRoute.ACCOUNT}/stats`,
    ACHIEVEMENTS = `${ApplicationRoute.ACCOUNT}/achievements`,
    ACTIVITY = `${ApplicationRoute.ACCOUNT}/activity`
}

export interface RouterProps {
    navigation: NavigationProp<never, never>;
}