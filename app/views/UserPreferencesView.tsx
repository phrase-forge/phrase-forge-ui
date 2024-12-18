import { Alert, ScrollView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CustomizedTextInput } from "../component/customized/CustomizedTextInput";
import { ApplicationHeaderComponent } from "../component/ApplicationHeaderComponent";
import { CustomizedButton } from "../component/customized/CustomizedButton";
import { LoadingContext } from "../services/LoadingContext";
import { Category, Language, Level } from "../model/ApplicationUser";
import { DEFAULT_COLORS } from "../styles/Colors";
import { SegmentedButtons } from "react-native-paper";
import { UserContext } from "../services/UserContext";
import { CustomizedDivider } from "../component/customized/CustomizedDivider";
import { UserService } from "../services/UserService";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";
import { RouterProps } from "../model/Routing";

export const UserPreferencesView = ({navigation}: RouterProps) => {
    const { setLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const [username, setUsername] = useState(user?.preferences?.username || '');
    const [language, setLanguage] = useState(user?.preferences?.language || Language.ENGLISH);
    const [level, setLevel] = useState(user?.preferences?.level || Level.EASY);
    const [category, setCategory] = useState(user?.preferences?.category || Category.GENERAL);

    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        if (username) {
            UserService.isNickAvailable(username, user.user.uid)
                .then((available) => {
                    setIsAvailable(available);
                });
        } else {
            setIsAvailable(null);
        }
    }, [username]);

    const handlePreferencesSave = async () => {
        const afterSigningUp = UserService.userPreferences === undefined;
        setLoading(true);
        if (!username.trim()) {
            Alert.alert('Warning', 'Username cannot be empty. Please enter a valid username.');
            setLoading(false);
            return;
        } else if (!isAvailable) {
            Alert.alert('Warning', 'The nickname is already taken, please choose another one.');
            setLoading(false);
            return;
        } else {
            user.preferences = {
                username,
                language: language,
                level: level,
                category: category,
            };

            UserService.userPreferences = user.preferences;

            UserService.saveUserPreferences(user.user.uid, user.preferences)
                .finally(() => {
                    setLoading(false)
                });

            if (!afterSigningUp) {
                navigation.goBack()
            }
        }
    };

    return <View style={styles.viewContainer}>
        {user.preferences
            && <HomeNavbarComponent
                title="Preferences"
                description="Change your preferences"
            />
        }
        <ScrollView scrollEnabled={true} style={styles.scrollContainer}>
            {!user.preferences && <ApplicationHeaderComponent
                title="Preferences"
                description={"Provide your preferences before getting started"}
            />}
            <View style={styles.inputContainer}>
                <CustomizedDivider text={'Username'} inputStyles={{ marginBottom: -40 }}/>
                <CustomizedTextInput
                    value={username}
                    valueSetter={setUsername}
                    placeholder="Your username"
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
                    <CustomizedDivider text={'Category'} inputStyles={{ marginBottom: 16 }}/>
                    <View>
                        <SegmentedButtons
                            style={styles.segmentedButtons}
                            density="high"
                            value={category}
                            onValueChange={(value) => setCategory(value)}
                            buttons={[
                                {
                                    value: Category.GENERAL,
                                    label: 'General',
                                },
                                {
                                    value: Category.BUSINESS,
                                    label: 'Business',
                                },
                                {
                                    value: Category.HEALTH,
                                    label: 'Health',
                                },
                                {
                                    value: Category.TRAVEL,
                                    label: 'Travel',
                                },
                                {
                                    value: Category.ALL,
                                    label: 'All',
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>

            <CustomizedButton title="Save"  handleClick={handlePreferencesSave}></CustomizedButton>
        </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    segmentedButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    scrollContainer: {
        paddingHorizontal: 32,
    },
    inputContainer: {
        gap: 32,
        marginTop: 24
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
