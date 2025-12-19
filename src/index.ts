import { fetchOrderBook } from './api/restClient';
import { connectTicker } from './api/wsClient';
import { calculateMid, calculateSpreadPercent, MovingAverage } from './core/calculator';

const SYMBOL = 'BTCUSDT';
const spreadAvg = new MovingAverage(10);

let lastBid = 0;
let lastAsk = 0;

async function updateOrderBook() {
    const { bestBid, bestAsk } = await fetchOrderBook(SYMBOL);
    lastBid = bestBid;
    lastAsk = bestAsk;

    const mid = calculateMid(bestBid, bestAsk);
    const spread = calculateSpreadPercent(bestBid, bestAsk);
    spreadAvg.add(spread);

    console.log(
        `[${new Date().toLocaleTimeString()}] REST mid=${mid.toFixed(
            2,
        )} spread=${spread.toFixed(2)}%`,
    );
}

connectTicker(SYMBOL, lastPrice => {
    if (!lastBid || !lastAsk) return;

    const mid = calculateMid(lastBid, lastAsk);
    const spread = calculateSpreadPercent(lastBid, lastAsk);

    console.log(
        `[${new Date().toLocaleTimeString()}] WS last=${lastPrice.toFixed(
            2,
        )} mid=${mid.toFixed(2)} spread=${spread.toFixed(2)}%`,
    );
});

setInterval(async () => {
    await updateOrderBook();

    console.log(
        `[${new Date().toLocaleTimeString()}] Average spread(1m)=${spreadAvg
            .average()
            .toFixed(2)}%`,
    );
}, 60_000);

updateOrderBook();
