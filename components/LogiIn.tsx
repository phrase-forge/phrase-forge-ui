import React from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity,
} from "react-native";
import Email_password from "./Email_password";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const LogIn: React.FC = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Email_password></Email_password>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forget your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: "8%",
  },
  forgotPasswordButton: {
    width: "100%",
    paddingTop: "3%",
    paddingBottom: "3%",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#858597",
  },
  loginButton: {
    width: "100%",
    height: "10%",
    backgroundColor: "#68AFBF",
    alignSelf: "center",
    borderRadius: 5,
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
});

export default LogIn;
