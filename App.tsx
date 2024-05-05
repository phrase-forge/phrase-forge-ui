import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './components/LogiIn';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Log In</Text>
      <LogIn></LogIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8B8D2',

  },
  text: {
    height: '20%',
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: '20%',
    paddingHorizontal: '8%',
  },
});
