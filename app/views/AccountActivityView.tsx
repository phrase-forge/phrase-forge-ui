import { CustomizedCard } from "../component/customized/CustomizedCard";
import { ActivityHistoryList } from "../component/account/ActivityHistoryList";
import React, { useContext } from "react";
import { UserContext } from "../services/UserContext";

export const AccountActivityView = () => {
    const { user } = useContext(UserContext);

    return (<CustomizedCard>
        <ActivityHistoryList activityList={user?.stats?.achievements}></ActivityHistoryList>
    </CustomizedCard>);
};