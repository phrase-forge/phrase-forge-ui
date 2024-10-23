import { useState, useEffect, useContext } from "react";
import { UserContext } from "../services/UserContext";
import { UserService } from "../services/UserService";

export const useFetchUserStats = () => {
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const userId = user.user.uid;
                const userStats = await UserService.getUserStatistics(userId);
                setUser(prevUser => ({
                    ...prevUser,
                    stats: userStats
                }));
                setIsLoading(false);
            } catch (e) {
                console.error(e);
                setIsLoading(false);
            }
        };

        fetchUserStats();
    }, [user?.user.uid, setUser]);

    return { isLoading, userStats: user.stats };
};
