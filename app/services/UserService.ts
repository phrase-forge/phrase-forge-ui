import { GameStatistic, UserRole, UserStats } from "../model/ApplicationUser";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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
                gameStats: {}
        };
        const addUserPromise = setDoc(doc(db, DATABASE_TABLE_NAME.USERS, user.uid), userDoc);
        const addUserStatPromise = setDoc(doc(db, DATABASE_TABLE_NAME.STATISTICS, user.uid), userStatDoc)
        return Promise.all([addUserPromise, addUserStatPromise]);
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
                gameStats.sort((s1, s2) => s2.currentScore - s1.currentScore)

                const achievements = userStats?.achievements || [];

                if (achievements) {
                    achievements.sort((s1, s2) => s2.date - s1.date)
                }
                return {
                    commonStats: userStats?.commonStats || {},
                    achievements,
                    gameStats
                }
            }).catch((err) => {
                console.log(err);
                return {
                    commonStats: new Map(),
                    achievements: [],
                    gameStats: []
                }
            });
    }
}