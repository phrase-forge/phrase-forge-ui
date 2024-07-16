import { GameStatistic, QuizTask, UserRole, UserStats } from "../model/ApplicationUser";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { DATABASE_TABLE_NAME } from "../model/DatabaseProperties";
import { User } from "firebase/auth";


export class UserService {
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
                finishedTasksIds: {}
        };
        const addUserPromise = setDoc(doc(db, DATABASE_TABLE_NAME.USERS, user.uid), userDoc);
        const addUserStatPromise = setDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, user.uid), userStatDoc)
        return Promise.all([addUserPromise, addUserStatPromise]);
    }
    static async addTaskToUserStats(userId : string, task:string) {
        const userStatsPromise = getDoc((doc(db, DATABASE_TABLE_NAME.STATISTICS,userId)));
        Promise.all([userStatsPromise])
            .then(([userStatsSnap]) =>{
                const userStats = userStatsSnap.data();
                const learnedTasks : string[] = userStats.finishedTasksIds;
                learnedTasks.push(task);
                updateDoc((doc(db, DATABASE_TABLE_NAME.STATISTICS,userId)), { finishedTasksIds: learnedTasks });

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
                    if (gameData.type === "quiz" && !learnedTasks.includes(task.id)) {
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


    static async getUserStatistics(userId: string): Promise<UserStats> {
        const userStatsPromise = getDoc((doc(db, DATABASE_TABLE_NAME.STATISTICS, userId)));
        const gamesPromise = getDocs(collection(db, DATABASE_TABLE_NAME.GAMES));
;

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
                gameStats.sort((s1, s2) => s2.currentScore - s1.currentScore)

                const achievements = userStats?.achievements || [];

                if (achievements) {
                    achievements.sort((s1, s2) => s2.date - s1.date)
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
}