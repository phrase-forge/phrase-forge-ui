import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { ApplicationRoute } from "../model/Routing";
import { ViewContainer } from "../component/ViewContainer";
import React from "react";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";
import Category from "../../components/Category";

export const GamesView = ({ navigation }) => {

    const onNavigationChange = (route: ApplicationRoute) => {
        navigation.navigate(ApplicationRoute.GAMES, { screen: route })
    }

    return <ViewContainer>
        <View style={styles.container}>
            <HomeNavbarComponent title="Games" description="Let's have some fun!"/>
            <View style={styles.gamesContainer}>
                <TouchableOpacity style={styles.button} onPress={() => onNavigationChange(ApplicationRoute.QUIZ)}>
                    <Text style={styles.buttonText}>Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Pictures</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Pairs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Gaps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sequence</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Translate</Text>
                </TouchableOpacity>
            </View>
        </View>
        <ApplicationBottomBar props={{ navigation, }}/>
    </ViewContainer>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gamesContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '10%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    profileImage: {
        width: 70,
        height: 60,
        borderRadius: 20,
    },
    button: {
        width: '48%',
        height: '25%',
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#6c99b2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
    },
});