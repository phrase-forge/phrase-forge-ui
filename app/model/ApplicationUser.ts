import { User } from "firebase/auth";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface ApplicationUser {
    user: User  | null;
    roles?: UserRole[];
    stats?: UserStats;
    preferences?: UserPreferences;
}

export type UserPreferences = {
    username: string,
    language: Language,
    level: Level,
    category: Category,
    notificationSettings: NotificationSettings,
    soundSettings: SoundSettings
};

export enum Language {
    ENGLISH = 'EN',
    POLISH = 'PL',
}

export enum Level {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    ADVANCED = 'Advanced'
}

export enum Category {
    GENERAL = 'General',
    HEALTH = 'Health',
}

export type Settings = {
    enable: boolean
}

export type NotificationSettings = Settings;

// 0-100
export type VolumeRange = Range<101>;
export type SoundSettings =
    | { enable: true, volume: VolumeRange }
    | { enable: false, volume?: VolumeRange };

type Range<N extends number, Acc extends number[] = []> =
    Acc['length'] extends N ? Acc[number] : Range<N, [...Acc, Acc['length']]>;

export interface UserStats {
    achievements: UserAchievement[];
    commonStats: CommonStats;
    gameStats: GameStatistic[];
    finishedTasksIds: string[];
}

export interface UserAchievement {
    game: string;
    type: 'Bronze' | 'Silver' | 'Gold';
    date: Timestamp;
}

export interface GameStatistic {
    name: string;
    currentScore: number;
    maxScore: number;
}

export interface CommonStats {
    totalPoints: number;
    minutesToday: number;
    minutesTotal: number;
    daysInRow: number;
}

export enum UserRole {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    USER = 'USER'
}
export interface GameStatistic {
    name: string;
    currentScore: number;
    maxScore: number;
}
export interface QuizTask{
    answers: string[];
    category: string;
    difficultyLevel: number;
    phraseology: string;
    type: string;
    id: string;
}
export interface TranslateTask{
    answer: string;
    category: string;
    difficultyLevel: number;
    phraseology: string;
    type: string;
    id: string;
}
export interface GapsTask{
    answers: string[];
    category: string;
    difficultyLevel: number;
    phraseology: string;
    type: string;
    gaps: string;
    id: string;
}

export interface PicturesTask{
    answers: string[];
    category: string;
    difficultyLevel: number;
    phraseology: string;
    type: string;
    id: string;
    photo: string;
}
export interface PairsTask{
    category: string;
    difficultyLevel: number;
    type: string;
    id: string;
    pair1: string[];
    pair2: string[];
    pair3: string[];
}

export interface SequenceTask {
    meaning: string;
    type: string;
    id: string;
    words: string[];
}
