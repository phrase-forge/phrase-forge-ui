import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const images = {
  sleepMan: require("../../assets/sleepMan.png"),
  angryBoy: require("../../assets/angryBoy.png"),
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
