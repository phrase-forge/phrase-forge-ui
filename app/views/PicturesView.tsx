/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ViewContainer } from "../component/ViewContainer";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { GameNavbarComponent } from "../component/GameNavbarComponent";
import { DEFAULT_COLORS } from "../styles/Colors";
import { UserService } from "../services/UserService";
import { UserContext } from "../services/UserContext";
import { PicturesTask } from "../model/ApplicationUser";
import { ApplicationRoute } from "../model/Routing";
import EndOfGameView from "./EndOfGameView";
import ImageTaskView from "./ImageTaskView";
import { GameScoreHelper } from "../helpers/GameScoreHelper";
import { Games } from "../model/Games";
import { updateUserAchievements } from "../services/AchievementsService";

export const PicturesView = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [picturesTasks, setPicturesTasks] = useState<PicturesTask[] | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionColors, setOptionColors] = useState(
    Array(2).fill(DEFAULT_COLORS.primaryBlue)
  );
  const [number, setNumber] = useState(0);
  const [taskToRemove, setTaskToRemove] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const onNavigationChange = async () => {
    if (taskToRemove === 1) {
      picturesTasks.splice(number, 1);
      setTaskToRemove(0);
      if (number == picturesTasks.length) {
        setNumber(0);
      }
    } else {
      if (number + 1 > picturesTasks.length - 1) {
        setNumber(0);
      } else {
        setNumber(number + 1);
      }
    }
    setOptionColors(Array(4).fill(DEFAULT_COLORS.primaryBlue));
    setSelectedOption(null);
    if (picturesTasks.length == 0) {
      await UserService.updateGameTimeStats(user.user.uid, new Date(startTime), new Date());
      await updateUserAchievements(user.user.uid);
      navigation.replace(ApplicationRoute.ENDGAME);
    }
  };

  const handleOptionPress = (index) => {
    if (selectedOption === null) {
      const correctAnswerIndex = picturesTasks[number].answers[2];
      const newColors = [...optionColors];
      let isCorrectAnswer = false;

      if (index == correctAnswerIndex) {
        isCorrectAnswer = true;
        setStreak(streak + 1);
        newColors[index] = "green";
        UserService.addTaskToUserStats(user.user.uid, picturesTasks[number].id);
        setTaskToRemove(1);
      } else {
        newColors[index] = "red";
        newColors[correctAnswerIndex] = "green";
        setStreak(0);
      }
      setOptionColors(newColors);
      setSelectedOption(index);

      const newScore = GameScoreHelper.calculatePointsForAnswer(isCorrectAnswer, score, streak + 1);
      setScore(newScore);
      GameScoreHelper.updateUserPoints(user.user.uid, newScore, Games.PICTURES);
    }
  };

  useEffect(() => {
    const fetchQuizTasks = async () => {
      const tasks = await UserService.getUserPicturesTask(user.user.uid);
      setPicturesTasks(tasks);
    };

    fetchQuizTasks();
    setStartTime(new Date().getTime());
  }, []);

  if (picturesTasks === null) {
    return <Text>Loading...</Text>;
  }

  if (picturesTasks.length < 1) {
    return <EndOfGameView></EndOfGameView>;
  }

  return (
    <ViewContainer>
      <View style={styles.quizContainer}>
        <GameNavbarComponent
          title="Pictures"
          description="Choose the idiom that matches the picture"
        />
        <View style={styles.quiz}>
          <View style={styles.quizQuestion}>
            <ImageTaskView photo={picturesTasks[number].photo} />
          </View>
          <View style={styles.quizOptions}>
            {picturesTasks[number].answers.slice(0, 2).map((answer, index) => (
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
    padding: 20,
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
    justifyContent: "center",
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
    padding: 10,
  },
  navigationButtonText: {
    fontSize: 20,
    color: DEFAULT_COLORS.primaryGray,
  },
});
