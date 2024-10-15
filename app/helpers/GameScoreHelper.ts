import { Games } from "../model/Games";
import { UserService } from "../services/UserService";

export class GameScoreHelper {
    static calculatePointsForAnswer(
        isCorrectAnswer: boolean,
        currentPoints: number,
        increment: number = 10
    ): number {
        if (isCorrectAnswer) {
            return currentPoints + increment;
        }
        return currentPoints;
    }

    static updateUserPoints(userId: string, newScore: number, gameKey: Games): void {
        UserService.updateUserScore(userId, newScore, gameKey);
    }
}