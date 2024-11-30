import { useContext, useState } from "react";
import { LoadingContext } from "../services/LoadingContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/Firebase";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { ApplicationHeaderComponent } from "../component/ApplicationHeaderComponent";
import { CustomizedTextInput } from "../component/customized/CustomizedTextInput";
import { Link } from "@react-navigation/native";
import { DEFAULT_COLORS } from "../styles/Colors";
import { CustomizedButton } from "../component/customized/CustomizedButton";
import { ApplicationRoute } from "../model/Routing";

export const RegisterView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setLoading} = useContext(LoadingContext);

    const signUp = async () => {
        setLoading(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .catch(error => {
                if (error.code === "auth/weak-password") {
                    Alert.alert("Error", "The new password is too weak. Please choose a stronger password.");
                } else if (error.code === "auth/invalid-email") {
                    Alert.alert("Error", "The email address is invalid. Please check the format and try again.");
                } else {
                    Alert.alert("Error", "An unexpected error occurred. Please try again.");
                }
                setLoading(false);
            });
    };

    return (
        <ScrollView style={styles.container}>
            <ApplicationHeaderComponent title="Sign Up" description="Enter your details below and create your account"/>
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

            <CustomizedButton title="Create account" handleClick={signUp}></CustomizedButton>

            <View style={styles.noAccount}>
                <Text style={{ color: DEFAULT_COLORS.primaryGray }}>Already have an account?
                </Text>
                <Link style={{ marginLeft: 4, color: DEFAULT_COLORS.primaryBlue }}
                      to={{ screen: `${ApplicationRoute.LOGIN}` }}>
                    Log in
                </Link>
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