import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { GamesView } from "../../views/GamesView";
import { QuizLayout } from "./QuizLayout";

const Stack = createNativeStackNavigator();


export const GamesLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}
                            initialRouteName={ApplicationRoute.GAMES_VIEW}>
        <Stack.Screen name={ApplicationRoute.GAMES_VIEW} component={GamesView}/>
        <Stack.Screen name={ApplicationRoute.GAME} component={QuizLayout}/>

    </Stack.Navigator>;
};