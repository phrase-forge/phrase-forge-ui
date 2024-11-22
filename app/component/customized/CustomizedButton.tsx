import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { LoadingContext } from "../../services/LoadingContext";

interface CustomizedContainedButtonProps {
    title: string;
    handleClick: () => void;
    disabled?: boolean;
}

const styles = StyleSheet.create({
   button: {
       marginVertical: 16,
       height: 50,
       justifyContent: 'center'
   }
});

export const CustomizedButton = ({ title, handleClick, disabled }: CustomizedContainedButtonProps) => {
    const { loading } = useContext(LoadingContext);

    return (
        <Button
            loading={loading}
            disabled={disabled || loading}
            style={styles.button}
            textColor="#FFF"
            mode="contained"
            onPress={handleClick}>
            {title}
        </Button>
    );
};