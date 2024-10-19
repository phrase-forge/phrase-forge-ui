import {
    ApplicationUser,
    GameStatistic,
    GapsTask,
    PairsTask,
    PicturesTask,
    QuizTask,
    SequenceTask,
    TranslateTask,
    UserPreferences,
    UserRole,
    UserStats
} from "../model/ApplicationUser";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { DATABASE_TABLE_NAME } from "../model/DatabaseProperties";
import { User } from "firebase/auth";


export class UserService {

    static userPreferences: UserPreferences

    static getUserDataById(userId: string) {
        return Promise.all([
            getDoc((doc(db, DATABASE_TABLE_NAME.USERS, userId))),
            UserService.getUserStatistics(userId)
        ]);
    }

    static addUser(user: User) {
        const userDoc = {
            email: user.email,
            roles: [UserRole.USER]
        };
        const userStatDoc = {
            achievements: [],
            commonStats: {},
            gameStats: {},
            finishedTasksIds: []
        };
        const addUserPromise = setDoc(doc(db, DATABASE_TABLE_NAME.USERS, user.uid), userDoc);
        const addUserStatPromise = setDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, user.uid), userStatDoc);
        return Promise.all([addUserPromise, addUserStatPromise]);
    }

    static async addTaskToUserStats(userId: string, task: string) {
        const userStatsPromise = getDoc((doc(db, DATABASE_TABLE_NAME.STATISTICS, userId)));
        Promise.all([userStatsPromise])
            .then(([userStatsSnap]) => {
                const userStats = userStatsSnap.data();
                const learnedTasks: string[] = userStats.finishedTasksIds;
                learnedTasks.push(task);
                updateDoc((doc(db, DATABASE_TABLE_NAME.STATISTICS, userId)), {finishedTasksIds: learnedTasks});

            });


    }

    static async getUserQuizTask(userId: string): Promise<QuizTask[]> {
        const userStatsPromise = getDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, userId));
        const taskPromise = getDocs(collection(db, DATABASE_TABLE_NAME.TASKS));

        return Promise.all([userStatsPromise, taskPromise])
            .then(([userStatsSnap, tasks]) => {
                const userStats = userStatsSnap.data();
                const learnedTasks: string[] = userStats.finishedTasksIds;
                const quizTasks: QuizTask[] = [];

                tasks.forEach(task => {
                    const gameData = task.data();
                    if (this.getTaskForUser(gameData, "quiz", learnedTasks, task)) {
                        quizTasks.push({
                            answers: gameData.answers,
                            category: gameData.category,
                            difficultyLevel: gameData.difficultyLevel,
                            phraseology: gameData.phraseology,
                            type: gameData.type,
                            id: task.id
                        });
                    }
                });
                return quizTasks;
            });
    }

    static async getUserTranslateTask(userId: string): Promise<TranslateTask[]> {
        const userStatsPromise = getDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, userId));
        const taskPromise = getDocs(collection(db, DATABASE_TABLE_NAME.TASKS));

        return Promise.all([userStatsPromise, taskPromise])
            .then(([userStatsSnap, tasks]) => {
                const userStats = userStatsSnap.data();
                const learnedTasks: string[] = userStats.finishedTasksIds;
                const translateTasks: TranslateTask[] = [];

                tasks.forEach(task => {
                    const gameData = task.data();
                    if (this.getTaskForUser(gameData, "translate", learnedTasks, task)) {
                        translateTasks.push({
                            answer: gameData.answer,
                            category: gameData.category,
                            difficultyLevel: gameData.difficultyLevel,
                            phraseology: gameData.phraseology,
                            type: gameData.type,
                            id: task.id
                        });
                    }
                });
                return translateTasks;
            });
    }

    static async getUserGapsTask(userId: string): Promise<GapsTask[]> {
        const userStatsPromise = getDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, userId));
        const taskPromise = getDocs(collection(db, DATABASE_TABLE_NAME.TASKS));

        return Promise.all([userStatsPromise, taskPromise])
            .then(([userStatsSnap, tasks]) => {
                const userStats = userStatsSnap.data();
                const learnedTasks: string[] = userStats.finishedTasksIds;
                const gapsTasks: GapsTask[] = [];

                tasks.forEach(task => {
                    const gameData = task.data();
                    if (this.getTaskForUser(gameData, "gaps", learnedTasks, task)) {
                        gapsTasks.push({
                            answers: gameData.answers,
                            category: gameData.category,
                            difficultyLevel: gameData.difficultyLevel,
                            phraseology: gameData.phraseology,
                            type: gameData.type,
                            id: task.id,
                            gaps: gameData.gaps
                        });
                    }
                });
                return gapsTasks;
            });
    }

    static async getUserPicturesTask(userId: string): Promise<PicturesTask[]> {
        const userStatsPromise = getDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, userId));
        const taskPromise = getDocs(collection(db, DATABASE_TABLE_NAME.TASKS));

        return Promise.all([userStatsPromise, taskPromise])
            .then(([userStatsSnap, tasks]) => {
                const userStats = userStatsSnap.data();
                const learnedTasks: string[] = userStats.finishedTasksIds;
                const picturesTasks: PicturesTask[] = [];

                tasks.forEach(task => {
                    const gameData = task.data();
                    if (this.getTaskForUser(gameData, "pictures", learnedTasks, task)) {
                        picturesTasks.push({
                            answers: gameData.answers,
                            category: gameData.category,
                            difficultyLevel: gameData.difficultyLevel,
                            phraseology: gameData.phraseology,
                            type: gameData.type,
                            id: task.id,
                            photo: gameData.photo
                        });
                    }
                });
                return picturesTasks;
            });
    }

    static async getUserPairsTask(userId: string): Promise<PairsTask[]> {
        const userStatsPromise = getDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, userId));
        const taskPromise = getDocs(collection(db, DATABASE_TABLE_NAME.TASKS));

        return Promise.all([userStatsPromise, taskPromise])
            .then(([userStatsSnap, tasks]) => {
                const userStats = userStatsSnap.data();
                const learnedTasks: string[] = userStats.finishedTasksIds;
                const pairsTasks: PairsTask[] = [];

                tasks.forEach(task => {
                    const gameData = task.data();
                    if (this.getTaskForUser(gameData, "pairs", learnedTasks, task)) {
                        pairsTasks.push({
                            category: gameData.category,
                            difficultyLevel: gameData.difficultyLevel,
                            type: gameData.type,
                            id: task.id,
                            pair1: gameData.pair1,
                            pair2: gameData.pair2,
                            pair3: gameData.pair3,

                        });
                    }
                });
                return pairsTasks;
            });
    }

    static async getUserSequenceTask(userId: string): Promise<SequenceTask[]> {
        const userStatsPromise = getDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, userId));
        const taskPromise = getDocs(collection(db, DATABASE_TABLE_NAME.TASKS));

        return Promise.all([userStatsPromise, taskPromise])
            .then(([userStatsSnap, tasks]) => {
                const userStats = userStatsSnap.data();
                const learnedTasks: string[] = userStats.finishedTasksIds;
                const sequenceTask: SequenceTask[] = [];

                tasks.forEach(task => {
                    const gameData = task.data();
                    if (this.getTaskForUser(gameData, "sequence", learnedTasks, task)) {
                        sequenceTask.push({
                            id: task.id,
                            type: gameData.type,
                            words: gameData.words,
                            meaning: gameData.meaning
                        });
                    }
                });
                return sequenceTask;
            });
    }

    static saveUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
        const updateRef = doc(db, DATABASE_TABLE_NAME.USERS, userId);
        return updateDoc(updateRef, {preferences});
    }

    static async getUserStatistics(userId: string): Promise<UserStats> {
        const userStatsPromise = getDoc((doc(db, DATABASE_TABLE_NAME.STATISTICS, userId)));
        const gamesPromise = getDocs(collection(db, DATABASE_TABLE_NAME.GAMES));

        return Promise.all([userStatsPromise, gamesPromise])
            .then(([userStatsSnap, games]) => {
                const gameStats: GameStatistic[] = [];
                const userStats = userStatsSnap.data();

                games.forEach(gameRef => {
                    const gameData = gameRef.data();
                    gameStats.push({
                        name: gameData.name,
                        currentScore: userStats?.gameStats[gameData.key] || 0,
                        maxScore: gameData.tasks
                    });
                });
                gameStats.sort((s1, s2) => s2.currentScore - s1.currentScore);

                const achievements = userStats?.achievements || [];

                if (achievements) {
                    achievements.sort((s1, s2) => s2.date - s1.date);
                }

                const finishedTasksIds = userStats?.finishedTasksIds || [];
                return {
                    commonStats: userStats?.commonStats || {},
                    achievements,
                    gameStats,
                    finishedTasksIds,
                }
            }).catch((err) => {
                console.log(err);
                return {
                    commonStats: new Map(),
                    achievements: [],
                    gameStats: [],
                    finishedTasksIds: [],
                }
            });
    }

    static async getUserPreferences(userId: string): Promise<UserPreferences> {
        const userPromise = getDoc(doc(db, DATABASE_TABLE_NAME.USERS, userId));

        return Promise.all([userPromise])
            .then(([userSnap]) => {
                const userData = userSnap.data() as ApplicationUser;
                return userData.preferences;
            })
            .catch((error) => {
                console.error('Error fetching user preferences:', error);
                throw error;
            });
    }

    private static getTaskForUser(gameData, gameType: string, learnedTasks: string[], task) {
        return gameData.type === gameType && !learnedTasks.includes(task.id) &&
            gameData.difficultyLevel === this.userPreferences.level && gameData.category === this.userPreferences.category;
    }
}