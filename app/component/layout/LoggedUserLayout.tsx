import { HomeView } from "../../views/HomeView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { GamesView } from "../../views/GamesView";
import { SettingsView } from "../../views/SettingsView";
import { AccountView } from "../../views/AccountView";

const Stack = createNativeStackNavigator();

export const LoggedUserLayout = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name={ApplicationRoute.HOME} component={HomeView}/>
            <Stack.Screen name={ApplicationRoute.GAMES} component={GamesView}/>
            <Stack.Screen name={ApplicationRoute.SETTINGS} component={SettingsView}/>
            <Stack.Screen name={ApplicationRoute.ACCOUNT} component={AccountView}/>
        </Stack.Navigator>
    );
};