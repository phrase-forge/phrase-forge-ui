import React, { useState } from "react";
import {
  StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Email_password: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Email</Text>
      <TextInput
        placeholder="Enter Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.text}>Password</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.password}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "30%",
  },
  password: {
    width: "90%",
  },
  input: {
    height: "23%",
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    paddingTop: "6%",
    paddingVertical: "2%",
    color: "#858597",
    fontSize: 16,
  },
});

export default Email_password;
