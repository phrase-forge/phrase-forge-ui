import React, { useEffect, useState } from "react";
import { CreatePhraseInputProps } from "../../../model/Tasks";
import { SimplePhraseInputComponent } from "./SimplePhraseInputComponent";

export const TranslatePhraseInputComponent = ({ input, setInput, setValid }: CreatePhraseInputProps) => {
    const [translateInput, setTranslateInput] = useState({ phrase: null, translatedPhrase: null });

    useEffect(() => {
        if (!setValid) return;

        if (translateInput.phrase && translateInput.translatedPhrase) {
            setValid(true);
            setInput({ ...input, answer: translateInput.translatedPhrase, phraseology: translateInput.phrase });
        } else {
            setValid(false);
        }
    }, [translateInput]);

    return (
        <SimplePhraseInputComponent phrase={translateInput} setTranslateInput={setTranslateInput}/>
    );
};