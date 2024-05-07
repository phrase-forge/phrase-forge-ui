import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogInBody">
        <Stack.Screen  options={{ headerShown: false }} name = "LogIn" component={LogIn}/>
        <Stack.Screen  options={{ headerShown: false }} name = "SignUp" component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


