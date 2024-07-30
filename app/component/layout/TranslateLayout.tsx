import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { EndOfGameView } from "../../views/EndOfGameView";
import { TranslateView } from "../../views/TranslateView";

const Stack = createNativeStackNavigator();


export const TranslateLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}
                            initialRouteName={ApplicationRoute.TRANSLATE}>
            <Stack.Screen name={ApplicationRoute.TRANSLATE} component={TranslateView}/>
            <Stack.Screen name={ApplicationRoute.ENDGAME} component={EndOfGameView}/>                      
        </Stack.Navigator>
};