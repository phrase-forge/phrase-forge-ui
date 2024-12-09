/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text, View } from "react-native";
import { DEFAULT_COLORS } from "../../styles/Colors";
import { UserAchievement } from "../../model/ApplicationUser";

export const AchievementItem = (props: UserAchievement & { isUnlocked: boolean }) => {

    const getAchievementColor = (type) => {
        switch (type) {
            case 'Bronze':
                return '#cd7f32';
            case 'Silver':
                return '#c0c0c0';
            case 'Gold':
                return '#ffd700';
            default:
                return 'gray';
        }
    };

    return (
        <View style={[
            styles.achievementItem,
            { opacity: props.isUnlocked ? 1 : 0.5 }
        ]}>
            <View style={[
                styles.achievementIcon,
                { backgroundColor: getAchievementColor(props.type) }
            ]}>
                <Text style={styles.achievementType}>{props.type.charAt(0)}</Text>
            </View>
            <View style={styles.achievementInfo}>
                <Text style={styles.thresholdName}>{props.thresholdName}</Text>
                {props.isUnlocked && props.date ? (
                    <Text style={styles.dateText}>Unlocked: {new Date(props.date.seconds * 1000).toLocaleDateString()}</Text>
                ) : (
                    <Text style={styles.dateText}>Locked</Text>
                )}
            </View>
        </View>
    );
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
    },

    achievementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    achievementIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    achievementType: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    achievementInfo: {
        flexDirection: 'column',
    },
    thresholdName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
    },
});