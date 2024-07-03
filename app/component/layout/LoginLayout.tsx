import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginView } from "../../views/LoginView";
import { RegisterView } from "../../views/RegisterView";
import { ApplicationRoute } from "../../model/Routing";

const Stack = createNativeStackNavigator();

export const LoginLayout = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ApplicationRoute.LOGIN} component={LoginView}/>
            <Stack.Screen name={ApplicationRoute.REGISTER} component={RegisterView}/>
        </Stack.Navigator>
    );
};