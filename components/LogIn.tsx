import React,{useState} from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity,Image
} from "react-native";
import Email_password from "./EmailPassword";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { NavigationProp } from '@react-navigation/native';
import  type {LogInBodyScreenProps}  from '../types'
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";


function LogIn({ navigation }: LogInBodyScreenProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
      <View style={styles.header}>
        <Text style={styles.text}>Log In</Text>
      </View>
      <View style={styles.container}>
        <Email_password></Email_password>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forget your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.createAcountContainer}>
          <Text style={styles.text1Navigator} >Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.text2Navigator}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.createAcountContainer}>
        <View style = {styles.line}/>
        <Text style = {styles.textToLogin} >Or login with</Text>
        <View style = {styles.line}/>
        </View>
        <View style={styles.createAcountContainer}>
         <Image source={require('../assets/googleIcon.png')} />
         <Image style = {styles.facebook} source={require('../assets/facebook.png')} />
        </View>
        
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  createAcountContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop : '10%'
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
  text1Navigator: {
    color: "#858597",
  },
  text2Navigator: {
    color: "#3D5CFF",
    paddingLeft:"1%"
  },
  line: {
    borderBottomColor: '#858597',
    borderBottomWidth: 1,
    width: "30%", 
  },
  textToLogin: {
    paddingLeft: "3%",
    paddingRight: "3%",
    color: "#858597",
  },
  facebook: {
    marginLeft: "7%",
  },
});

export default LogIn;
