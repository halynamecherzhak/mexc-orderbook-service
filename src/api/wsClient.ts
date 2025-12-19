import WebSocket from 'ws';

const WS_URL = 'wss://wbs.mexc.com/ws';

export function connectTicker(symbol: string, onMessage: (price: number) => void) {
    const ws = new WebSocket(WS_URL);

    ws.on('open', () => {
        console.log(`[${new Date().toISOString()}] Connected to MEXC WebSocket`);
        ws.send(
            JSON.stringify({
                method: 'SUBSCRIPTION',
                params: [`spot@public.deals.v3.api@${symbol}`],
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
