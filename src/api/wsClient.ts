import WebSocket from 'ws';

import { MEXC_API_WS_URL, MEXC_WS_DEALS_TOPIC_PREFIX } from '../config/constants';

export function connectTicker(symbol: string, onMessage: (price: number) => void) {
    const ws = new WebSocket(MEXC_API_WS_URL);

    ws.on('open', () => {
        console.log(`[${new Date().toISOString()}] Connected to MEXC WebSocket`);
        ws.send(
            JSON.stringify({
                method: 'SUBSCRIPTION',
                params: [`${MEXC_WS_DEALS_TOPIC_PREFIX}${symbol}`],
            }),
        );
    });

    ws.on('message', data => {
        const msg = JSON.parse(data.toString());
        
        if (msg.d?.deals?.length) {
            const lastPrice = Number(msg.d.deals[0].p);
            onMessage(lastPrice);
        }
    });

    return ws;
}
