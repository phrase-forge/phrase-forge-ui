import { StyleSheet, Text, View } from "react-native";
import { DEFAULT_COLORS } from "../styles/Colors";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dividerTextBox: {
    },
    dividerText: {
        color: DEFAULT_COLORS.primaryGray
    },
    dividerLine: {
        width: '35%',
        height: .7,
        backgroundColor: DEFAULT_COLORS.secondaryGray
    },
})

export const CustomizedDivider = ({text}: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.dividerLine}/>
            <View style={styles.dividerTextBox}>
                <Text style={styles.dividerText}>{text}</Text>
            </View>
            <View style={styles.dividerLine}/>
        </View>
    );
}