/* eslint-disable @typescript-eslint/no-unused-vars */
import { getFirestore, doc, getDoc, Timestamp, updateDoc, arrayUnion, getDocs, collection } from "firebase/firestore";
import { Achievement, AchievementType, UserAchievement } from "../model/ApplicationUser";
import { DATABASE_TABLE_NAME } from "../model/DatabaseProperties";

const db = getFirestore();

const thresholdToAchievementType = new Map<number, AchievementType>([
    [0, 'Bronze'],
    [1, 'Silver'],
    [2, 'Gold'],
]);

export const fetchUserAchievements = async (userId: string): Promise<UserAchievement[]> => {
    const userDoc = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId); // Zmienna "stats" to kolekcja w bazie
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        return data.achievements as UserAchievement[] || [];
    }

    return [];
};

export const addUserAchievement = async (userId: string, achievement: UserAchievement): Promise<void> => {
    const userDoc = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId);

    const newAchievement = {
        ...achievement,
        date: Timestamp.now(), // Dodanie aktualnego czasu jako daty zdobycia
    };

    await updateDoc(userDoc, {
        achievements: arrayUnion(newAchievement), // Dodanie osiągnięcia do istniejącej listy
    });
};

export const updateUserAchievements = async (userId: string): Promise<void> => {
    const userStatsDoc = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId);
    const achievementsSnapshot = await getDocs(collection(db, DATABASE_TABLE_NAME.ACHIEVEMENTS));
    const tasksSnapshot = await getDocs(collection(db, DATABASE_TABLE_NAME.TASKS));
    const allAchievementsMap = new Map<string, Achievement>();
    const numberOfAllTasks = tasksSnapshot.size;

    achievementsSnapshot.forEach((doc) => {
        const data = doc.data();
        allAchievementsMap.set(doc.id, data as Achievement);
    });

    const userStatsSnapshot = await getDoc(userStatsDoc);
    const userStats = userStatsSnapshot.data();
    const { achievements , commonStats, finishedTasksIds } = userStats;
    const { daysInRow, minutesTotal } = commonStats;
    const numberOfFinishedTasks = finishedTasksIds.length;
    const newAchievements: UserAchievement[] = [...achievements];
    
    for (const [ _ , achievement] of allAchievementsMap) {
        const { thresholds, name } = achievement;
        
        switch (name) {
            case 'Days in Row':
                for (const threshold of thresholds) {
                    const userAchievement = achievements.find((a) => a.name === name && a.thresholdName === threshold.name);
                    
                    if (userAchievement) {
                        continue;
                    }

                    if (daysInRow >= threshold.value) {
                        newAchievements.push({
                            name: name,
                            type: thresholdToAchievementType.get(thresholds.indexOf(threshold)),
                            thresholdName: threshold.name,
                            date: Timestamp.now(),
                        });
                    }
                }
                break;
            case 'Time Spent':
                for (const threshold of thresholds) {
                    const userAchievement = achievements.find((a) => a.name === name && a.thresholdName === threshold.name);
                    
                    if (userAchievement) {
                        continue;
                    }

                    if (minutesTotal >= threshold.value) {
                        newAchievements.push({
                            name: name,
                            type: thresholdToAchievementType.get(thresholds.indexOf(threshold)),
                            thresholdName: threshold.name,
                            date: Timestamp.now(),
                        });
                    }
                }
                break;
            case 'Finished Items':
                for (const threshold of thresholds) {
                    const userAchievement = achievements.find((a) => a.name === name && a.thresholdName === threshold.name);
                    
                    if (userAchievement) {
                        continue;
                    }

                    if (numberOfFinishedTasks/numberOfAllTasks >= threshold.value) {
                        newAchievements.push({
                            name: name,
                            type: thresholdToAchievementType.get(thresholds.indexOf(threshold)),
                            thresholdName: threshold.name,
                            date: Timestamp.now(),
                        });
                    }
                }
                break;
            default:
                console.error('Unknown achievement name');
                break;
        }
    }

    await updateDoc(userStatsDoc, {
        achievements: newAchievements,
    });
}

export const resetUserAchievements = async (userId: string): Promise<void> => {
    const userStatsDoc = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId);
    await updateDoc(userStatsDoc, {
        achievements: [],
    });
};

export const resetUserAchievement = async (userId: string, achievementName: string): Promise<void> => {
    const userStatsDoc = doc(db, DATABASE_TABLE_NAME.STATISTICS, userId);
    const userStatsSnapshot = await getDoc(userStatsDoc);
    const userStats = userStatsSnapshot.data();
    const { achievements } = userStats;
    const newAchievements = achievements.filter((a: UserAchievement) => a.name !== achievementName);

    await updateDoc(userStatsDoc, {
        achievements: newAchievements,
    });
};

export const getAllAchievements = async (): Promise<UserAchievement[]> => {
    const achievementsSnapshot = await getDocs(collection(db, DATABASE_TABLE_NAME.ACHIEVEMENTS));
    const allAchievementsMap = new Map<string, Achievement>();

    achievementsSnapshot.forEach((doc) => {
        const data = doc.data();
        allAchievementsMap.set(doc.id, data as Achievement);
    });

    const allAchievements: UserAchievement[] = [];

    for (const [ _ , achievement] of allAchievementsMap) {
        const { thresholds, name } = achievement;

        for (const threshold of thresholds) {
            allAchievements.push({
                name: name,
                type: thresholdToAchievementType.get(thresholds.indexOf(threshold)),
                thresholdName: threshold.name,
                date: null,
            });
        }
    }

    return allAchievements;
}
