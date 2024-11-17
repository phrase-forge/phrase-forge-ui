import {HomeView} from "../../views/HomeView";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApplicationRoute} from "../../model/Routing";
import {AccountView} from "../../views/AccountView";
import {GamesLayout} from "./GamesLayout";
import {SettingsLayout} from "./SettingsLayout";


const Stack = createNativeStackNavigator();

export const LoggedUserLayout = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name={ApplicationRoute.HOME} component={HomeView}/>
            <Stack.Screen name={ApplicationRoute.GAMES} component={GamesLayout}/>
            <Stack.Screen name={ApplicationRoute.SETTINGS} component={SettingsLayout}/>
            <Stack.Screen name={ApplicationRoute.ACCOUNT} component={AccountView}/>
        </Stack.Navigator>
    );
};