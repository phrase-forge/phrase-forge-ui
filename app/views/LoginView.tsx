/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/Firebase";
import { LoadingContext } from "../services/LoadingContext";
import { ApplicationHeaderComponent } from "../component/ApplicationHeaderComponent";
import { CustomizedTextInput } from "../component/customized/CustomizedTextInput";
import { CustomizedButton } from "../component/customized/CustomizedButton";
import { DEFAULT_COLORS } from "../styles/Colors";
import { Link } from "@react-navigation/native";
import { CustomizedDivider } from "../component/customized/CustomizedDivider";
import { SocialIcon } from "@rneui/themed";
import { ApplicationRoute } from "../model/Routing";
import {UserService} from "../services/UserService";
import { updateUserAchievements } from "../services/AchievementsService";

export const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setLoading } = useContext(LoadingContext);

    const signIn = async () => {
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            UserService.userPreferences = await UserService.getUserPreferences(userId);
            await UserService.updateLoginStats(userId);
            await updateUserAchievements(userId);
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                Alert.alert("Error", "Email or password is incorrect.");
            } else {
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <ScrollView style={styles.container}>
            <ApplicationHeaderComponent title="Log In" description="Enter your details and log in to your account"/>
            <View style={styles.inputContainer}>
                <CustomizedTextInput
                    value={email}
                    valueSetter={setEmail}
                    placeholder="Email"
                    description="Your email"
                />
                <CustomizedTextInput
                    value={password}
                    valueSetter={setPassword}
                    placeholder="Password"
                    passwordInput={true}
                    description="Your password"
                />
            </View>

            <View style={styles.forgetPassword}>
                {/* todo handle forget password process*/}
                <Link style={{ marginLeft: 4, color: DEFAULT_COLORS.primaryGray }}
                      to={{ screen: `${ApplicationRoute.REGISTER}` }}>
                    Forget password
                </Link>
            </View>

            <CustomizedButton title="Log In" handleClick={signIn}></CustomizedButton>

            <View style={styles.noAccount}>
                <Text style={{ color: DEFAULT_COLORS.primaryGray }}>Don't have an account?
                </Text>
                <Link style={{ marginLeft: 4, color: DEFAULT_COLORS.primaryBlue }}
                      to={{ screen: `${ApplicationRoute.REGISTER}` }}>
                    Sign up
                </Link>
            </View>

            <CustomizedDivider text="Or login with"></CustomizedDivider>

            {/*// todo handle login using other auth providers */}
            <View style={styles.socialsContainer}>
                <SocialIcon type="google"/>
                <SocialIcon type="facebook"/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
    },
    inputContainer: {
        gap: 16,
        marginTop: 64
    },
    forgetPassword: {
        marginVertical: 8,
        alignItems: 'flex-end'
    },
    noAccount: {
        marginVertical: 32,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    socialsContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
