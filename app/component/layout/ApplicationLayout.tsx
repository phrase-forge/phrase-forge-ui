import { NavigationContainer } from "@react-navigation/native";
import { UserContext } from "../../services/UserContext";
import { useContext, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../services/Firebase";
import { UserRole } from "../../model/ApplicationUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoggedUserLayout } from "./LoggedUserLayout";
import { LoginLayout } from "./LoginLayout";
import { UserService } from "../../services/UserService";
import { LoadingContext } from "../../services/LoadingContext";
import { ApplicationRoute } from "../../model/Routing";

const Stack = createNativeStackNavigator();

export const ApplicationLayout = () => {
    const { user, setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);

    const handleLoggedUser = (user: User) => {
        UserService.getUserDataById(user.uid)
            .then(([getDataResult, userStats]) => {
                const data = getDataResult.data();
                if (!data) {
                    UserService.addUser(user).then();
                }

                const roles = data ? data.roles : [UserRole.USER];
                const username = data && data.username || 'User';
                const stats = userStats || {}

                setUser({ user, roles, username, stats });
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                handleLoggedUser(user);
            } else {
                setUser(null);
            }

        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ApplicationRoute.LOGIN} screenOptions={{ headerShown: false }}>
                {
                    user ? (
                        <Stack.Screen name={ApplicationRoute.LOGGED_LAYOUT} component={LoggedUserLayout}/>
                    ) : (
                        <Stack.Screen name={ApplicationRoute.NOT_LOGGED_LAYOUT} component={LoginLayout}/>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};