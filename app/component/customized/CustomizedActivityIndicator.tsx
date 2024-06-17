import { ActivityIndicator } from "react-native-paper";
import { useContext } from "react";
import { LoadingContext } from "../../services/LoadingContext";
import { StyleSheet, View } from "react-native";

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'gray'
    }
});

export const CustomizedActivityIndicator = () => {
    const { loading, setLoading } = useContext(LoadingContext);

    return <View>
        <ActivityIndicator style={style.container} size="large"/>
    </View>
}