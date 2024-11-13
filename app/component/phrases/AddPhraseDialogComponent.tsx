import { ScrollView, Text, View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { Games } from "../../model/Games";
import { useContext, useEffect, useState } from "react";
import { Category, Level } from "../../model/ApplicationUser";
import { DropdownComponent } from "./DropdownComponent";
import { QuizPhraseInputComponent } from "./types/QuizPhraseInputComponent";
import StepIndicator from 'react-native-step-indicator';
import { DEFAULT_COLORS } from "../../styles/Colors";
import { TranslatePhraseInputComponent } from "./types/TranslatePhraseInputComponent";
import { UserContext } from "../../services/UserContext";
import { SequencePhraseInputComponent } from "./types/SequencePhraseInputComponent";
import { PairPhraseInputComponent } from "./types/PairPhraseInputComponent";
import { GapsPhraseInputComponent } from "./types/GapsPhraseInputComponent";

type DialogProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onSubmit: (task) => void;
}

const labels = ["Basic properties", "Game properties"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: DEFAULT_COLORS.primaryBlue,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: DEFAULT_COLORS.primaryBlue,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: DEFAULT_COLORS.primaryBlue,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: DEFAULT_COLORS.primaryBlue,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: DEFAULT_COLORS.primaryBlue,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: DEFAULT_COLORS.primaryBlue,
};

export const AddPhraseDialogComponent = ({ visible, setVisible, onSubmit }: DialogProps) => {
    const { user } = useContext(UserContext);

    const hideDialog = () => {
        setVisible(false);
    };

    const maxSteps = 2;

    const onPreviousStep = () => {
        setStep(step - 1);
    };

    const onNextStep = () => {
        setStep(step + 1);
    };

    const toUpperCase = (value: string): string => {
        if (!value) return null;
        return value[0].toUpperCase() + value.slice(1);
    };

    const toDropdownModel = (values: string[]) => {
        return values.map(value => {
            return {
                label: toUpperCase(value),
                value
            };
        });
    };

    const [isPhraseInputValid, setIsPhraseInputValid] = useState(false);

    const gameTypes = toDropdownModel(Object.values(Games).filter((g: string) => g !== 'pictures'));
    const [selectedGameType, setSelectedGameType] = useState<string>();

    const categories = toDropdownModel(Object.values(Category));
    const [selectedCategory, setSelectedCategory] = useState<string>();

    const difficulties = toDropdownModel(Object.values(Level));
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>();

    const [phraseInput, setPhraseInput] = useState({});
    const [step, setStep] = useState(0);

    const isSelected = (field: string): boolean => !!field;

    const isFirstStepDisabled = (): boolean => {
        return !(isSelected(selectedGameType) && isSelected(selectedCategory) && isSelected(selectedDifficulty));
    };

    const isDisabled = (): boolean => {
        return !(isPhraseInputValid);
    };

    const onTaskSubmit = () => {
        const taskDoc = {
            ...phraseInput,
            type: selectedGameType,
            difficultyLevel: selectedDifficulty,
            category: selectedCategory,
            userId: user.user.uid
        };

        hideDialog();
        onSubmit(taskDoc);
    };

    const renderGameInputComponent = () => {
        switch (selectedGameType) {
            case 'quiz':
                return <QuizPhraseInputComponent input={phraseInput} setInput={setPhraseInput}
                                                 setValid={setIsPhraseInputValid}/>;
            case 'translate':
                return <TranslatePhraseInputComponent input={phraseInput} setInput={setPhraseInput}
                                                      setValid={setIsPhraseInputValid}/>;
            case 'sequence':
                return <SequencePhraseInputComponent input={phraseInput} setInput={setPhraseInput}
                                                     setValid={setIsPhraseInputValid}/>;
            case 'pairs':
                return <PairPhraseInputComponent input={phraseInput} setInput={setPhraseInput}
                                                 setValid={setIsPhraseInputValid}/>;
            case 'gaps':
                return <GapsPhraseInputComponent input={phraseInput} setInput={setPhraseInput}
                                                 setValid={setIsPhraseInputValid}/>;
        }

        return <></>;
    };

    useEffect(() => {
        if (visible) {
            setSelectedGameType(null);
            setSelectedCategory(null);
            setSelectedDifficulty(null);
            setIsPhraseInputValid(false);
            setStep(0);
        }
    }, [visible]);

    useEffect(() => {
        setPhraseInput({});
    }, [selectedGameType]);

    return (
        <View>
            <Portal>
                <Dialog dismissable={false} style={{ backgroundColor: '#fff' }} visible={visible}>
                    <Dialog.Content style={{ gap: 20 }}>
                        <StepIndicator
                            stepCount={maxSteps}
                            customStyles={customStyles}
                            currentPosition={step}
                            labels={labels}
                        />
                    </Dialog.Content>

                    <Dialog.ScrollArea>
                        <ScrollView style={{ paddingVertical: 40, height: 500 }}>
                            {
                                step == 0 && <View style={{ gap: 20 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 25 }}>Basic phrase properties</Text>

                                    <DropdownComponent
                                        label={'Select game type'}
                                        value={selectedGameType}
                                        values={gameTypes}
                                        setValue={setSelectedGameType}
                                    />

                                    <DropdownComponent
                                        label={'Select item category'}
                                        value={selectedCategory}
                                        values={categories}
                                        setValue={setSelectedCategory}
                                    />

                                    <DropdownComponent
                                        label={'Select item difficulty'}
                                        value={selectedDifficulty}
                                        values={difficulties}
                                        setValue={setSelectedDifficulty}
                                    />
                                </View>
                            }

                            {
                                step == 1 && <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 30 }}>
                                    <Text
                                        style={{ fontWeight: 'bold' }}>{selectedGameType ? toUpperCase(selectedGameType) : 'Game type'}</Text>
                                    <Text> properties</Text>
                                </Text>
                            }
                            {
                                step == 1 && <View style={{ paddingBottom: 200 }}>{renderGameInputComponent()}</View>
                            }
                        </ScrollView>
                    </Dialog.ScrollArea>

                    <Dialog.Actions>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button onPress={hideDialog}>Cancel</Button>
                            <View style={{ flexDirection: 'row' }}>
                                <Button disabled={step == 0} onPress={onPreviousStep}>Previous</Button>
                                {
                                    step == 1
                                        ? <Button disabled={isDisabled()} onPress={onTaskSubmit}>Submit</Button>
                                        : <Button disabled={isFirstStepDisabled()} onPress={onNextStep}>Next</Button>
                                }
                            </View>
                        </View>

                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export interface GapsTask {
    answers: string[];
    phraseology: string;
    gaps: string;
}