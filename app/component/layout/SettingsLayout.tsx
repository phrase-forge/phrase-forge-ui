import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApplicationRoute} from "../../model/Routing";
import {SettingsView} from "../../views/SettingsView";
import {UserPreferencesView} from "../../views/UserPreferencesView";

const Stack = createNativeStackNavigator();


export const SettingsLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }} initialRouteName={ApplicationRoute.SETTINGS_VIEW}>
        <Stack.Screen name={ApplicationRoute.SETTINGS_VIEW} component={SettingsView}/>
        <Stack.Screen name={ApplicationRoute.PREFERENCES} component={UserPreferencesView}/>
    </Stack.Navigator>
};