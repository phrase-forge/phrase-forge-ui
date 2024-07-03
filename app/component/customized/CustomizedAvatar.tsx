import { Image, StyleSheet, View } from "react-native";
import React from "react";

export const CustomizedAvatar = ({size = 'medium'}) => {
    return <View>
        <Image style={ size === 'medium' ? styles.imageMedium: styles.imageSmall} source={require('../../../assets/user.png')}></Image>
    </View>
}

const styles = StyleSheet.create({
   imageMedium: {
       width: 75,
       height: 75,
       marginVertical: 8
   },
    imageSmall: {
        width: 50,
        height: 50,
        marginVertical: 8
    }
});