import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const GamesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Games</Text>
      <View style={styles.profileContainer}>
        <Image 
          source={require('../assets/avatar.png') } 
          style={styles.profileImage} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pictures</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pairs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Gaps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sequence</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default GamesScreen;
