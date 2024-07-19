import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { EndOfGameView } from "../../views/EndOfGameView";
import { PicturesView } from "../../views/PicturesView";

const Stack = createNativeStackNavigator();


export const PicturesLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}
                            initialRouteName={ApplicationRoute.PICTURES}>
            <Stack.Screen name={ApplicationRoute.PICTURES} component={PicturesView}/>
            <Stack.Screen name={ApplicationRoute.ENDGAME} component={EndOfGameView}/>                      
        </Stack.Navigator>
};