import { RouterProps } from "../model/Routing";
import { ApplicationBottomBar } from "../component/navigation/ApplicationBottomBar";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { HomeNavbarComponent } from "../component/HomeNavbarComponent";
import { CustomTaskService } from "../services/CustomTaskService";
import { Task } from "../model/Tasks";
import { UserContext } from "../services/UserContext";
import { AddPhraseDialogComponent } from "../component/phrases/AddPhraseDialogComponent";
import { DEFAULT_COLORS } from "../styles/Colors";
import { PhrasesTableComponent } from "../component/phrases/PhrasesTableComponent";

export const PhrasesView = ({ navigation }: RouterProps) => {
    const [userPhrases, setUserPhrases] = useState<Task[]>([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user } = useContext(UserContext);

    const getUserTasks = () => {
        setLoading(true);
        CustomTaskService.getTasks(user.user.uid).then(response => {
            const responseData: Task[] = [];
            response.forEach(doc => {
                const data = doc.data();
                const item = {
                    phraseology: data.phraseology || data.meaning || '-',
                    type: data.type,
                    category: data.category,
                    difficultyLevel: data.difficultyLevel,
                }
                responseData.push(item);
            });
            setUserPhrases(responseData);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        getUserTasks();
    }, []);

    const onTaskSubmit = (inputTask) => {
        setLoading(true);
        CustomTaskService.saveTask(inputTask)
            .then(() => {
                getUserTasks();
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }

    const openAddPhraseDialog = () => {
        setDialogVisible(true);
    };

    return (
        <View style={{ flex: 1 }}>
            <HomeNavbarComponent title={`Dictionary`} description={"Your own idioms in one place"}/>
            <View style={{padding: 30}}>
                {
                    loading
                        ? <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={80} color={DEFAULT_COLORS.primaryBlue}/>
                        </View>
                        : <View style={{justifyContent: 'space-between'}}>
                            <View>
                                <PhrasesTableComponent items={userPhrases}/>
                            </View>
                            <Button
                                textColor="#FFF"
                                mode="contained"
                                onPress={openAddPhraseDialog}
                            >
                                Add phrase
                            </Button>
                        </View>
                }
                <AddPhraseDialogComponent visible={dialogVisible} setVisible={setDialogVisible}
                                          onSubmit={onTaskSubmit}
                />
            </View>
            <ApplicationBottomBar props={{ navigation, }}/>
        </View>
    );
};
