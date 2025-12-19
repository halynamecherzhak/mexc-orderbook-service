import axios from 'axios';

import { MEXC_API_BASE_URL, ORDERBOOK_LIMIT, TRADING_PAIR } from '../config/constants';

export async function fetchOrderBook(
    symbol = TRADING_PAIR,
): Promise<{ bestBid: number; bestAsk: number }> {
    try {
        const res = await axios.get(`${MEXC_API_BASE_URL}/api/v3/depth`, {
            params: { symbol, limit: ORDERBOOK_LIMIT },
        });

        const bids = res.data?.bids;
        const asks = res.data?.asks;

        if (
            !Array.isArray(bids) ||
            bids.length === 0 ||
            !Array.isArray(asks) ||
            asks.length === 0
        ) {
            throw new Error('[fetchOrderBook] Invalid order book response: missing bids or asks');
        }

        const bestBid = parseFloat(bids[0][0]);
        const bestAsk = parseFloat(asks[0][0]);

        if (Number.isNaN(bestBid) || Number.isNaN(bestAsk)) {
            throw new Error('[fetchOrderBook] Invalid order book prices');
        }

        return { bestBid, bestAsk };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        throw new Error(
            `[fetchOrderBook] Failed to fetch order book for symbol=${symbol}: ${message}`,
        );
    }
}
