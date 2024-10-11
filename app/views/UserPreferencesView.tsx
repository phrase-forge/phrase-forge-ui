import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { CustomizedTextInput } from "../component/customized/CustomizedTextInput";
import { ApplicationHeaderComponent } from "../component/ApplicationHeaderComponent";
import { CustomizedButton } from "../component/customized/CustomizedButton";
import { LoadingContext } from "../services/LoadingContext";
import { Language, Level, VolumeRange } from "../model/ApplicationUser";
import { DEFAULT_COLORS } from "../styles/Colors";
import { SegmentedButtons, Switch } from "react-native-paper";
import { UserContext } from "../services/UserContext";
import { CustomizedDivider } from "../component/customized/CustomizedDivider";
import { UserService } from "../services/UserService";
import Slider from "@react-native-assets/slider";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";

export const UserPreferencesView = () => {
    const { setLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const [username, setUsername] = useState(user?.preferences?.username || '');
    const [language, setLanguage] = useState(user?.preferences?.language || Language.ENGLISH);
    const [level, setLevel] = useState(user?.preferences?.level || Level.EASY);

    const [notificationEnabled, setNotificationEnabled] = useState(user?.preferences?.notificationSettings?.enable || false);
    const [soundEnabled, setSoundEnabled] = useState(user?.preferences?.soundSettings?.enable || false);
    const [soundVolume, setSoundVolume] = useState<VolumeRange>(user?.preferences?.soundSettings?.volume || 0);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const handlePreferencesSave = () => {
        setLoading(true);
        user.preferences = {
            username,
            language: language,
            level: level,
            notificationSettings: {
                enable: notificationEnabled
            },
            soundSettings: {
                enable: soundEnabled,
                volume: Math.floor(soundVolume) as VolumeRange
            }
        };

        UserService.saveUserPreferences(user.user.uid, user.preferences)
            .finally(() => setLoading(false));
    };

    return <View>
        {user.preferences
            && <HomeNavbarComponent
                title='Preferences'
                description='Change your preferences'
            />
        }
        <ScrollView scrollEnabled={scrollEnabled} style={styles.container}>
            {!user.preferences && <ApplicationHeaderComponent
                title="Preferences"
                description={"Provide your preferences before getting started"}
            />}
            <View style={styles.inputContainer}>
                <CustomizedDivider text={'Username'} inputStyles={{marginBottom: -16}}/>
                <CustomizedTextInput
                    value={username}
                    valueSetter={setUsername}
                    placeholder="Username"
                    description="Your username"
                />

                <View>
                    <CustomizedDivider text={'Language'} inputStyles={{ marginBottom: 16 }}/>
                    <View>
                        <SegmentedButtons
                            density="high"
                            value={language}
                            onValueChange={(value) => setLanguage(value)}
                            buttons={[
                                {
                                    value: Language.ENGLISH,
                                    label: 'English',
                                },
                                {
                                    value: Language.POLISH,
                                    label: 'Polish',
                                },
                            ]}
                        />
                    </View>
                </View>

                <View>
                    <CustomizedDivider text={'Level'} inputStyles={{ marginBottom: 16 }}/>
                    <View>
                        <SegmentedButtons
                            density="high"
                            value={level}
                            onValueChange={(value) => setLevel(value)}
                            buttons={[
                                {
                                    value: Level.EASY,
                                    label: 'Easy',
                                },
                                {
                                    value: Level.MEDIUM,
                                    label: 'Medium',
                                },
                                {
                                    value: Level.ADVANCED,
                                    label: 'Advanced',
                                },
                            ]}
                        />
                    </View>
                </View>

                <View>
                    <CustomizedDivider text={'Notifications'} inputStyles={{ marginBottom: 16 }}/>
                    <View style={styles.settingsBox}>
                        <Text style={styles.inputLabel}>Enable</Text>
                        <Switch value={notificationEnabled}
                                onValueChange={() => setNotificationEnabled(!notificationEnabled)}/>
                    </View>
                </View>
                <View>
                    <CustomizedDivider text={'Sound'} inputStyles={{ marginBottom: 16 }}/>
                    <View style={styles.settingsBox}>
                        <Text style={styles.inputLabel}>Enable</Text>
                        <Switch value={soundEnabled} onValueChange={() => setSoundEnabled(!soundEnabled)}/>
                    </View>
                    <Slider style={{marginTop: 24}}
                            trackHeight={10}
                            enabled={soundEnabled}
                            thumbSize={25}
                            value={soundVolume}
                            onValueChange={(value: VolumeRange) => setSoundVolume(value)}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor={soundEnabled ? DEFAULT_COLORS.primaryBlue: DEFAULT_COLORS.primaryGray}
                            maximumTrackTintColor={DEFAULT_COLORS.primaryGray}
                            thumbTintColor={soundEnabled ? DEFAULT_COLORS.primaryBlue: DEFAULT_COLORS.primaryGray}
                            onSlidingStart={() => setScrollEnabled(false)}
                            onSlidingComplete={() => setScrollEnabled(true)}
                    />
                </View>
            </View>

            <CustomizedButton title="Save" handleClick={handlePreferencesSave}></CustomizedButton>
        </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        marginBottom: 100
    },
    inputContainer: {
        gap: 32,
        marginTop: 64
    },
    inputLabel: {
        color: DEFAULT_COLORS.primaryGray,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    settingsBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
});