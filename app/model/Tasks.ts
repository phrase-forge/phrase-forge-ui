export type Task = {
    type: string,
    category: string,
    difficultyLevel: string
}

export type CreatePhraseInputProps = {
    input: any;
    setInput: (o: any) => void;
    setValid: (valid: boolean) => void;
}

export type TranslatedPhrase = {
    phrase: string;
    translatedPhrase: string;
}