import { StyleSheet, Text, View } from "react-native";
import { CustomizedAvatar } from "./customized/CustomizedAvatar";
import React from "react";
import { DEFAULT_COLORS } from "../styles/Colors";

interface NavbarProps {
    title: string;
    description?: string;
}

export const HomeNavbarComponent = ({ title, description }: NavbarProps) => {
    return <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.headerTitleText}>{title}</Text>
            {description ? <Text style={styles.headerTitleDescription}>{description}</Text> : <></>}
        </View>
        <View style={styles.avatarContainer}>
            <CustomizedAvatar size="small"/>
        </View>
    </View>;
};


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: DEFAULT_COLORS.primaryBlue,
        height: 160,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        paddingHorizontal: 10,
    },
    headerTitleText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerTitleDescription: {
        color: 'white',
        fontSize: 16,
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    avatarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});