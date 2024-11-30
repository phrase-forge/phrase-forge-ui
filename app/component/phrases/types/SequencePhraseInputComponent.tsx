import { CreatePhraseInputProps } from "../../../model/Tasks";
import React, { useEffect, useState } from "react";
import { SimplePhraseInputComponent } from "./SimplePhraseInputComponent";

export const SequencePhraseInputComponent = ({ input, setInput, setValid }: CreatePhraseInputProps) => {
    const [translateInput, setTranslateInput] = useState({ phrase: null, translatedPhrase: null });

    useEffect(() => {
        if (!setValid) return;

        if (translateInput.phrase && translateInput.translatedPhrase) {
            setValid(true);
            const words = translateInput.phrase.split(' ').filter((t: string) => !!t);
            setInput({ ...input, words, meaning: translateInput.translatedPhrase });
        } else {
            setValid(false);
        }
    }, [translateInput]);

    return (
        <SimplePhraseInputComponent phrase={translateInput} setTranslateInput={setTranslateInput}/>
    );
};