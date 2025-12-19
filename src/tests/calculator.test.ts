import { calculateMid, calculateSpreadPercent, MovingAverage } from '../core/calculator';

describe('Calculator', () => {
    describe('calculateMid', () => {
        test('calculate mid price between bid and ask', () => {
            expect(calculateMid(100, 102)).toBe(101);
        });

        test('calculate mid price with equal bid and ask', () => {
            expect(calculateMid(100, 100)).toBe(100);
        });

        test('calculate mid price with decimal values', () => {
            expect(calculateMid(49999.5, 50000.5)).toBe(50000);
        });
    });

    describe('calculateSpreadPercent', () => {
        test('calculate spread percent', () => {
            const spread = calculateSpreadPercent(100, 102);
            expect(spread).toBeCloseTo(1.98, 2);
        });

        test('calculate zero spread when bid equals ask', () => {
            expect(calculateSpreadPercent(100, 100)).toBe(0);
        });

        test('calculate spread with large bid-ask difference', () => {
            const spread = calculateSpreadPercent(1000, 1100);
            expect(spread).toBeCloseTo(9.52, 1);
        });
    });

    describe('MovingAverage', () => {
        test('calculate average of three values', () => {
            const avg = new MovingAverage(3);
            avg.add(1);
            avg.add(2);
            avg.add(3);
            expect(avg.average()).toBe(2);
        });

        test('moving average respects max size and removes oldest value', () => {
            const avg = new MovingAverage(3);
            avg.add(1);
            avg.add(2);
            avg.add(3);
            avg.add(4); // Should remove 1
            expect(avg.average()).toBeCloseTo(3, 1); // (2 + 3 + 4) / 3 = 3
        });

        test('moving average with single value', () => {
            const avg = new MovingAverage(5);
            avg.add(42);
            expect(avg.average()).toBe(42);
        });

        test('moving average with no values returns 0', () => {
            const avg = new MovingAverage(5);
            expect(avg.average()).toBe(0);
        });

        test('moving average with spread values', () => {
            const avg = new MovingAverage(4);
            avg.add(1.5);
            avg.add(2.3);
            avg.add(1.8);
            avg.add(2.4);
            expect(avg.average()).toBeCloseTo(2.0, 1);
        });
    });
});
