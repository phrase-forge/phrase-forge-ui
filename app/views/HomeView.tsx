import { ScrollView, Text, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../services/UserContext";
import { ApplicationRoute, RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { DEFAULT_COLORS } from "../styles/Colors";
import { IconButton, ProgressBar, Tooltip } from "react-native-paper";
import { Link } from "@react-navigation/native";
import { CustomizedCard } from "../component/customized/CustomizedCard";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";

interface GameProgressProps {
    title: string;
    score: number;
    maxScore: number;
}

export const HomeView = ({ navigation }: RouterProps) => {
    const { user } = useContext(UserContext);

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

    return (
        <View style={{ flex: 1, }}>
            <HomeNavbarComponent title={`Hi, ${user.username}`} description={"Let's start learning"}/>
            <ScrollView style={{ height: '100%', marginBottom: 100 }}>
                <CustomizedCard>
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

                    {user?.stats?.gameStats.map(stat => {
                        return <GameProgress key={stat.name} title={stat.name} score={stat.currentScore}
                                             maxScore={stat.maxScore}/>;
                    })}
                </CustomizedCard>
            </ScrollView>
            <ApplicationBottomBar props={{ navigation, }}/>
        </View>
    );
};
