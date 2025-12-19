# MEXC Mid Price & Spread Service

## 📌 Description

A **Node.js** service that connects to the **MEXC** cryptocurrency exchange and:

* fetches the BTC/USDT order book via REST API every 60 seconds
* listens to real-time price updates via WebSocket
* calculates **mid price** and **spread**
* stores the last 10 spread values in memory
* prints the average spread for the last minute

The project is implemented in **TypeScript** with a modular architecture and includes unit tests.

---

## 🏦 Selected Exchange

**MEXC** — a global cryptocurrency exchange with high liquidity.

**API Documentation:**
* REST API: https://mexcdevelop.github.io/apidocs/spot_v3_en/
* WebSocket API: https://mexcdevelop.github.io/apidocs/spot_v3_en/#websocket-market-streams

**Trading Pair:** BTC/USDT

---

## 🧮 Calculation Formulas

### Mid Price
```
mid = (bestBid + bestAsk) / 2
```

Example: if `bestBid = 65400` and `bestAsk = 65410`, then `mid = 65405`

### Spread Percent
```
spreadPercent = ((bestAsk - bestBid) / mid) * 100
```

Example: if `bestBid = 65400` and `bestAsk = 65410`, then:
- `spread = (10 / 65405) * 100 ≈ 0.0153%`

Where:
* `bestBid` — highest bid price from buyers
* `bestAsk` — lowest ask price from sellers

### Moving Average
The last 10 spread values are averaged to identify trends.

Note: Order book depth is limited to 5 levels since only the best bid and ask
are required for mid price and spread calculations.

---

## ▶️ How to Run

### Install dependencies
```bash
npm install
```

### Start the service
```bash
npm run start
```

### Run tests
```bash
npm test
```

### Build for production
```bash
npm run build
npm run start:prod
```

---

## 📤 Example Console Output

```
[10:45:01 PM] Connected to MEXC WebSocket
[10:45:01 PM] REST mid=88046.93 spread=0.00%
RAW WS: {"id":1,"code":0,"msg":"Not Subscribed successfully! [spot@public.deals.v3.api@BTCUSDT].  Reason： Blocked! "}
[10:45:06 PM] REST mid=88057.89 spread=0.00%
[10:45:06 PM] Average spread(1m)=0.00%
[10:45:11 PM] REST mid=88063.75 spread=0.01%
[10:45:11 PM] Average spread(1m)=0.01%
[10:45:16 PM] REST mid=88083.38 spread=0.00%
[10:45:16 PM] Average spread(1m)=0.00%
[10:45:21 PM] REST mid=88083.30 spread=0.00%
[10:45:21 PM] Average spread(1m)=0.00%
```

### WebSocket note

MEXC WebSocket connection is established successfully.
However, depending on the IP/region, the public deals topic may be blocked by MEXC.
The implementation follows official documentation and works when access is allowed.

---

## 👤 Author
**Halyna Mecherzhak**  
Backend / Node.js Developer
