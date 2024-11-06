import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { UserService } from "../services/UserService";
import { UserContext } from "../services/UserContext";
import { DEFAULT_COLORS } from "../styles/Colors";

export const AccountRankingView = () => {
    const [userPoints, setUserPoints] = useState<{ username: string; totalPoints: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);
    const loggedInUser = user?.preferences?.username;
    
    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const pointsData = await UserService.getUsersWithPoints();
                setUserPoints(pointsData);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUserPoints();
    }, []);

    if (isLoading) {
        return <ActivityIndicator size="large" color={DEFAULT_COLORS.primaryBlue} style={styles.loading} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <FlatList
                keyExtractor={(item) => item.username}
                data={userPoints}
                renderItem={({ item, index }) => {
                    const isCurrentUser = loggedInUser === item.username;
                    return (
                        <View style={[styles.rankContainer, isCurrentUser && styles.currentUser]}>
                            <Text style={styles.rankText}>{index + 1}.</Text>
                            <Text style={styles.usernameText}>{item.username}</Text>
                            <Text style={styles.pointsText}>{item.totalPoints} pts</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DEFAULT_COLORS.primaryWhite,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: DEFAULT_COLORS.primaryDark,
        textAlign: "center",
        marginBottom: 20,
    },
    rankContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: DEFAULT_COLORS.primaryWhite,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    currentUser: {
        backgroundColor: DEFAULT_COLORS.primaryPink,
    },
    rankText: {
        fontSize: 18,
        color: DEFAULT_COLORS.primaryDark,
        fontWeight: "600",
        marginRight: 10,
        width: 30,
        textAlign: "center",
    },
    usernameText: {
        fontSize: 18,
        color: DEFAULT_COLORS.primaryDark,
        fontWeight: "500",
        flex: 1,
    },
    pointsText: {
        fontSize: 18,
        color: DEFAULT_COLORS.primaryBlue,
        fontWeight: "700",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    paginationButton: {
        backgroundColor: DEFAULT_COLORS.primaryBlue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    paginationText: {
        color: DEFAULT_COLORS.primaryWhite,
        fontWeight: "600",
    },
    pageNumber: {
        fontSize: 18,
        color: DEFAULT_COLORS.primaryDark,
        fontWeight: "500",
    },
    disabledButton: {
        backgroundColor: DEFAULT_COLORS.primaryGray,
    },
});
