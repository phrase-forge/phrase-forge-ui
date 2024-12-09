/* eslint-disable react/no-unescaped-entities */
import { ActivityIndicator, ScrollView, Text, View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../services/UserContext";
import { ApplicationRoute, RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { DEFAULT_COLORS } from "../styles/Colors";
import { IconButton, ProgressBar, Tooltip } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { CustomizedCard } from "../component/customized/CustomizedCard";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";
import { useFetchUserStats } from "../hooks/useFetchUserStats";

interface GameProgressProps {
    title: string;
    score: number;
    maxScore: number;
}

export const HomeView = ({ navigation }: RouterProps) => {
    const { isLoading, userStats } = useFetchUserStats();
    const { user } = useContext(UserContext);

    if (isLoading) {
        return <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={DEFAULT_COLORS.primaryDark} />
        </View>
    }

    const GameProgress = ({ title, score, maxScore }: GameProgressProps) => {
        return <View
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
                <Text style={{
                    color: DEFAULT_COLORS.primaryDark,
                    fontSize: 20,
                }}>{title}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                    color: DEFAULT_COLORS.primaryDark,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>{score}</Text>
                <Text style={{ color: DEFAULT_COLORS.secondaryGray, fontSize: 20 }}>/ {maxScore}</Text>
            </View>
        </View>;
    };
  

    const { commonStats, gameStats } = userStats || {};

    return (
        <View style={{ flex: 1, }}>
            <HomeNavbarComponent title={`Hi, ${user?.preferences?.username}!`} description={"Let's start learning!"}/>
            <ScrollView style={{ height: '100%', marginBottom: 100 }}>
                <CustomizedCard>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 16 }}>Time spent today</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            color: DEFAULT_COLORS.primaryDark,
                            fontSize: 32,
                            fontWeight: 'bold'
                        }}>{commonStats.minutesToday || 0}</Text>
                        <Text style={{ color: DEFAULT_COLORS.secondaryGray, fontSize: 16 }}>/ 60min</Text>
                    </View>
                    <ProgressBar progress={Math.min(1, Number((commonStats.minutesToday / 60).toFixed(2)))} style={{ height: 8, borderRadius: 10 }}
                                 color={DEFAULT_COLORS.primaryBlue}/>
                </CustomizedCard>

                <CustomizedCard>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 16 }}>Today's challenge</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: '90%' }}>
                            <Text style={{
                                color: DEFAULT_COLORS.primaryDark,
                                fontSize: 24,
                                fontWeight: 'bold'
                            }}>Finish three items</Text>
                        </View>
                        <View>
                            <Tooltip enterTouchDelay={0} title="Daily chalenges gives you bonus points">
                                <IconButton icon="information-outline" selected size={24}/>
                            </Tooltip>
                        </View>
                    </View>
                </CustomizedCard>

                <CustomizedCard>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 16 }}>Learning results</Text>

                        <Link to={{ screen: `${ApplicationRoute.GAMES}` }}
                              style={{ color: DEFAULT_COLORS.primaryBlue, fontSize: 16 }}>Games</Link>
                    </View>

                    {gameStats.map(stat => {
                        return <GameProgress key={stat.name} title={stat.name} score={stat.currentScore}
                                             maxScore={stat.maxScore}/>;
                    })}
                </CustomizedCard>
            </ScrollView>
            <ApplicationBottomBar props={{ navigation, }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});