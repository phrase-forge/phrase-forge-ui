import { StyleSheet, View } from "react-native";
import React from "react";

export const CustomizedCard = ({ children, externalStyles = {} }) => {
    return <View style={{ ...styles.contentContainer, ...externalStyles }}>
        {children}
    </View>;
};

const styles = StyleSheet.create({
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