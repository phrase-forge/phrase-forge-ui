import { Text, View } from "react-native";
import { CustomizedTextInput } from "../../customized/CustomizedTextInput";
import React, { useEffect, useState } from "react";
import { DropdownComponent } from "../DropdownComponent";
import { TextInput } from "react-native-paper";
import { CreatePhraseInputProps } from "../../../model/Tasks";
import { DEFAULT_COLORS } from "../../../styles/Colors";

export const QuizPhraseInputComponent = ({ input, setInput, setValid }: CreatePhraseInputProps) => {
    const [phraseology, setPhraseology] = useState<string>();

    const [answer1, setAnswer1] = useState<string>();
    const [answer2, setAnswer2] = useState<string>();
    const [answer3, setAnswer3] = useState<string>();
    const [answer4, setAnswer4] = useState<string>();

    const [correctAnswer, setCorrectAnswer] = useState<string>();
    const answers = [
        { label: 'Answer 1', value: '0' },
        { label: 'Answer 2', value: '1' },
        { label: 'Answer 3', value: '2' },
        { label: 'Answer 4', value: '3' },
    ];

    useEffect(() => {
        if (!setValid) return;

        const values = [phraseology, answer1, answer2, answer3, answer4, correctAnswer];
        const isEveryPairSet = values.filter(p => !p).length === 0;

        if (isEveryPairSet) {
            setValid(true);
            setInput({
                ...input,
                phraseology,
                answers: [answer1, answer2, answer3, answer4, Number(correctAnswer)]
            });
        } else {
            setValid(false);
        }

    }, [phraseology, answer1, answer2, answer3, answer4, correctAnswer]);

    return (
        <View style={{ gap: 20 }}>
            <CustomizedTextInput
                value={phraseology}
                valueSetter={setPhraseology}
                placeholder={'Phraseology'}
                description={'Your phrase'}
            />

            <DropdownComponent
                label={'Select correct answer'}
                value={correctAnswer}
                values={answers}
                setValue={setCorrectAnswer}
            />

            <Text style={styles.answersLabel}>Answers</Text>
            <View style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextInput value={answer1} onChangeText={setAnswer1} mode="outlined"
                           style={styles.answerInput} placeholder={'Answer 1'}/>
                <TextInput value={answer2} onChangeText={setAnswer2} mode="outlined"
                           style={styles.answerInput} placeholder={'Answer 2'}/>
                <TextInput value={answer3} onChangeText={setAnswer3} mode="outlined"
                           style={styles.answerInput} placeholder={'Answer 3'}/>
                <TextInput value={answer4} onChangeText={setAnswer4} mode="outlined"
                           style={styles.answerInput} placeholder={'Answer 4'}/>
            </View>
        </View>
    );
};

const styles = {
    answersLabel: {
        color: DEFAULT_COLORS.primaryGray,
    },
    answersContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    answerLabel: {
        textAlign: "center",
        fontSize: 20
    },
    answerInput: {
        width: 150,
        minHeight: 100
    }
};