import { View } from "react-native";

export const ViewContainer = ({children}) => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {children}
    </View>
}