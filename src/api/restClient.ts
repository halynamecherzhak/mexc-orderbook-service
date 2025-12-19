import axios from 'axios';

const BASE_URL = 'https://api.mexc.com';

export async function fetchOrderBook(symbol = 'BTCUSDT') {
    const res = await axios.get(`${BASE_URL}/api/v3/depth`, {
        params: { symbol, limit: 5 },
    });

    const bestBid = parseFloat(res.data.bids[0][0]);
    const bestAsk = parseFloat(res.data.asks[0][0]);

    return { bestBid, bestAsk };
}
