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
        <View style={{ padding: 32 }}>
            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>{title}</Text>
            {description ? <Text style={{ color: 'white', fontSize: 16 }}>{description}</Text> : <></>}
        </View>
        <View style={{ padding: 32 }}>
            <CustomizedAvatar size="small"/>
        </View>
    </View>;
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
});