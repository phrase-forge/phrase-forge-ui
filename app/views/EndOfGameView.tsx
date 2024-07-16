import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { ApplicationRoute } from "../model/Routing";
import { ViewContainer } from "../component/ViewContainer";
import { useNavigation } from "@react-navigation/native";

export const EndOfGameView = () => {
  const navigation = useNavigation();

  const onNavigationChange = () => {
    navigation.replace(ApplicationRoute.GAMES_VIEW);
  };

  return (
    <ViewContainer style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          You finished all the tasks for this Game!
        </Text>
        <TouchableOpacity style={styles.button} onPress={onNavigationChange}>
          <Text style={styles.buttonText}>Go to other games</Text>
        </TouchableOpacity>
      </View>
      <ApplicationBottomBar props={{ navigation }} />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8", // Można dostosować kolor tła
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EndOfGameView;
