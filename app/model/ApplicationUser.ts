import { User } from "firebase/auth";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface ApplicationUser {
    user: User | null;
    roles?: UserRole[];
    username?: string;
    stats?: UserStats;
}

export interface UserStats {
    achievements: UserAchievement[];
    commonStats: Map<string, string>;
    gameStats: GameStatistic[];
    tasksStats: string[];
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
    dificulty_level: number;
    phraseology: string;
    type: string;
    id: string;
}
