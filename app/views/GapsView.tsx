import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ViewContainer } from "../component/ViewContainer";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { GameNavbarComponent } from "../component/GameNavbarComponent";
import { DEFAULT_COLORS } from "../styles/Colors";
import { UserService } from "../services/UserService";
import { UserContext } from "../services/UserContext";
import { GapsTask } from "../model/ApplicationUser";
import { ApplicationRoute } from "../model/Routing";
import EndOfGameView from "./EndOfGameView";

export const GapsView = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [gapsTasks, setGapsTasks] = useState<GapsTask[] | null>(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionColors, setOptionColors] = useState(
    Array(4).fill(DEFAULT_COLORS.primaryBlue)
  );
  const [number, setNumber] = useState(0);
  const [taskToRemove, setTaskToRemove] = useState(0);

  const onNavigationChange = () => {
    if (taskToRemove === 1) {
      gapsTasks.splice(number, 1);
      setTaskToRemove(0);
      if (number == gapsTasks.length) {
        setNumber(0);
      }
    } else {
      if (number + 1 > gapsTasks.length - 1) {
        setNumber(0);
      } else {
        setNumber(number + 1);
      }
    }
    setOptionColors(Array(4).fill(DEFAULT_COLORS.primaryBlue));
    setSelectedOption(null);
    if (gapsTasks.length == 0) {
      navigation.replace(ApplicationRoute.ENDGAME);
    }
  };

  const handleOptionPress = (index) => {
    if (selectedOption === null) {
      const correctAnswerIndex = gapsTasks[number].answers[4];
      const newColors = [...optionColors];

      if (index == correctAnswerIndex) {
        newColors[index] = "green";
        UserService.addTaskToUserStats(user.user.uid, gapsTasks[number].id);
        setTaskToRemove(1);
      } else {
        newColors[index] = "red";
        newColors[correctAnswerIndex] = "green";
      }
      setOptionColors(newColors);
      setSelectedOption(index);
    }
  };

  useEffect(() => {
    const fetchQuizTasks = async () => {
      const tasks = await UserService.getUserGapsTask(user.user.uid);
      setGapsTasks(tasks);
    };

    fetchQuizTasks();
  }, []);

  if (gapsTasks === null) {
    return <Text>Loading...</Text>;
  }

  if (gapsTasks.length < 1) {
    return <EndOfGameView></EndOfGameView>;
  }

  return (
    <ViewContainer>
      <View style={styles.quizContainer}>
        <GameNavbarComponent
          title="Gaps"
          description="Select the appropriate text to fill in the blank."
        />
        <View style={styles.quiz}>
          <View style={styles.quizQuestion}>
            <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 20 }}>
              {gapsTasks[number].gaps}
            </Text>
            <Text style={{ color: DEFAULT_COLORS.primaryBlue, fontSize: 16 }}>
              which means "{gapsTasks[number].phraseology}"
            </Text>
          </View>
          <View style={styles.quizOptions}>
            {gapsTasks[number].answers.slice(0, 4).map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quizOption,
                  { backgroundColor: optionColors[index] },
                ]}
                onPress={() => handleOptionPress(index)}
              >
                <Text style={styles.quizOptionText}>{answer}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => onNavigationChange()}
          >
            <Text style={styles.navigationButtonText}>Next question</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ApplicationBottomBar props={{ navigation }} />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: DEFAULT_COLORS.primaryWhite,
  },
  quiz: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  quizQuestion: {
    width: "100%",
    padding: 18,
    backgroundColor: DEFAULT_COLORS.primaryPink,
    textAlign: "center",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  quizOptions: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quizOption: {
    width: "100%",
    flexBasis: "10%",
    backgroundColor: DEFAULT_COLORS.primaryBlue,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    padding: 20,
  },
  quizOptionText: {
    fontSize: 20,
    color: DEFAULT_COLORS.primaryWhite,
  },
  navigationButton: {
    width: "50%",
    backgroundColor: DEFAULT_COLORS.primaryPink,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 2,
    padding: 8,
  },
  navigationButtonText: {
    fontSize: 20,
    color: DEFAULT_COLORS.primaryGray,
  },
});
