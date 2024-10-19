import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ViewContainer } from "../component/ViewContainer";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { GameNavbarComponent } from "../component/GameNavbarComponent";
import { DEFAULT_COLORS } from "../styles/Colors";
import { UserService } from "../services/UserService";
import { UserContext } from "../services/UserContext";
import { QuizTask } from "../model/ApplicationUser";
import { ApplicationRoute } from "../model/Routing";
import EndOfGameView from "./EndOfGameView";
import { GameScoreHelper } from "../helpers/GameScoreHelper";
import { Games } from "../model/Games";

// eslint-disable-next-line react/prop-types
export const QuizView = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [quizTasks, setQuizTasks] = useState<QuizTask[] | null>(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionColors, setOptionColors] = useState(
    Array(4).fill(DEFAULT_COLORS.primaryBlue)
  );
  const [number, setNumber] = useState(0);
  const [taskToRemove, setTaskToRemove] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const onNavigationChange = () => {
    if (taskToRemove === 1) {
      quizTasks.splice(number, 1);
      setTaskToRemove(0);
      if (number == quizTasks.length) {
        setNumber(0);
      }
    } else {
      if (number + 1 > quizTasks.length - 1) {
        setNumber(0);
      } else {
        setNumber(number + 1);
      }
    }
    setOptionColors(Array(4).fill(DEFAULT_COLORS.primaryBlue));
    setSelectedOption(null);

    if (quizTasks.length == 0) {
      UserService.updateGameTimeStats(user.user.uid, new Date(startTime), new Date());
      // eslint-disable-next-line react/prop-types
      navigation.replace(ApplicationRoute.ENDGAME);
    }
  };

  const handleOptionPress = (index) => {
    if (selectedOption === null) {
      const correctAnswerIndex = quizTasks[number].answers[4];
      const newColors = [...optionColors];
      let isCorrectAnswer = false;

      if (index == correctAnswerIndex) {
        newColors[index] = "green";
        isCorrectAnswer = true;
        setStreak(streak + 1);

        UserService.addTaskToUserStats(user.user.uid, quizTasks[number].id);
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
      GameScoreHelper.updateUserPoints(user.user.uid, newScore, Games.QUIZ);
    }
  };

  useEffect(() => {
    const fetchQuizTasks = async () => {
      const tasks = await UserService.getUserQuizTask(user.user.uid);
      setQuizTasks(tasks);
    };

    fetchQuizTasks();
    setStartTime(new Date().getTime());
  }, []);

  
  if (quizTasks === null) {
    return <Text>Loading...</Text>;
  }

  if (quizTasks.length < 1) {
    return <EndOfGameView></EndOfGameView>;
  }

  return (
    <ViewContainer>
      <View style={styles.quizContainer}>
        <GameNavbarComponent
          title="Quiz"
          description="Select the correct answer"
        />
        <View style={styles.quiz}>
          <View style={styles.quizQuestion}>
            <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 20 }}>
              {quizTasks[number].phraseology}
            </Text>
          </View>
          <View style={styles.quizOptions}>
            {quizTasks[number].answers.slice(0, 4).map((answer, index) => (
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
