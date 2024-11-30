/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text, View } from "react-native";
import { AchievementItem } from "./AchievementItem";
import { UserAchievement } from "../../model/ApplicationUser";
import { getAllAchievements } from "../../services/AchievementsService";
import { useEffect, useState } from "react";

export const AchievementsList = ({ earnedAchievements }: { earnedAchievements: UserAchievement[] }) => {

    const [allAchievements, setAllAchievements] = useState<UserAchievement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllAchievements = async () => {
            setIsLoading(true);
            try {
                const achievements = await getAllAchievements();
                setAllAchievements(achievements);
            } catch (error) {
                console.error("Error fetching achievements:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllAchievements();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const unearnedAchievements = allAchievements.filter(
        (achievement) =>
            !earnedAchievements.some(
                (earned) =>
                    earned.name === achievement.name && 
                    earned.thresholdName === achievement.thresholdName
            )
    );
    
    return (
        <View style={styles.container}>
            {[...earnedAchievements, ...unearnedAchievements].map((achievement, index) => {
                const isUnlocked = earnedAchievements.some(
                    (earned) =>
                        earned.name === achievement.name && earned.thresholdName === achievement.thresholdName
                );
    
                return (
                    <AchievementItem
                        key={index}
                        name={achievement.name}
                        type={achievement.type}
                        thresholdName={achievement.thresholdName}
                        date={isUnlocked ? achievement.date : null}
                        isUnlocked={isUnlocked}
                    />
                );
            })}
            {earnedAchievements.length === 0 && unearnedAchievements.length === 0 && (
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>No achievements available</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 24,
        padding: 20,
    },
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noDataText: {
        fontSize: 16,
        color: '#888',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
