import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationRoute } from "../../model/Routing";
import { GamesView } from "../../views/GamesView";
import { QuizLayout } from "./QuizLayout";
import { TranslateLayout } from "./TranslateLayout";

const Stack = createNativeStackNavigator();


export const GamesLayout = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}
                            initialRouteName={ApplicationRoute.GAMES_VIEW}>
        <Stack.Screen name={ApplicationRoute.GAMES_VIEW} component={GamesView}/>
        <Stack.Screen name={ApplicationRoute.QUIZ_VIEW} component={QuizLayout}/>
        <Stack.Screen name={ApplicationRoute.TRANSLATE_VIEW} component={TranslateLayout}/>

    </Stack.Navigator>;
};