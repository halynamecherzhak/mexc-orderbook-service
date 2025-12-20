import WebSocket from 'ws';

import { MEXC_API_WS_URL, MEXC_WS_DEALS_TOPIC_PREFIX } from '../config/constants';
import { log } from '../utils/logger';

export function connectTicker(symbol: string, onMessage: (price: number) => void) {
    const ws = new WebSocket(MEXC_API_WS_URL);

    ws.on('open', () => {
        log('Connected to MEXC WebSocket');

        ws.send(
            JSON.stringify({
                method: 'SUBSCRIPTION',
                params: [`${MEXC_WS_DEALS_TOPIC_PREFIX}${symbol}`],
                id: 1,
            }),
        );
    });

    ws.on('message', data => {
        log(`RAW WS: ${data.toString()}`);

        const msg = JSON.parse(data.toString());

        if (msg.d?.deals?.length) {
            const lastPrice = Number(msg.d.deals[0].p);
            onMessage(lastPrice);
        }
    });

    ws.on('close', code => {
        log(`WebSocket closed (code=${code})`);
    });

    return ws;
}
