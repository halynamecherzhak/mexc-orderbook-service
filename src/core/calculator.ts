export function calculateMid(bestBid: number, bestAsk: number): number {
    return (bestBid + bestAsk) / 2;
}

export function calculateSpreadPercent(bestBid: number, bestAsk: number): number {
    const mid = calculateMid(bestBid, bestAsk);
    return ((bestAsk - bestBid) / mid) * 100;
}

export class MovingAverage {
    private values: number[] = [];
    constructor(private readonly maxSize: number) {}

    add(value: number): void {
        this.values.push(value);
        if (this.values.length > this.maxSize) {
            this.values.shift();
        }
    }

    average(): number {
        if (!this.values.length) return 0;
        return this.values.reduce((sum, v) => sum + v, 0) / this.values.length;
    }
}
