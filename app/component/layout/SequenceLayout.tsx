import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ApplicationRoute} from "../../model/Routing";
import {EndOfGameView} from "../../views/EndOfGameView";
import {SequenceView} from "../../views/SequenceView";

const Stack = createNativeStackNavigator();


export const SequenceLayout = () => {
    return <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}}
                            initialRouteName={ApplicationRoute.SEQUENCE}>
        <Stack.Screen name={ApplicationRoute.SEQUENCE} component={SequenceView}/>
        <Stack.Screen name={ApplicationRoute.ENDGAME} component={EndOfGameView}/>
    </Stack.Navigator>
};