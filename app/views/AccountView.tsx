import { Button, Text } from "react-native";
import { RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/ApplicationBottomBar";
import { auth } from "../services/Firebase";
import { ViewContainer } from "../component/ViewContainer";

export const AccountView = ({ navigation }: RouterProps) => {
    return <ViewContainer>
        <Text>Account View</Text>
        <Button onPress={() => auth.signOut()} title="Sign out"></Button>
        <ApplicationBottomBar props={{ navigation, }}/>
    </ViewContainer>;
};