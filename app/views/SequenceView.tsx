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

export const SequenceView = ({navigation}) => {

    const {user} = useContext(UserContext);
    const [sequenceTasks, setSequenceTasks] = useState<SequenceTask[] | null>(null);
    const [sequenceTasksCorrectOrder, setSequenceTasksCorrectOrder] = useState<SequenceTask[] | null>(null);
    const [number, setNumber] = useState(0);
    const [correctAnswerChosenNumber, setCorrectAnswerChosenNumber] = useState(0);
    const [canClick, setCanClick] = useState(true);
    const [buttonColors, setButtonColors] = useState(null);
    const [disabledButtons, setDisabledButtons] = useState(null);
    const [hasError, setHasError] = useState(false);

    const onNavigationChange = () => {
        setHasError(false);
        setCorrectAnswerChosenNumber(0)
        if (sequenceTasks && number == sequenceTasks.length - 1) {
            navigation.replace(ApplicationRoute.ENDGAME);
        } else {
            setNumber(number + 1);
            setButtonColors(Array(sequenceTasks[number + 1].words.length).fill(DEFAULT_COLORS.primaryBlue));
            setDisabledButtons(Array(sequenceTasks[number + 1].words.length).fill(false));
            setCanClick(true);
        }
    };

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffleAnswersInQuestions = (sequenceTasks) => {
        sequenceTasks.forEach(sequenceTask => {
            sequenceTask.words = shuffleArray(sequenceTask.words);
        });
    };

    const handleOptionPress = (index) => {
        if (canClick === true) {
            const newColors = [...buttonColors];
            const newDisabledButtons = [...disabledButtons];
            if (sequenceTasks[number].words[index] === sequenceTasksCorrectOrder[number].words[correctAnswerChosenNumber]) {
                newColors[index] = 'green';
                newDisabledButtons[index] = true;
            } else {
                newColors[index] = "red";
                setCanClick(false);
                setHasError(true);
            }
            setButtonColors(newColors);
            setDisabledButtons(newDisabledButtons);
            setCorrectAnswerChosenNumber(correctAnswerChosenNumber + 1);
        }
    }

    useEffect(() => {
        const fetchSequenceTasks = async () => {
            const tasks = await UserService.getUserSequenceTask(user.user.uid);
            setSequenceTasksCorrectOrder(JSON.parse(JSON.stringify(tasks)));
            shuffleAnswersInQuestions(tasks)
            setButtonColors(Array(tasks[0].words.length).fill(DEFAULT_COLORS.primaryBlue));
            setDisabledButtons(Array(tasks[0].words.length).fill(false));
            setSequenceTasks(tasks);
        };

        fetchSequenceTasks();
    }, []);

    return (
        <ViewContainer>
            <View style={styles.quizContainer}>
                <GameNavbarComponent
                    title="Sequence"
                    description="Choose words in a proper order."
                />

                <ScrollView style={styles.scrollView}>
                    <View style={styles.quiz}>
                        {sequenceTasks && sequenceTasks.length > 0 ? (
                            sequenceTasks[number] && sequenceTasks[number].words.length > 0 ? (
                                <>
                                    <Text style={styles.meaningText}>
                                        {sequenceTasks[number].meaning}
                                    </Text>

                                    {sequenceTasks[number].words.map((word, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.quizOption, {backgroundColor: buttonColors[index]}]}
                                            onPress={() => !disabledButtons[index] && handleOptionPress(index)}
                                        >
                                            <Text style={styles.quizOptionText}>{word}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </>
                            ) : (
                                <Text>No more tasks available</Text>
                            )
                        ) : (
                            <Text>Loading tasks...</Text>
                        )}

                        {hasError && (
                            <Text style={styles.meaningText}>
                                Niestety, poprawna kolejność to: {sequenceTasksCorrectOrder[number].words.join(' ')}.
                            </Text>
                        )}
                        <TouchableOpacity style={styles.navigationButton} onPress={() => onNavigationChange()}>
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