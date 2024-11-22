import {Alert, ScrollView, StyleSheet, View} from "react-native";
import React, {useContext, useState} from "react";
import {LoadingContext} from "../services/LoadingContext";
import {CustomizedTextInput} from "../component/customized/CustomizedTextInput";
import {HomeNavbarComponent} from "../component/HomeNavbarComponent";
import {CustomizedButton} from "../component/customized/CustomizedButton";
import {RouterProps} from "../model/Routing";
import {EmailAuthProvider, reauthenticateWithCredential, updatePassword} from "firebase/auth";
import {auth} from "../services/Firebase";

export const ChangePasswordView = ({navigation}: RouterProps) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const {setLoading} = useContext(LoadingContext);

    const isButtonDisabled = !password.trim() || !newPassword.trim() || !newPasswordConfirmation.trim();


    const handlePreferencesSave = async () => {
        setLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) {
                Alert.alert("Error", "User is not authenticated.");
                setLoading(false);
                return;
            }

            const userCredential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, userCredential);

            if (!newPassword.trim()) {
                Alert.alert("Warning", "New password cannot be empty. Please enter a valid password.");
                setLoading(false);
                return;
            }
            if (newPassword !== newPasswordConfirmation) {
                Alert.alert("Warning", "Passwords do not match.");
                setLoading(false);
                return;
            }

            await updatePassword(user, newPassword);
            Alert.alert("Success", "Your password has been updated successfully.");
            navigation.goBack();
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                Alert.alert("Error", "The current password is incorrect.");
            } else if (error.code === "auth/weak-password") {
                Alert.alert("Error", "The new password is too weak. Please choose a stronger password.");
            } else {
                Alert.alert("Error", "An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.viewContainer}>
            <HomeNavbarComponent title="Password" description="You can change your password here."/>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.inputContainer}>
                    <CustomizedTextInput
                        value={password}
                        valueSetter={setPassword}
                        placeholder="Password"
                        passwordInput={true}
                        description="Your password"
                    />
                    <CustomizedTextInput
                        value={newPassword}
                        valueSetter={setNewPassword}
                        passwordInput={true}
                        placeholder="New password"
                        description="Your new password"
                    />
                    <CustomizedTextInput
                        value={newPasswordConfirmation}
                        valueSetter={setNewPasswordConfirmation}
                        passwordInput={true}
                        placeholder="New password"
                        description="Confirm new password"
                    />
                </View>
                <CustomizedButton
                    title="Save"
                    handleClick={handlePreferencesSave}
                    disabled={isButtonDisabled}>
                </CustomizedButton>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    scrollContainer: {
        paddingHorizontal: 24,
    },
    inputContainer: {
        gap: 16,
        marginTop: 24
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
});
