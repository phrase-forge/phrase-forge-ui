
import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Image
} from "react-native";
import { SignUpScreenProps } from '../types';
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import React from 'react';
import Email_password from "./EmailPassword";

function SignUp({ navigation }: SignUpScreenProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <View style={styles.header}>
        <Text style={styles.text}>SignUp</Text>
      </View>
      <View style={styles.container}>
        <Email_password></Email_password>
        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountButtonText}>Create acount</Text>
        </TouchableOpacity>       
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  header: {
    height: "20%",
    backgroundColor: '#B8B8D2',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: "20%",
    marginLeft: "8%"
  },
  container: {
    height: "80%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: "8%",
  },
  createAccountButton: {
    width: "100%",
    height: "10%",
    backgroundColor: "#68AFBF",
    alignSelf: "center",
    borderRadius: 5,
    justifyContent: "center",
    marginTop: "3%"
  },
  createAccountButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
  },
})


export default SignUp;