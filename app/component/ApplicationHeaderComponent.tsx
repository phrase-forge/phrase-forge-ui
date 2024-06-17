import { StyleSheet, Text, View } from "react-native";
import { DEFAULT_COLORS } from "../styles/Colors";

interface ApplicationHeaderProps {
    title: string;
    description: string;
}

export const ApplicationHeaderComponent = ({ title, description }: ApplicationHeaderProps) => {
    return <View style={styles.headerView}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
    </View>
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: DEFAULT_COLORS.primaryDark
    },
    descriptionText: {
        fontSize: 16,
        color: DEFAULT_COLORS.primaryGray
    },
    headerView: {
        height: 220,
        justifyContent: 'flex-end',
    }
})