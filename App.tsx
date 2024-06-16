import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Game from './components/Game';
import React from 'react';
import Category from './components/Category';
import QuizGame from './components/QuizGame';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QuizGame">
        <Stack.Screen  options={{ headerShown: false }} name = "LogIn" component={LogIn}/>
        <Stack.Screen  options={{ headerShown: false }} name = "SignUp" component={SignUp}/>
        <Stack.Screen  options={{ headerShown: false }} name = "Game" component={Game}/>
        <Stack.Screen  options={{ headerShown: false }} name = "Category" component={Category}/>
        <Stack.Screen  options={{ headerShown: false }} name = "QuizGame" component={QuizGame}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


