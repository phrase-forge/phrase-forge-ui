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

const HOME_ACTION: BarActionProps = {
    label: 'Home',
    icon: 'home',
    route: ApplicationRoute.HOME
};

const GAMES_ACTION: BarActionProps = {
    label: 'Games',
    icon: 'gamepad-variant-outline',
    route: ApplicationRoute.GAMES
};

const SETTINGS_ACTION: BarActionProps = {
    label: 'Settings',
    icon: 'cog-outline',
    route: ApplicationRoute.SETTINGS
};

const ACCOUNT_ACTION: BarActionProps = {
    label: 'Account',
    icon: 'account',
    route: ApplicationRoute.ACCOUNT
};

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
            DEFAULT_COLORS.primaryBlue:
            DEFAULT_COLORS.primaryDark
    }

    const isRouteMatching = (): boolean => {
        const splitRoute = currentRoute.name.split('/') as string[];
        return splitRoute.includes(route.slice(1));
    }

    const gamesNestedParameters = {
        screen: ApplicationRoute.GAMES_VIEW
    }

    const getNestedParams = () => {
        return route === ApplicationRoute.GAMES ? gamesNestedParameters: {};
    }

    return (
        <View style={{
            borderTopWidth: 3,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            ...getStyles() }}>
            <Appbar.Action iconColor={getColor()}  icon={icon} onPress={() => {
                navigation.navigate(ApplicationRoute.LOGGED_LAYOUT, {
                    screen: route,
                    params: getNestedParams()
                });
            }}/>
            <Text style={{color: getColor()}}>{label}</Text>
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
            <ApplicationBarAction propsObject={{ ...HOME_ACTION, navigation }}/>
            <ApplicationBarAction propsObject={{ ...GAMES_ACTION, navigation }}/>
            <ApplicationBarAction propsObject={{ ...SETTINGS_ACTION, navigation }}/>
            <ApplicationBarAction propsObject={{ ...ACCOUNT_ACTION, navigation }}/>
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
        gap: 45,

    },
});