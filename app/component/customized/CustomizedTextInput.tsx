import { TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { DEFAULT_COLORS } from "../../styles/Colors";

interface CustomizedTextInputProps {
    value: string;
    valueSetter: (val: string) => void;
    description?: string;
    placeholder?: string;
    passwordInput?: boolean;
}

const styles = StyleSheet.create({
   inputLabel: {
       color: DEFAULT_COLORS.primaryGray,
       marginBottom: 8
   }
});

export const CustomizedTextInput = ({ value, valueSetter, description, placeholder, passwordInput }: CustomizedTextInputProps) => {
    return (<View>
        <Text style={styles.inputLabel}>{description}</Text>
        <TextInput
            outlineStyle={{borderRadius: 16}}
            textColor={DEFAULT_COLORS.primaryDark}
            outlineColor={DEFAULT_COLORS.secondaryGray}
            theme={{ colors: { onSurfaceVariant: DEFAULT_COLORS.primaryGray} }}
            value={value}
            placeholder={placeholder || ''}
            mode='outlined'
            onChangeText={(newValue) => valueSetter(newValue)}
            secureTextEntry={passwordInput}
        />
    </View>)
}