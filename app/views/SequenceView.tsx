/* eslint-disable react/prop-types */
import React, {useContext, useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ViewContainer} from "../component/ViewContainer";
import {ApplicationBottomBar} from "../component/navigation/ApplicationBottomBar";
import {GameNavbarComponent} from "../component/GameNavbarComponent";
import {DEFAULT_COLORS} from "../styles/Colors";
import {UserService} from "../services/UserService";
import {UserContext} from "../services/UserContext";
import {SequenceTask} from "../model/ApplicationUser";
import {ApplicationRoute} from "../model/Routing";
import {shuffleArray} from "../utils/shuffleArray";
import { GameScoreHelper } from "../helpers/GameScoreHelper";
import { Games } from "../model/Games";
import EndOfGameView from "./EndOfGameView";
import { updateUserAchievements } from "../services/AchievementsService";

export const SequenceView = ({navigation}) => {

    const {user} = useContext(UserContext);
    const [sequenceTasks, setSequenceTasks] = useState<SequenceTask[] | null>(null);
    const [sequenceTasksCorrectOrder, setSequenceTasksCorrectOrder] = useState<SequenceTask[] | null>(null);
    const [number, setNumber] = useState(0);
    const [correctAnswerChosenNumber, setCorrectAnswerChosenNumber] = useState(0);
    const [canClick, setCanClick] = useState(true);
    const [buttonColors, setButtonColors] = useState(null);
    const [disabledButtons, setDisabledButtons] = useState(null);
    const [isDisabledNextQuestionButton, setIsDisabledNextQuestionButton] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isEndOfGame, setIsEndOfGame] = useState(false);
    const [score, setScore] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);

    const onNavigationChange = async () => {
        setHasError(false);
        setIsDisabledNextQuestionButton(true)
        setCorrectAnswerChosenNumber(0)
        if (sequenceTasks && number == sequenceTasks.length - 1) {
            await UserService.updateGameTimeStats(user.user.uid, new Date(startTime), new Date());
            await updateUserAchievements(user.user.uid);
            navigation.replace(ApplicationRoute.ENDGAME);
        } else {
            setButtonColors(Array(sequenceTasks[number + 1].words.length).fill(DEFAULT_COLORS.primaryBlue));
            setDisabledButtons(Array(sequenceTasks[number + 1].words.length).fill(false));
            setNumber(number + 1);
            setCanClick(true);
        }
    };

    const shuffleAnswersInQuestions = (sequenceTasks) => {
        sequenceTasks.forEach(sequenceTask => {
            sequenceTask.words = shuffleArray(sequenceTask.words);
        });
    };

    const handleOptionPress = (index) => {
        let isCorrectAnswer = false;

        if (canClick === true) {
            const newColors = [...buttonColors];
            const newDisabledButtons = [...disabledButtons];
            if (sequenceTasks[number].words[index] === sequenceTasksCorrectOrder[number].words[correctAnswerChosenNumber]) {
                newColors[index] = 'green';
                newDisabledButtons[index] = true;
                isCorrectAnswer = true;
                setStreak(streak + 1);
            } else {
                setSequenceTasks([...sequenceTasks, sequenceTasks[number]]);
                setSequenceTasksCorrectOrder([...sequenceTasksCorrectOrder, sequenceTasksCorrectOrder[number]]);
                setIsDisabledNextQuestionButton(false)
                newColors[index] = "red";
                setCanClick(false);
                setHasError(true);
                setStreak(0);
            }
            setButtonColors(newColors);
            setDisabledButtons(newDisabledButtons);
            setCorrectAnswerChosenNumber(correctAnswerChosenNumber + 1);

            if (correctAnswerChosenNumber + 1 == sequenceTasksCorrectOrder[number].words.length) {
                UserService.addTaskToUserStats(user.user.uid, sequenceTasks[number].id);
                setIsDisabledNextQuestionButton(false)
            }

            const newScore = GameScoreHelper.calculatePointsForAnswer(isCorrectAnswer, score, streak + 1);
            setScore(newScore);
            GameScoreHelper.updateUserPoints(user.user.uid, newScore, Games.SEQUENCE);
        }
    }

    useEffect(() => {
        const fetchSequenceTasks = async () => {
            const tasks = await UserService.getUserSequenceTask(user.user.uid);

            if (tasks.length === 0) {
                setIsEndOfGame(true);
                return;
            }

            setSequenceTasksCorrectOrder(JSON.parse(JSON.stringify(tasks)));
            shuffleAnswersInQuestions(tasks)
            setButtonColors(Array(tasks[0].words.length).fill(DEFAULT_COLORS.primaryBlue));
            setDisabledButtons(Array(tasks[0].words.length).fill(false));
            setSequenceTasks(tasks);
        };

        fetchSequenceTasks();
        setStartTime(new Date().getTime());
    }, []);

    if (isEndOfGame) {
        return <EndOfGameView />;
    }

    if (sequenceTasks === null) {
        return <Text>Loading...</Text>;
    }

    if (sequenceTasks.length == 0) {
        return <EndOfGameView />;
    }

    return (
        <ViewContainer>
            <View style={styles.quizContainer}>
                <GameNavbarComponent
                    title="Sequence"
                    description="Choose words in a proper order."
                />

                <ScrollView style={styles.scrollView}>
                    <View style={styles.quiz}>
                        {sequenceTasks && sequenceTasks.length > 0 && sequenceTasks[number] && sequenceTasks[number].words.length > 0 && (
                            <>
                                <View style={styles.quizQuestion}>
                                    <Text style={{ color: DEFAULT_COLORS.primaryGray, fontSize: 20 }}>
                                        {sequenceTasks[number].meaning}
                                    </Text>
                                </View>

                                {sequenceTasks[number].words.map((word, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.quizOption, { backgroundColor: buttonColors[index] }]}
                                        onPress={() => !disabledButtons[index] && handleOptionPress(index)}
                                    >
                                        <Text style={styles.quizOptionText}>{word}</Text>
                                    </TouchableOpacity>
                                ))}
                            </>
                        )}

                        {hasError && (
                            <Text style={styles.meaningText}>
                                Unfortunately, the correct order is:
                            </Text>
                        )}

                        {hasError && (
                            <Text style={[styles.quizQuestion, { color: DEFAULT_COLORS.primaryGray, fontSize: 20 }]}>
                                {sequenceTasksCorrectOrder[number].words.join(' ')}
                            </Text>
                        )}

                        <TouchableOpacity style={styles.navigationButton}
                                          disabled={isDisabledNextQuestionButton}
                                          onPress={() => onNavigationChange()}>
                            <Text style={styles.navigationButtonText}>Next question</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <ApplicationBottomBar props={{navigation}}/>
        </ViewContainer>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginBottom: 50,
    },
    quizContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: DEFAULT_COLORS.primaryWhite,
        marginBottom: 20,
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
    meaningText: {
        fontSize: 18,
        color: '#333',
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center',
        paddingHorizontal: 10,
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
        padding: 8,
        marginHorizontal: "auto",
    },
    navigationButtonText: {
        fontSize: 20,
        color: DEFAULT_COLORS.primaryGray,
    },
});