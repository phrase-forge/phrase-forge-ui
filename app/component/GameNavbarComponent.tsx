import { StyleSheet, Text, View } from "react-native";
import { CustomizedAvatar } from "./customized/CustomizedAvatar";
import React from "react";
import { DEFAULT_COLORS } from "../styles/Colors";

interface NavbarProps {
    title: string;
    description?: string;
}

export const GameNavbarComponent = ({ title, description }: NavbarProps) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description ? <Text style={styles.description}>{description}</Text> : null}
            </View>
            <View style={styles.avatarContainer}>
                <CustomizedAvatar size='small' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 150,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: DEFAULT_COLORS.primaryWhite,
    },
    textContainer: {
        padding: 32,
        width: '70%',
    },
    avatarContainer: {
        padding: 32,
    },
    title: {
        color: DEFAULT_COLORS.primaryDark,
        fontSize: 40,
        fontWeight: 'bold',
    },
    description: {
        color: DEFAULT_COLORS.primaryGray,
        fontSize: 16,
        flexWrap: 'wrap',
    },
});
