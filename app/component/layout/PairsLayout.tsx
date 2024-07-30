import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { EndOfGameView } from "../../views/EndOfGameView";
import { PairsView } from "../../views/PairsView";

const Stack = createNativeStackNavigator();


export const PairsLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}
                            initialRouteName={ApplicationRoute.PAIRS}>
            <Stack.Screen name={ApplicationRoute.PAIRS} component={PairsView}/>
            <Stack.Screen name={ApplicationRoute.ENDGAME} component={EndOfGameView}/>                      
        </Stack.Navigator>
};