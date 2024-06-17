import { UserProvider } from "./app/services/UserContext";
import { ApplicationLayout } from "./app/component/layout/ApplicationLayout";
import { LoadingProvider } from "./app/services/LoadingContext";
import { PaperProvider } from "react-native-paper";
import { DEFAULT_THEME } from "./app/styles/Colors";

export default function App() {
    return (
        <LoadingProvider>
            <UserProvider>
                <PaperProvider theme={DEFAULT_THEME}>
                    <ApplicationLayout/>
                </PaperProvider>
            </UserProvider>
        </LoadingProvider>
    );
}
