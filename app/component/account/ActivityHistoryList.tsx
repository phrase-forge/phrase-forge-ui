import { StyleSheet, Text, View } from "react-native";
import { AchievementItem } from "./AchievementItem";
import { UserAchievement } from "../../model/ApplicationUser";

export const ActivityHistoryList = ({ activityList }) => {
    return <View style={styles.container}>
        {activityList.length > 0 ? activityList.map((activity: UserAchievement, index: number) => {
            return <AchievementItem
                key={index}
                game={activity.game}
                date={activity.date}
                type={activity.type}/>;
        }) : <View>
            <Text>No data found</Text>
        </View>
        }
    </View>;
};

const styles = StyleSheet.create({
    container: {
        gap: 24
    }
});