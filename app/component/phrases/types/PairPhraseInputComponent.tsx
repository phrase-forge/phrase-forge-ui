import { View } from "react-native";
import { CreatePhraseInputProps } from "../../../model/Tasks";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";

export const PairPhraseInputComponent = ({ input, setInput, setValid }: CreatePhraseInputProps) => {
    const [pair11, setPair11] = useState<string>();
    const [pair12, setPair12] = useState<string>();
    const [pair21, setPair21] = useState<string>();
    const [pair22, setPair22] = useState<string>();
    const [pair31, setPair31] = useState<string>();
    const [pair32, setPair32] = useState<string>();

    useEffect(() => {
        if (!setValid) return;
        const pairs = [pair11, pair12, pair21, pair22, pair31, pair32];
        const isEveryPairSet = pairs.filter(p => !p).length === 0;
        if (isEveryPairSet) {
            setValid(true);
            setInput({
                ...input,
                pair1: [pairs[0], pairs[1]],
                pair2: [pairs[2], pairs[3]],
                pair3: [pairs[4], pairs[5]],
            });
        } else {
            setValid(false);
        }

    }, [pair11, pair12, pair21, pair22, pair31, pair32]);

    return (
        <View style={{ gap: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput value={pair11} onChangeText={setPair11} mode="outlined"
                           style={styles.pairInput} placeholder={'Pair 1'}/>
                <TextInput value={pair12} onChangeText={setPair12} mode="outlined"
                           style={styles.pairInput} placeholder={'Pair 1'}/>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput value={pair21} onChangeText={setPair21} mode="outlined"
                           style={styles.pairInput} placeholder={'Pair 2'}/>
                <TextInput value={pair22} onChangeText={setPair22} mode="outlined"
                           style={styles.pairInput} placeholder={'Pair 2'}/>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput value={pair31} onChangeText={setPair31} mode="outlined"
                           style={styles.pairInput} placeholder={'Pair 3'}/>
                <TextInput value={pair32} onChangeText={setPair32} mode="outlined"
                           style={styles.pairInput} placeholder={'Pair 3'}/>
            </View>
        </View>
    );
};

const styles = {
    pairLabel: {
        textAlign: "center",
        fontSize: 20
    },
    pairInput: {
        width: 150,
        minHeight: 100
    }
};