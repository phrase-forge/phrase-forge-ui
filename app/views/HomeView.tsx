import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../services/UserContext";
import { ApplicationRoute, RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/ApplicationBottomBar";
import { DEFAULT_COLORS } from "../styles/Colors";
import { Avatar, IconButton, ProgressBar, Tooltip } from "react-native-paper";
import { Link } from "@react-navigation/native";

interface GameProgressProps {
    title: string;
    score: number;
    maxScore: number;
}

export const HomeView = ({ navigation }: RouterProps) => {
    const { user } = useContext(UserContext);

    const GameProgress = ({title, score, maxScore}: GameProgressProps) => {
        return <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
        </View>
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={styles.headerContainer}>
                <View style={{ padding: 32 }}>
                    <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>Hi, Adam</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>Let's start learning</Text>
                </View>
                <View style={{ padding: 32 }}>
                    <Avatar.Icon color="white" size={60} icon="account"/>
                </View>
            </View>
            <ScrollView style={{ height: '100%', marginBottom: 100 }}>
                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 16 }}>Time spent today</Text>
                        {/* todo activity chart */}
                        <Link to={{ screen: `${ApplicationRoute.GAMES}` }}
                              style={{ color: DEFAULT_COLORS.primaryBlue, fontSize: 16 }}>Activity</Link>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            color: DEFAULT_COLORS.primaryDark,
                            fontSize: 32,
                            fontWeight: 'bold'
                        }}>46min </Text>
                        <Text style={{ color: DEFAULT_COLORS.secondaryGray, fontSize: 16 }}>/ 60min</Text>
                    </View>
                    <ProgressBar progress={0.6} style={{ height: 8, borderRadius: 10 }}
                                 color={DEFAULT_COLORS.primaryBlue}/>
                </View>

                <View style={styles.contentContainer}>
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
                            <Tooltip enterTouchDelay={0} title="Daily chalenges will give you more points">
                                <IconButton icon="information-outline" selected size={24}/>
                            </Tooltip>
                        </View>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 16 }}>Learning results</Text>

                        <Link to={{ screen: `${ApplicationRoute.GAMES}` }}
                              style={{ color: DEFAULT_COLORS.primaryBlue, fontSize: 16 }}>Games</Link>
                    </View>

                    <GameProgress title={'Match'} score={28} maxScore={50}/>
                    <GameProgress title={'Quizes'} score={23} maxScore={50}/>
                    <GameProgress title={'Game 3'} score={15} maxScore={25}/>
                    <GameProgress title={'Game 4'} score={4} maxScore={16}/>

                </View>


            </ScrollView>
            <ApplicationBottomBar props={{ navigation, }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: DEFAULT_COLORS.primaryBlue,
        height: 220,
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    contentContainer: {
        marginHorizontal: 32,
        marginTop: 24,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        paddingVertical: 32,
        paddingHorizontal: 24,
        display: 'flex',
        gap: 8

    }

});