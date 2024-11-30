import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper";
import { DEFAULT_COLORS } from "../../styles/Colors";
import { ApplicationRoute } from "../../model/Routing";
import { useRoute } from "@react-navigation/native";

const BOTTOM_APPBAR_HEIGHT = 70;

interface BarActionProps {
    label: string;
    icon: string;
    route: ApplicationRoute;
}

const MENU_ACTIONS: BarActionProps[] = [
    {
        label: 'Home',
        icon: 'home',
        route: ApplicationRoute.HOME
    },
    {
        label: 'Games',
        icon: 'gamepad-variant-outline',
        route: ApplicationRoute.GAMES
    },
    {
        label: 'Dictionary',
        icon: 'book-open',
        route: ApplicationRoute.DICTIONARY
    },
    {
        label: 'Settings',
        icon: 'cog-outline',
        route: ApplicationRoute.SETTINGS
    },
    {
        label: 'Account',
        icon: 'account',
        route: ApplicationRoute.ACCOUNT
    },
];

const ApplicationBarAction = (props) => {
    const currentRoute = useRoute();
    const { label, icon, route, navigation } = props.propsObject;
    const getStyles = () => {
        return isRouteMatching() ?
            {
                borderTopWidth: 3,
                borderTopColor: DEFAULT_COLORS.primaryBlue,
            } : {};
    };

    const getColor = () => {
        return isRouteMatching() ?
            DEFAULT_COLORS.primaryBlue :
            DEFAULT_COLORS.primaryDark;
    };

    const isRouteMatching = (): boolean => {
        const splitRoute = currentRoute.name.split('/') as string[];
        return splitRoute.includes(route.slice(1));
    };

    const gamesNestedParameters = {
        screen: ApplicationRoute.GAMES_VIEW
    };

    const getNestedParams = () => {
        return route === ApplicationRoute.GAMES ? gamesNestedParameters : {};
    };

    return (
        <View style={{
            borderTopWidth: 3,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            ...getStyles()
        }}>
            <Appbar.Action iconColor={getColor()} icon={icon} onPress={() => {
                navigation.navigate(ApplicationRoute.LOGGED_LAYOUT, {
                    screen: route,
                    params: getNestedParams()
                });
            }}/>
            <Text style={{ color: getColor() }}>{label}</Text>
        </View>
    );
};

export const ApplicationBottomBar = (props) => {
    const { bottom } = useSafeAreaInsets();
    const { navigation } = props.props;

    return (
        <Appbar
            style={[
                styles.bottom,
                {
                    height: BOTTOM_APPBAR_HEIGHT + bottom,
                },
            ]}
            safeAreaInsets={{ bottom }}
        >
            {
                MENU_ACTIONS.map(menuAction => <ApplicationBarAction
                    key={menuAction.label}
                    propsObject={{ ...menuAction, navigation }}/>)
            }
        </Appbar>
    );
};

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        overflow: 'hidden',
    },
});