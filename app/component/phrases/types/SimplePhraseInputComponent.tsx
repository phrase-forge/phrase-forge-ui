import React from "react";
import { View } from "react-native";
import { CustomizedTextInput } from "../../customized/CustomizedTextInput";
import { TranslatedPhrase } from "../../../model/Tasks";

type SimplePhraseInputProps = {
    phrase: TranslatedPhrase;
    setTranslateInput: (o: TranslatedPhrase) => void;
}

export const SimplePhraseInputComponent = ({ phrase, setTranslateInput }: SimplePhraseInputProps) => {
    return (
        <View style={{ gap: 20 }}>
            <CustomizedTextInput
                value={phrase.phrase}
                valueSetter={(val) => setTranslateInput({ ...phrase, phrase: val })}
                placeholder={'Phraseology'}
                description={'Your phrase'}
            />

            <CustomizedTextInput
                value={phrase.translatedPhrase}
                valueSetter={(val) => setTranslateInput({ ...phrase, translatedPhrase: val })}
                placeholder={'Translation'}
                description={'Your translated phrase'}
            />
        </View>
    );
};