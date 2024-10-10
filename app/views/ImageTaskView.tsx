import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const images = {
  sleepMan: require("../../assets/sleepMan.png"),
  angryBoy: require("../../assets/angryBoy.png"),
  energy: require("../../assets/energy.png"),
  rest: require("../../assets/rest.png"),
  healthy: require("../../assets/healthy.png"),
  pain: require("../../assets/pain.png"),
  sleep: require("../../assets/sleep.png"),
  gym: require("../../assets/gym.png"),
  inBed: require("../../assets/inBed.png"),
  sickDay: require("../../assets/sickDay.png"),
  sweat: require("../../assets/sweat.png"),
  underTheWeather: require("../../assets/underTheWeather.png"),
  getBack: require("../../assets/getBack.png"),
  kickTheBucket: require("../../assets/kickTheBucket.png"),
  knockDeath: require("../../assets/knockDeath.png"),
  underKnife: require("../../assets/underKnife.png"),

};

const ImageTaskView = ({ photo }) => {
  const imageSource = images[photo]; 

  return (
    <View style={styles.container}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} />
      ) : (
        <Text>Image not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 180,
    height: 120,
  },
});

export default ImageTaskView;
