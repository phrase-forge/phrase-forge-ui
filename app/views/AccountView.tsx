import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ApplicationRoute, RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import React, { useState } from "react";
import { DEFAULT_COLORS } from "../styles/Colors";
import { AccountActivityView } from "./AccountActivityView";
import { AccountStatsView } from "./AccountStatsView";
import { CustomizedAvatar } from "../component/customized/CustomizedAvatar";


export const AccountView = ({ navigation }: RouterProps) => {
    const [tab, setTab] = useState(ApplicationRoute.STATS);

    const currentTabView = () => {
        switch (tab) {
            case ApplicationRoute.ACTIVITY:
                return <AccountActivityView/>;
            case ApplicationRoute.ACHIEVEMENTS:
                return <AccountActivityView/>;
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
                <View style={tab === ApplicationRoute.ACTIVITY ? style.selectedTab : {}}>
                    <Text onPress={() => setTab(ApplicationRoute.ACTIVITY)}
                          style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Activity
                    </Text>
                </View>
            </View>

            {currentTabView()}

        </ScrollView>
        <ApplicationBottomBar props={{ navigation, }}/>
    </View>;
};

const style = StyleSheet.create({
    selectedTab: { borderBottomColor: 'white', borderBottomWidth: 2 }
});