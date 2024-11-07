import { RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import React from "react";
import { View } from "react-native";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";

export const PhrasesView = ({ navigation }: RouterProps) => {
    return (
        <View style={{flex: 1}}>
            <HomeNavbarComponent title={`Phrases`} description={"Add your own idioms to dictionary"}/>
            <ApplicationBottomBar props={{ navigation, }}/>
        </View>
    )
}