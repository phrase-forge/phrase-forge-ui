import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const Category = () => {
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Quiz</Text>
        <View style={styles.profileContainer}>
          <Image 
            source={require('../assets/avatar.png')} 
            style={styles.profileImage} 
          />
        </View>
        <Text style={styles.quizSubtitle}>Select the correct answer</Text>
        <View style={styles.buttonContainer}>
            <View style={styles.quizQuestion}>
                <Text style={styles.quizText}>Question</Text>
            </View>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Answear 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Answear 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Answear 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Answear 4</Text>
            </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    profileImage: {
        width: 70,
        height: 60,
        borderRadius: 20,
    },
    quizSubtitle: {
        fontSize: 23,
        color: '#8a8a8a',
        marginBottom: 20,
    },
    quizText:{
        fontSize:20,
        color: '#fff',
    },
    quizQuestion: {
        width: '98%',
        padding: 16,
        backgroundColor: '#C6A8A8',
        textAlign: 'center',
        borderRadius: 8,
        marginBottom: 40,
        alignItems: 'center',
        },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: '10%',
      },
      button: {
        width: '48%',
        height: '25%',
        padding: 20,
        marginVertical: 10,
        backgroundColor: '#6c99b2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center', 
      },
      buttonText: {
        color: '#fff',
        fontSize: 23,
        fontWeight: 'bold',
      },
});

export default Category;
