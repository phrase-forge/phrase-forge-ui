import { Games } from "../model/Games";
import { UserService } from "../services/UserService";

export class GameScoreHelper {
    static calculatePointsForAnswer(
        isCorrectAnswer: boolean,
        currentPoints: number,
        streak: number,
        baseIncrement: number = 10,
        streakMultiplier: number = 2
    ): number {
        let increment = baseIncrement;

        if (isCorrectAnswer) {
            increment = baseIncrement + streak * streakMultiplier;
            return currentPoints + increment;
        }
        return currentPoints;
    }

    static updateUserPoints(userId: string, newScore: number, gameKey: Games): void {
        UserService.updateUserScore(userId, newScore, gameKey);
    }
}