import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { ApplicationRoute, RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import React, { useState } from "react";
import { DEFAULT_COLORS } from "../styles/Colors";
import { AccountAchievementsView } from "./AccountAchievementsView";
import { AccountStatsView } from "./AccountStatsView";
import { CustomizedAvatar } from "../component/customized/CustomizedAvatar";
import { useFetchUserStats } from "../hooks/useFetchUserStats";
import { AccountRankingView } from "./AccountRankingView";


export const AccountView = ({ navigation }: RouterProps) => {
    const [tab, setTab] = useState(ApplicationRoute.STATS);
    const { isLoading } = useFetchUserStats();

    if (isLoading) {
        return <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color={DEFAULT_COLORS.primaryDark} />
        </View>
    }

    const currentTabView = () => {
        switch (tab) {
            case ApplicationRoute.ACHIEVEMENTS:
                return <AccountAchievementsView/>;
            case ApplicationRoute.RANKING:
                return <AccountRankingView/>;
            default:
                return <AccountStatsView/>;
        }
    };

    return <View style={{ flex: 1, backgroundColor: DEFAULT_COLORS.primaryBlue }}>
        <ScrollView style={{ height: '100%', marginBottom: 100 }}>
            <View style={{ alignItems: 'center', marginTop: 100 }}>
                <CustomizedAvatar/>
            </View>

            <View style={{
                padding: 30,
                display: 'flex',
                flexDirection: 'row',
                gap: 20,
                justifyContent: 'space-between'
            }}>
                <View style={tab === ApplicationRoute.STATS ? style.selectedTab : {}}>
                    <Text onPress={() => setTab(ApplicationRoute.STATS)}
                          style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Stats
                    </Text>
                </View>
                <View style={tab === ApplicationRoute.ACHIEVEMENTS ? style.selectedTab : {}}>
                    <Text onPress={() => setTab(ApplicationRoute.ACHIEVEMENTS)}
                          style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Achievements
                    </Text>
                </View>
                <View style={tab === ApplicationRoute.RANKING ? style.selectedTab : {}}>
                    <Text onPress={() => setTab(ApplicationRoute.RANKING)}
                          style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Ranking
                    </Text>
                </View>
            </View>

            {currentTabView()}

        </ScrollView>
        <ApplicationBottomBar props={{ navigation, }}/>
    </View>;
};

const style = StyleSheet.create({
    selectedTab: { borderBottomColor: 'white', borderBottomWidth: 2 },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});