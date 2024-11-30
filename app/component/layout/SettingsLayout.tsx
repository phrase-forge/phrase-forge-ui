import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApplicationRoute} from "../../model/Routing";
import {SettingsView} from "../../views/SettingsView";
import {UserPreferencesView} from "../../views/UserPreferencesView";
import {ChangePasswordView} from "../../views/ChangePasswordView";

const Stack = createNativeStackNavigator();


export const SettingsLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }} initialRouteName={ApplicationRoute.SETTINGS_VIEW}>
        <Stack.Screen name={ApplicationRoute.SETTINGS_VIEW} component={SettingsView}/>
        <Stack.Screen name={ApplicationRoute.PREFERENCES} component={UserPreferencesView}/>
        <Stack.Screen name={ApplicationRoute.CHANGE_PASSWORD_VIEW} component={ChangePasswordView}/>
    </Stack.Navigator>
};