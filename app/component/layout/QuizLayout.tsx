import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { EndOfGameView } from "../../views/EndOfGameView";

const Stack = createNativeStackNavigator();


export const QuizLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}
                            initialRouteName={ApplicationRoute.QUIZ}>
            <Stack.Screen name={ApplicationRoute.ENDGAME} component={EndOfGameView}/>                    
        </Stack.Navigator>
};