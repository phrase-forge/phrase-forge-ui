import { StyleSheet, Text, View } from "react-native";
import { DEFAULT_COLORS } from "../../styles/Colors";
import { UserAchievement } from "../../model/ApplicationUser";

const AchievementItemOrder = ({ type }) => {
    const getColor = () => {
        switch (type) {
            case 'Gold':
                return '#FFF08D';
            case 'Silver':
                return '#E1E1E1';
            default:
                return '#e7cfae';
        }
    };

    const getColorIn = () => {
        switch (type) {
            case 'Gold':
                return '#FFD700';
            case 'Silver':
                return '#C0C0C0';
            default:
                return '#CD7F32';
        }
    }
    return <View style={styles.itemOrderContainer}>
        <View style={{ ...styles.itemOrder, backgroundColor: getColor() }}></View>
        <View style={{ ...styles.itemOrderIn, backgroundColor: getColorIn() }}></View>
    </View>;
};

export const AchievementItem = (props: UserAchievement) => {
    return <View style={styles.itemContainer}>
        <AchievementItemOrder type={props.type}/>
        <View>
            <Text style={styles.itemTitle}>Earned
                <Text style={styles.itemTextBold}> {props.type}</Text> in <Text style={styles.itemTextBold}>{props.game}</Text>
            </Text>
            <Text style={styles.itemDate}>{props.date.toDate().toLocaleString()}</Text>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    itemOrderContainer: {
    },
    itemOrder: {
        borderRadius: 50,
        width: 35,
        height: 35,
    },
    itemOrderIn: {
        position: 'absolute',
        left: 5,
        top: 5,
        borderRadius: 50,
        width: 25,
        height: 25,
    },
    itemTextBold: {
        fontWeight: 'bold',
    },
    itemTitle: {
        fontSize: 20
    },
    itemDate: {
        color: DEFAULT_COLORS.primaryGray
    }
});