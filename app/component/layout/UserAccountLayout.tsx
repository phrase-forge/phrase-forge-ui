import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { AccountActivityView } from "../../views/AccountActivityView";
import { AccountStatsView } from "../../views/AccountStatsView";

const Stack = createNativeStackNavigator();


export const UserAccountLayout = () => {
    return (
        <Stack.Navigator initialRouteName={ApplicationRoute.STATS} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ApplicationRoute.STATS} component={AccountStatsView}/>
            <Stack.Screen name={ApplicationRoute.ACHIEVEMENTS} component={AccountStatsView}/>
            <Stack.Screen name={ApplicationRoute.ACTIVITY} component={AccountActivityView}/>
        </Stack.Navigator>
    );
};