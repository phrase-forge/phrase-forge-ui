/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ViewContainer } from "../component/ViewContainer";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { GameNavbarComponent } from "../component/GameNavbarComponent";
import { DEFAULT_COLORS } from "../styles/Colors";
import { UserService } from "../services/UserService";
import { UserContext } from "../services/UserContext";
import { TranslateTask } from "../model/ApplicationUser";
import { ApplicationRoute } from "../model/Routing";
import EndOfGameView from "./EndOfGameView";
import { GameScoreHelper } from "../helpers/GameScoreHelper";
import { Games } from "../model/Games";

export const TranslateView = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [translateTasks, setTranslateTasks] = useState<TranslateTask[] | null>(
    null
  );
  const [number, setNumber] = useState(0);
  const [taskToRemove, setTaskToRemove] = useState(0);
  const [userTranslation, setUserTranslation] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const onNavigationChange = () => {
    if (taskToRemove === 1) {
      translateTasks.splice(number, 1);
      setTaskToRemove(0);
      if (number === translateTasks.length) {
        setNumber(0);
      }
    } else {
      if (number + 1 > translateTasks.length - 1) {
        setNumber(0);
      } else {
        setNumber(number + 1);
      }
    }
    setFeedbackMessage("");
    setCorrectAnswer("");
    setIsSubmitted(false);
    if (translateTasks.length === 0) {
      navigation.replace(ApplicationRoute.ENDGAME);
    }
  };

  const handleSubmit = () => {
    const answer = translateTasks[number].answer.toLowerCase().trim();
    const userAnswer = userTranslation.toLowerCase().trim();
    let isCorrectAnswer = false;

    if (userAnswer === answer) {
      isCorrectAnswer = true;
      setStreak(streak + 1);
      setTaskToRemove(1);
      setFeedbackMessage("Correct answer!");
      setFeedbackColor("green");
      setCorrectAnswer("");
      UserService.addTaskToUserStats(user.user.uid, translateTasks[number].id);
    } else {
      setFeedbackMessage("Unfortunately, that's the wrong answer.");
      setFeedbackColor("red");
      setCorrectAnswer(answer);
      setStreak(0);
    }
    setUserTranslation("");
    Keyboard.dismiss();
    setIsSubmitted(true);

    const newScore = GameScoreHelper.calculatePointsForAnswer(isCorrectAnswer, score, streak + 1);
    setScore(newScore);
    GameScoreHelper.updateUserPoints(user.user.uid, newScore, Games.TRANSLATE);
  };

  useEffect(() => {
    const fetchQuizTasks = async () => {
      const tasks = await UserService.getUserTranslateTask(user.user.uid);
      setTranslateTasks(tasks);
    };

    fetchQuizTasks();
  }, []);

  if (translateTasks === null) {
    return <Text>Loading...</Text>;
  }

  if (translateTasks.length < 1) {
    return <EndOfGameView />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ViewContainer>
          <View style={styles.quizContainer}>
            <GameNavbarComponent
              title="Translate"
              description="Translate from polish to english"
            />
            <View style={styles.quiz}>
              <View style={styles.quizQuestion}>
                <Text
                  style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 20 }}
                >
                  {translateTasks[number].phraseology}
                </Text>
              </View>
              <Text style={styles.inputLabel}>
                Enter your translation below:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your translation"
                value={userTranslation}
                onChangeText={setUserTranslation}
                multiline={true}
              />
              {!isSubmitted && (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.navigationButton}
                onPress={() => onNavigationChange()}
              >
                <Text style={styles.navigationButtonText}>Next question</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: feedbackColor,
                  fontSize: 19,
                  marginVertical: 10,
                }}
              >
                {feedbackMessage}
              </Text>
              {correctAnswer && (
                <Text style={{ color: "green", fontSize: 19 }}>
                  Correct answer: {correctAnswer}
                </Text>
              )}
            </View>
          </View>
          <ApplicationBottomBar props={{ navigation }} />
        </ViewContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  inputLabel: {
    width: "100%",
    fontSize: 16,
    color: DEFAULT_COLORS.primaryGray,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 60,
    padding: 10,
    borderColor: DEFAULT_COLORS.primaryGray,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: DEFAULT_COLORS.primaryWhite,
    textAlignVertical: "top",
  },
  submitButton: {
    width: "50%",
    backgroundColor: DEFAULT_COLORS.primaryBlue,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  submitButtonText: {
    fontSize: 20,
    color: DEFAULT_COLORS.primaryWhite,
  },
  navigationButton: {
    width: "50%",
    backgroundColor: DEFAULT_COLORS.primaryPink,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 2,
    marginBottom: 20,
    padding: 10,
  },
  navigationButtonText: {
    fontSize: 20,
    color: DEFAULT_COLORS.primaryGray,
  },
});
