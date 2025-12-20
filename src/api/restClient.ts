import axios from 'axios';

import { BITMART_API_REST_URL, ORDERBOOK_DEPTH } from '../config/constants';

export async function fetchOrderBook(symbol: string) {
    const res = await axios.get(`${BITMART_API_REST_URL}/spot/v1/symbols/book`, {
        params: {
            symbol,
            size: ORDERBOOK_DEPTH,
        },
    });

    const book = res.data?.data;

    if (
        !book ||
        !Array.isArray(book.buys) ||
        !Array.isArray(book.sells) ||
        book.buys.length === 0 ||
        book.sells.length === 0
    ) {
        throw new Error('Empty order book');
    }

    const bestBid = Number(book.buys[0].price);
    const bestAsk = Number(book.sells[0].price);

    if (Number.isNaN(bestBid) || Number.isNaN(bestAsk)) {
        throw new Error('Failed to parse best bid/ask');
    }

    return { bestBid, bestAsk };
}
