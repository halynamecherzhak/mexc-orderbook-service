import { fetchOrderBook } from './api/restClient';
import { connectTicker } from './api/wsClient';
import { calculateMid, calculateSpreadPercent, MovingAverage } from './core/calculator';
import { TRADING_PAIR, MOVING_AVERAGE_SIZE, UPDATE_INTERVAL_MS } from './config/constants';
import { log } from './utils/logger';

const spreadAvg = new MovingAverage(MOVING_AVERAGE_SIZE);

let lastBid = 0;
let lastAsk = 0;

async function updateOrderBook() {
    try {
        const { bestBid, bestAsk } = await fetchOrderBook(TRADING_PAIR);

        lastBid = bestBid;
        lastAsk = bestAsk;

        const mid = calculateMid(bestBid, bestAsk);
        const spread = calculateSpreadPercent(bestBid, bestAsk);

        spreadAvg.add(spread);

        log(`REST mid=${mid.toFixed(2)} spread=${spread.toFixed(2)}%`);
    } catch (err) {
        log(`REST error: ${(err as Error).message}`);
    }
}

connectTicker(TRADING_PAIR, lastPrice => {
    if (!lastBid || !lastAsk) return;

    const mid = calculateMid(lastBid, lastAsk);
    const spread = calculateSpreadPercent(lastBid, lastAsk);

    log(`WS last=${lastPrice.toFixed(2)} mid=${mid.toFixed(2)} spread=${spread.toFixed(2)}%`);
});

setInterval(async () => {
    await updateOrderBook();

    log(`Average spread(1m)=${spreadAvg.average().toFixed(2)}%`);
}, UPDATE_INTERVAL_MS);

updateOrderBook();
