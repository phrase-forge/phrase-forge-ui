/* eslint-disable react/prop-types */
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { DEFAULT_COLORS } from "../styles/Colors";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../services/UserContext";
import { CustomizedCard } from "../component/customized/CustomizedCard";
import { MD3Colors, ProgressBar } from "react-native-paper";
import { UserService } from "../services/UserService";

const StatCard = ({ title, value }) => {
    return <View style={styles.infoCard}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 16 }}>{title}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
                color: DEFAULT_COLORS.primaryDark,
                fontSize: 32,
                fontWeight: 'bold'
            }}>{value}</Text>
        </View>
    </View>;
};


export const AccountStatsView = () => {
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const userId = user.user.uid;
                const userStats = await UserService.getUserStatistics(userId);
                setUser(prevUser => ({
                    ...prevUser,
                    stats: userStats
                }));
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        fetchUserStats();
    }, [user?.user.uid]);

    if (isLoading) {
        return <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={DEFAULT_COLORS.primaryDark} />
        </View>
    }

    const { commonStats, gameStats, finishedTasksIds } = user.stats;

    return <View>
        <View style={styles.container}>
            <StatCard title={'Days in row'} value={commonStats.daysInRow || 0}></StatCard>
            <StatCard title={'Finished exercises'} value={finishedTasksIds.length || 0}></StatCard>
            <StatCard title={'Minutes total'} value={commonStats.minutesTotal || 0}></StatCard>
            <StatCard title={'Total points'} value={commonStats.totalPoints || 0}></StatCard>
        </View>
        <CustomizedCard>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 16 }}>Games results</Text>
            </View>

            <View style={{ gap: 16 }}>
                {gameStats.map((gameStat, index) => {
                    return <View key={index} style={styles.barContainer}>
                        <View style={{ width: '80%', gap: 8 }}>
                            <Text style={{
                                color: DEFAULT_COLORS.primaryDark,
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}>{gameStat.name} </Text>
                            <View style={{ width: '80%' }}>
                                <ProgressBar progress={gameStat.currentScore / gameStat.maxScore}
                                             style={{ height: 8, borderRadius: 10 }}
                                             color={MD3Colors.error50}/>
                            </View>
                        </View>
                        <View style={styles.barContainer}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{
                                    color: DEFAULT_COLORS.primaryDark,
                                    fontSize: 24,
                                    fontWeight: 'bold'
                                }}>{gameStat.currentScore} </Text>
                                <Text style={{
                                    color: DEFAULT_COLORS.secondaryGray,
                                    fontSize: 16
                                }}>/ {gameStat.maxScore}</Text>
                            </View>
                        </View>

                    </View>;
                })}
            </View>
        </CustomizedCard>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        padding: 32,
        gap: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    barContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
});