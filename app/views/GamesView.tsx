import { Button, Text } from "react-native";
import { ApplicationBottomBar } from "../component/ApplicationBottomBar";
import { RouterProps } from "../model/Routing";
import { auth } from "../services/Firebase";
import { ViewContainer } from "../component/ViewContainer";

export const GamesView = ({ navigation }: RouterProps) => {
    return <ViewContainer>
        <Text>Games view</Text>
        <Button onPress={() => auth.signOut()} title="Sign out"></Button>
        <ApplicationBottomBar props={{ navigation, }}/>
    </ViewContainer>;
};