import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ViewContainer } from "../component/ViewContainer";
import { RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";

export const QuizView = ({ navigation }: RouterProps) => {
    return <ViewContainer>
        <View style={styles.quizContainer}>
            <Text style={styles.quizTitle}>Quiz</Text>
            <Text style={styles.quizSubtitle}>Select the correct answer</Text>
            <View style={styles.quizQuestion}>
                <Text>Question</Text>
            </View>
            <View style={styles.quizOptions}>
                <TouchableOpacity style={styles.quizOption}>
                    <Text style={styles.quizOptionText}>Answer 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quizOption}>
                    <Text style={styles.quizOptionText}>Answer 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quizOption}>
                    <Text style={styles.quizOptionText}>Answer 3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quizOption}>
                    <Text style={styles.quizOptionText}>Answer 4</Text>
                </TouchableOpacity>
            </View>
        </View>
        <ApplicationBottomBar props={{ navigation, }}/>
    </ViewContainer>;
};

const styles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    quizTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    quizSubtitle: {
        fontSize: 16,
        color: '#8a8a8a',
        marginBottom: 20,
    },
    quizQuestion: {
        width: '80%',
        padding: 16,
        backgroundColor: '#ffe4e1',
        textAlign: 'center',
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    quizOptions: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quizOption: {
        flexBasis: '48%',
        padding: 16,
        backgroundColor: '#87ceeb',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    quizOptionText: {
        fontSize: 16,
        color: 'white',
    }
});
