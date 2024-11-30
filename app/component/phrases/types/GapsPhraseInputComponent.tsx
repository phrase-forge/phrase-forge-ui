import { Text, View } from "react-native";
import { CreatePhraseInputProps } from "../../../model/Tasks";
import React, { useEffect, useState } from "react";
import { CustomizedTextInput } from "../../customized/CustomizedTextInput";
import { DropdownComponent } from "../DropdownComponent";
import { HelperText, TextInput } from "react-native-paper";
import { DEFAULT_COLORS } from "../../../styles/Colors";
import { shuffleArray } from "../../../utils/shuffleArray";

export const GapsPhraseInputComponent = ({ input, setInput, setValid }: CreatePhraseInputProps) => {
    const [phraseology, setPhraseology] = useState<string>();
    const [phraseologyMeaning, setPhraseologyMeaning] = useState<string>();

    const [answer1, setAnswer1] = useState<string>();
    const [answer2, setAnswer2] = useState<string>();
    const [answer3, setAnswer3] = useState<string>();
    const [answer4, setAnswer4] = useState<string>();

    const [phraseWords, setPhraseWords] = useState([]);
    const [selectedGappedWord, setSelectedGappedWord] = useState<string>();

    useEffect(() => {
        setSelectedGappedWord('');
        setAnswer1('');
        if (phraseology) {
            const splitPhrase = phraseology.split(' ').filter(x => !!x);
            if (splitPhrase.length > 1) {
                const mappedWords = splitPhrase.map(word => {
                    return { label: word, value: word }
                });
                setPhraseWords(mappedWords);
            } else {
                setPhraseWords([]);
            }
        } else {
            setPhraseWords([]);
        }

    }, [phraseology]);

    useEffect(() => {
        if (selectedGappedWord) {
            setAnswer1(selectedGappedWord);
        }
    }, [selectedGappedWord]);

    useEffect(() => {
        if (!setValid) return;

        const values = [phraseology, phraseologyMeaning, answer1, answer2, answer3, answer4];
        const isEveryPairSet = values.filter(p => !p).length === 0;

        if (isEveryPairSet) {
            setValid(true);
            const gaps = phraseology.replace(selectedGappedWord, '....');
            const answers = shuffleArray([answer1, answer2, answer3, answer4]);
            const correctAnswerIndex = answers.indexOf(answer1);
            setInput({
                ...input,
                gaps,
                phraseology: phraseologyMeaning,
                answers: [...answers, correctAnswerIndex]
            });
        } else {
            setValid(false);
        }

    }, [phraseology, phraseologyMeaning, answer1, answer2, answer3, answer4]);

    return (
        <View style={{ gap: 20, maxHeight: 500 }}>
            <CustomizedTextInput
                value={phraseology}
                valueSetter={setPhraseology}
                placeholder={'Phraseology'}
                description={'Your phrase'}
            />
            <HelperText style={{marginTop: -20, color: DEFAULT_COLORS.primaryGray}} type="info" visible={true}>
                Phrase should have at least two words.
            </HelperText>

            <CustomizedTextInput
                value={phraseologyMeaning}
                valueSetter={setPhraseologyMeaning}
                placeholder={'Phrase meaning'}
                description={'Meaning'}
            />

            <DropdownComponent
                label={'Select word of phrase'}
                value={selectedGappedWord}
                values={phraseWords}
                setValue={setSelectedGappedWord}
            />

            <Text style={styles.answersLabel}>Answers</Text>
            <View style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TextInput disabled={true} value={answer1} onChangeText={setAnswer1} mode="outlined"
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
}

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