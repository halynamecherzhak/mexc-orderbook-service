import WebSocket from 'ws';

import { BITMART_API_WS_URL } from '../config/constants';
import { log } from '../utils/logger';

export function connectTicker(symbol: string, onMessage: (price: number) => void) {
    const ws = new WebSocket(BITMART_API_WS_URL);

    ws.on('open', () => {
        log('Connected to BitMart WebSocket');

        ws.send(
            JSON.stringify({
                op: 'subscribe',
                args: [`spot/ticker:${symbol}`],
            }),
        );
    });

    ws.on('message', data => {
        try {
            const msg = JSON.parse(data.toString());

            if (msg.data?.length) {
                const lastPrice = Number(msg.data[0].last_price);
                onMessage(lastPrice);
            }
        } catch (err) {
            log(`WS message parse error: ${(err as Error).message}`);
        }
    });

    ws.on('error', err => {
        log(`WebSocket error: ${(err as Error).message}`);
    });

    ws.on('close', code => {
        log(`WebSocket closed (code=${code})`);
    });

    return ws;
}
