import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropdownSelect = {
    label: string;
    value: string;
}

type DropdownProps = {
    value: string;
    label: string;
    values: DropdownSelect[];
    setValue: (val: string) => void;
    disabled?: boolean;

}

export const DropdownComponent = ({ value, label, values, setValue }: DropdownProps) => {
    return (
        <View style={{ gap: 5 }}>
            <Text>{label}</Text>
            <Dropdown
                style={{ borderColor: 'black', borderWidth: 1, padding: 10, borderRadius: 10 }}
                data={values}
                labelField="label"
                valueField="value"
                value={value}
                onChange={item => setValue(item.value)}
            />
        </View>
    );
};