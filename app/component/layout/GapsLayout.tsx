import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { EndOfGameView } from "../../views/EndOfGameView";
import { GapsView } from "../../views/GapsView";

const Stack = createNativeStackNavigator();


export const GapsLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}
                            initialRouteName={ApplicationRoute.GAPS}>
            <Stack.Screen name={ApplicationRoute.GAPS} component={GapsView}/>
            <Stack.Screen name={ApplicationRoute.ENDGAME} component={EndOfGameView}/>                      
        </Stack.Navigator>
};