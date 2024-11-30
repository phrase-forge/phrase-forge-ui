import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ApplicationBottomBar} from "../component/navigation/ApplicationBottomBar";
import {ApplicationRoute, RouterProps} from "../model/Routing";
import {auth} from "../services/Firebase";
import {ViewContainer} from "../component/ViewContainer";
import React from "react";
import {DEFAULT_COLORS} from "../styles/Colors";
import {HomeNavbarComponent} from "../component/HomeNavbarComponent";
import {UserService} from "../services/UserService";

export const SettingsView = ({navigation}: RouterProps) => {

    const onNavigationChange = (route: ApplicationRoute) => {
        navigation.navigate(route);
    };

    return (
        <ViewContainer>
            <View style={styles.container}>
                <HomeNavbarComponent title="Settings"
                                     description="You can change your preferences, password or log out here."/>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => onNavigationChange(ApplicationRoute.PREFERENCES)}>
                        <Text style={styles.buttonText}>Preferences</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                                      onPress={() => onNavigationChange(ApplicationRoute.CHANGE_PASSWORD_VIEW)}>
                        <Text style={styles.buttonText}>Change password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            UserService.userPreferences = undefined;
                            auth.signOut();
                        }}
                    >
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ApplicationBottomBar props={{navigation,}}/>
        </ViewContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
    },
    settingsContainer: {
        paddingHorizontal: 40,
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "20%",
    },
    button: {
        padding: 20,
        marginVertical: 10,
        backgroundColor: DEFAULT_COLORS.primaryBlue,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: DEFAULT_COLORS.primaryWhite,
        fontSize: 23,
        fontWeight: "bold",
    },
});