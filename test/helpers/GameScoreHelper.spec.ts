import { GameScoreHelper } from "../../app/helpers/GameScoreHelper";
import { UserService } from "../../app/services/UserService";
import { Games } from "../../app/model/Games";

jest.mock('../../app/services/UserService', () => {
    return { UserService: jest.fn() }
})

describe('GameScoreHelperTest', () => {
    describe('when calculating points for answer', () => {
        describe('when answer is correct', () => {
            it('should increment current points', () => {
                const currentPoints = 10;
                const test1 = GameScoreHelper.calculatePointsForAnswer(true, currentPoints, 0);
                const test2 = GameScoreHelper.calculatePointsForAnswer(true, currentPoints, 1);
                const test3 = GameScoreHelper.calculatePointsForAnswer(true, currentPoints, 2);

                expect(test1).toBe(currentPoints + 10);
                expect(test2).toBe(currentPoints + 12);
                expect(test3).toBe(currentPoints + 14);
            });
        });

        describe('when answer is incorrect', () => {
            it('should return current points', () => {
                const currentPoints = 10;
                const test1 = GameScoreHelper.calculatePointsForAnswer(false, currentPoints, 0);
                const test2 = GameScoreHelper.calculatePointsForAnswer(false, currentPoints, 1);
                const test3 = GameScoreHelper.calculatePointsForAnswer(false, currentPoints, 2);

                expect(test1).toBe(currentPoints);
                expect(test2).toBe(currentPoints);
                expect(test3).toBe(currentPoints);
            });
        });
    });

    describe('when updating user points', () => {
        beforeAll(() => {
            UserService.updateUserScore = jest.fn();
        });

        it('should service method be called exactly once', () => {
            GameScoreHelper.updateUserPoints('randomId', 0, Games.QUIZ);
            expect(UserService.updateUserScore).toHaveBeenCalledWith('randomId', 0, Games.QUIZ);
        });
    });
});