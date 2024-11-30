/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ViewContainer } from "../component/ViewContainer";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import { GameNavbarComponent } from "../component/GameNavbarComponent";
import { DEFAULT_COLORS } from "../styles/Colors";
import { UserService } from "../services/UserService";
import { UserContext } from "../services/UserContext";
import { PairsTask } from "../model/ApplicationUser";
import EndOfGameView from "./EndOfGameView";
import { ApplicationRoute } from "../model/Routing";
import {shuffleArray} from "../utils/shuffleArray";
import { GameScoreHelper } from "../helpers/GameScoreHelper";
import { Games } from "../model/Games";
import { updateUserAchievements } from "../services/AchievementsService";

export const PairsView = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [pairsTasks, setPairsTasks] = useState<PairsTask[] | null>(null);
  const [number, setNumber] = useState<number>(0);
  const [taskToRemove, setTaskToRemove] = useState<number>(0);
  const [combinedArray, setCombinedArray] = useState<unknown[]>([]);
  const [selectedFirstColumnOption, setSelectedFirstColumnOption] = useState<
    number | null
  >(null);
  const [optionColors, setOptionColors] = useState(
    Array.from({ length: 6 }, (_, index) =>
      index % 2 === 0 ? DEFAULT_COLORS.primaryBlue : DEFAULT_COLORS.primaryPink
    )
  );
  const [completionMessage, setCompletionMessage] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean>(false);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] =
    useState<number>(0);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchQuizTasks = async () => {
      const tasks = await UserService.getUserPairsTask(user.user.uid);
      setPairsTasks(tasks);
      shuffleOptions(tasks);
    };

    fetchQuizTasks();
    setStartTime(new Date().getTime());
  }, []);

  const shuffleOptions = (tasks: PairsTask[]) => {
    if (!tasks[number]) return;

    const firstColumn = [
      [tasks[number].pair1[0], 0],
      [tasks[number].pair2[0], 1],
      [tasks[number].pair3[0], 2],
    ];
    const secondColumn = [
      [tasks[number].pair1[1], 0],
      [tasks[number].pair2[1], 1],
      [tasks[number].pair3[1], 2],
    ];
    const shuffledFirstColumn = shuffleArray(firstColumn);
    const shuffledSecondColumn = shuffleArray(secondColumn);
    const combinedArrayLength =
      shuffledFirstColumn.length + shuffledSecondColumn.length;
    const combinedArray: unknown[] = [];

    for (let i = 0; i < combinedArrayLength; i++) {
      if (i % 2 === 0 && shuffledFirstColumn.length) {
        combinedArray.push(shuffledFirstColumn.shift());
      } else if (shuffledSecondColumn.length) {
        combinedArray.push(shuffledSecondColumn.shift());
      }
    }

    setCombinedArray(combinedArray);
  };

  const showAllCorrectAnswers = () => {
    setCompletionMessage("You've successfully completed this task.");
    setShowCorrectAnswers(true);
  };

  const onNavigationChange = async () => {
    setOptionColors(
      Array.from({ length: 6 }, (_, index) =>
        index % 2 === 0
          ? DEFAULT_COLORS.primaryBlue
          : DEFAULT_COLORS.primaryPink
      )
    );
    setNumberOfCorrectAnswers(0);
    setCompletionMessage(null);
    setErrorMessage(null);
    setShowCorrectAnswers(false);
    setMatchedPairs(new Set());

    if (taskToRemove === 1) {
      pairsTasks.splice(number, 1);
      setTaskToRemove(0);
      if (number === pairsTasks.length) {
        setNumber(0);
      }
    } else {
      if (number + 1 > pairsTasks.length - 1) {
        setNumber(0);
      } else {
        setNumber(number + 1);
      }
    }

    setSelectedFirstColumnOption(null);
    if (pairsTasks.length === 0) {
      await UserService.updateGameTimeStats(user.user.uid, new Date(startTime), new Date());
      await updateUserAchievements(user.user.uid);
      navigation.replace(ApplicationRoute.ENDGAME);
    } else {
      shuffleOptions(pairsTasks);
    }
  };

  const handleOptionPress = (index: number) => {
    setPressedIndex(index);
    setErrorMessage(null);
    let isCorrectAnswer = false;
    const newColors = [...optionColors];
    if (index % 2 === 0) {
      setSelectedFirstColumnOption(index);
    } else if (selectedFirstColumnOption !== null) {
      const pushed1 = combinedArray[selectedFirstColumnOption][1];
      if (pushed1 === combinedArray[index][1]) {
        isCorrectAnswer = true;
        setStreak(streak + 1);
        newColors[index] = DEFAULT_COLORS.primaryGray;
        newColors[selectedFirstColumnOption] = DEFAULT_COLORS.primaryGray;
        setOptionColors(newColors);
        setNumberOfCorrectAnswers((prev) => prev + 1);
        setMatchedPairs((prev) => new Set(prev).add(pushed1));
        setSelectedFirstColumnOption(null);
        if (numberOfCorrectAnswers + 1 === 3) {
          showAllCorrectAnswers();
          UserService.addTaskToUserStats(user.user.uid, pairsTasks[number].id);
          setTaskToRemove(1);
        }
      } else {
        setErrorMessage("Incorrect pair. Please try again.");
        setSelectedFirstColumnOption(null);
        setStreak(0);
      }
    }
    const newScore = GameScoreHelper.calculatePointsForAnswer(isCorrectAnswer, score, streak + 1);
    setScore(newScore);
    GameScoreHelper.updateUserPoints(user.user.uid, newScore, Games.PAIRS);
    
    setTimeout(() => setPressedIndex(null), 200);
  };

  if (pairsTasks === null) {
    return <Text>Loading...</Text>;
  }

  if (pairsTasks.length < 1) {
    return <EndOfGameView />;
  }

  return (
    <ViewContainer>
      <View style={styles.quizContainer}>
        <GameNavbarComponent
          title="Pairs"
          description="Match the parts of the idioms"
        />
        <View style={styles.quiz}>
          <View style={styles.quizOptions}>
            {combinedArray.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quizOption,
                  {
                    backgroundColor: optionColors[index],
                    shadowColor:
                      pressedIndex === index ? "#000" : "transparent",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: pressedIndex === index ? 0.3 : 0,
                    shadowRadius: 4,
                    elevation: pressedIndex === index ? 5 : 0,
                  },
                ]}
                onPress={() => handleOptionPress(index)}
                disabled={matchedPairs.has(option[1])}
                activeOpacity={0.7}
              >
                <Text style={styles.quizOptionText}>{option[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {completionMessage && (
            <Text style={styles.completionMessage}>{completionMessage}</Text>
          )}
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={onNavigationChange}
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
  quizOptions: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quizOption: {
    width: "48%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 20,
    borderWidth: 0,
    borderColor: "transparent",
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
    marginTop: 20,
    padding: 10,
  },
  navigationButtonText: {
    fontSize: 20,
    color: DEFAULT_COLORS.primaryGray,
  },
  completionMessage: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 18,
    color: "red",
    marginBottom: 10,
  },
});
