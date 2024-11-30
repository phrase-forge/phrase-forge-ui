import {
    ApplicationUser,
    Category,
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
import { Games } from "../model/Games";


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
            commonStats: {
                totalPoints: 0,
                minutesToday: 0,
                minutesTotal: 0,
                daysInRow: 0
            },
            gameStats: {},
            finishedTasksIds: [],
            lastLogged: new Date(),
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
            .then(async ([userStatsSnap, games]) => {
                const gameStats: GameStatistic[] = [];
                const userStats = userStatsSnap.data();
                const finishedTasksIds = userStats?.finishedTasksIds || [];

                const taskPromises = finishedTasksIds.map(taskId => getDoc(doc(db, DATABASE_TABLE_NAME.TASKS, taskId)));
                const tasksSnapshot = await Promise.all(taskPromises);
                const tasksByType: { [key: string]: number } = {};
                
                tasksSnapshot.forEach(taskSnap => {
                    if (taskSnap.exists()) {
                        const taskData = taskSnap.data();
                        const taskType = taskData.type;
                        tasksByType[taskType] = (tasksByType[taskType] || 0) + 1;
                    }
                });

                games.forEach(gameRef => {
                    const gameData = gameRef.data();
                    const currentScore = tasksByType[gameData.key] || 0;

                    gameStats.push({
                        name: gameData.name,
                        currentScore: currentScore,
                        maxScore: gameData.tasks
                    });
                });
                gameStats.sort((s1, s2) => s2.currentScore - s1.currentScore);

                const achievements = userStats?.achievements || [];

                if (achievements) {
                    achievements.sort((s1, s2) => s2.date - s1.date);
                }

                return {
                    commonStats: {
                        totalPoints: userStats?.commonStats.totalPoints || 0,
                        minutesToday: userStats?.commonStats.minutesToday || 0,
                        minutesTotal: userStats?.commonStats.minutesTotal || 0,
                        daysInRow: userStats?.commonStats.daysInRow || 0
                    },
                    achievements,
                    gameStats,
                    finishedTasksIds,
                }
            }).catch((err) => {
                console.log(err);
                return {
                    commonStats: {
                        totalPoints: 0,
                        minutesToday: 0,
                        minutesTotal: 0,
                        daysInRow: 0
                    },
                    achievements: [],
                    gameStats: [],
                    finishedTasksIds: [],
                }
            });
    }

    static async updateUserScore(userId: string, newScore: number, gameKey: Games): Promise<void> {
        try {
            const userStatsRef = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId);
            const userStatsSnap = await getDoc(userStatsRef);
    
            if (userStatsSnap.exists()) {
                const userStats = userStatsSnap.data();
    
                const updatedGameStats = {
                    ...userStats.gameStats,
                    [gameKey]: newScore
                };
    
                const updatedCommonStats = {
                    ...userStats.commonStats,
                    totalPoints: (userStats.commonStats.totalPoints || 0) + newScore
                };
    
                await updateDoc(userStatsRef, {
                    gameStats: updatedGameStats,
                    commonStats: updatedCommonStats,
                });
            } else {
                console.error(`No such user statistics found for userId: ${userId}`);
            }
        } catch (error) {
            console.error("Error updating user score: ", error);
        }
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

    static async updateLoginStats(userId: string): Promise<void> {
        const userStatsRef = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId);
        const userStatsSnap = await getDoc(userStatsRef);

        if (userStatsSnap.exists()) {
            const userData = userStatsSnap.data();
            const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000.0);
            const oneDayInSeconds = 86400; 
            let daysInRow = userData?.commonStats?.daysInRow || 0;
    
            if (userData?.lastLogged) {
                const lastLogged = userData.lastLogged;
                const differenceInSeconds = currentTimeInSeconds - lastLogged.seconds;
                const differenceInDays = Math.floor(differenceInSeconds / oneDayInSeconds);
    
                if (differenceInDays === 1) {
                    daysInRow += 1;
                } else if (differenceInDays > 1) {
                    daysInRow = 1;
                }
            } else {
                daysInRow = 1;
            }
    
            await updateDoc(userStatsRef, {
                lastLogged: new Date(currentTimeInSeconds * 1000),
                [`commonStats.daysInRow`]: daysInRow
            });

        } else {
            console.error(`No such user statistics found for userId: ${userId}`);
        }
    }

    static async updateGameTimeStats(userId: string, startTime: Date, endTime: Date): Promise<void> {
        const userStatsRef = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId);
        const userStatsSnap = await getDoc(userStatsRef);

        if (userStatsSnap.exists()) {
            const userData = userStatsSnap.data();
            const startTimeInSeconds = Math.floor(startTime.getTime() / 1000.0);
            const endTimeInSeconds = Math.floor(endTime.getTime() / 1000.0);
            const differenceInSeconds = endTimeInSeconds - startTimeInSeconds;
            const minutesSpent = Math.floor(differenceInSeconds / 60);

            let minutesToday = userData?.commonStats?.minutesToday || 0;

            if (new Date(userData?.lastLogged.seconds * 1000).toDateString() === startTime.toDateString()) {
                minutesToday += minutesSpent;
            } else {
                minutesToday = minutesSpent;
            }

            const updatedCommonStats = {
                ...userData.commonStats,
                minutesToday: minutesToday,
                minutesTotal: (userData.commonStats.minutesTotal || 0) + minutesSpent
            };
    
            await updateDoc(userStatsRef, {
                commonStats: updatedCommonStats,
            });
        } else {
            console.error(`No such user statistics found for userId: ${userId}`);
        }
    }

    static async getUsersWithPoints(): Promise<{ username: string; totalPoints: number }[]> {
        const usersSnapshot = await getDocs(collection(db, DATABASE_TABLE_NAME.USERS));
        const statsSnapshot = await getDocs(collection(db, DATABASE_TABLE_NAME.STATISTICS));
      
        const userPointsMap = new Map<string, number>();
      
        statsSnapshot.forEach((statDoc) => {
            const userId = statDoc.id;
            const totalPoints = statDoc.data()?.commonStats?.totalPoints || 0;
            userPointsMap.set(userId, totalPoints);
        });
    
        const usersWithPoints: { username: string; totalPoints: number }[] = [];
        let unknownUsersCount = 0;

        usersSnapshot.forEach((userDoc) => {
            const userId = userDoc.id;
            const username = userDoc.data()?.preferences?.username || `UnknownUser${unknownUsersCount++}`;
            const totalPoints = userPointsMap.get(userId) || 0;
            usersWithPoints.push({ username, totalPoints });
        });
    
        return usersWithPoints.sort((a, b) => b.totalPoints - a.totalPoints);
    }
    


    private static getTaskForUser(gameData, gameType: string, learnedTasks: string[], task) {
        return gameData.type === gameType && !learnedTasks.includes(task.id) &&
            gameData.difficultyLevel === this.userPreferences.level &&
            (gameData.category === this.userPreferences.category || this.userPreferences.category == Category.ALL);
    }
    static async isNickAvailable(nick: string, userUID: string): Promise<boolean> {
        const userSnap = await getDocs(collection(db, DATABASE_TABLE_NAME.USERS));
        for (const user of userSnap.docs) {
            const userData = user.data(); 
            const otherNick = userData.preferences?.username;
            if ((otherNick === nick) && (userUID != user.id)) {
                return false; 
            }
        }
        return true; 
    }
        
    
        
}           
