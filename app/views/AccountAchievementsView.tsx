import { CustomizedCard } from "../component/customized/CustomizedCard";
import { AchievementsList } from "../component/account/AchievementsList";
import React, { useContext } from "react";
import { UserContext } from "../services/UserContext";

export const AccountAchievementsView = () => {
    const { user } = useContext(UserContext);
    
    return (<CustomizedCard>
        <AchievementsList earnedAchievements={user?.stats?.achievements}></AchievementsList>
    </CustomizedCard>);
};