/* eslint-disable react/prop-types */
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { ApplicationRoute } from "../model/Routing";
import { ViewContainer } from "../component/ViewContainer";
import React from "react";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";
import { DEFAULT_COLORS } from "../styles/Colors";

export const GamesView = ({ navigation }) => {
  const onNavigationChange = (route: ApplicationRoute) => {
    navigation.navigate(route);
  };

  return (
    <ViewContainer>
      <View style={styles.container}>
        <HomeNavbarComponent title="Games" description="Let's have some fun!" />
        <ScrollView>
          <View style={styles.gamesContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onNavigationChange(ApplicationRoute.QUIZ_VIEW)}
            >
              <Text style={styles.buttonText}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onNavigationChange(ApplicationRoute.PICTURES_VIEW)}>
              <Text style={styles.buttonText}>Pictures</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onNavigationChange(ApplicationRoute.PAIRS_VIEW)}>
              <Text style={styles.buttonText}>Pairs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onNavigationChange(ApplicationRoute.GAPS_VIEW)}>
              <Text style={styles.buttonText} >Gaps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onNavigationChange(ApplicationRoute.SEQUENCE_VIEW)}>
              <Text style={styles.buttonText}>Sequence</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onNavigationChange(ApplicationRoute.TRANSLATE_VIEW)}>
              <Text style={styles.buttonText}>Translate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <ApplicationBottomBar props={{ navigation }} />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gamesContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "10%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  profileImage: {
    width: 70,
    height: 60,
    borderRadius: 20,
  },
  button: {
    width: "48%",
    height: "26%",
    padding: 20,
    marginVertical: 10,
    backgroundColor: DEFAULT_COLORS.primaryBlue,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: DEFAULT_COLORS.primaryWhite,
    fontSize: 23,
    fontWeight: "bold",
  },
});
