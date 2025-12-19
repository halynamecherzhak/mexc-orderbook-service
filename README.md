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
[14:32:00] REST mid=65432.50 spread=0.12%
[14:32:05] WS last=65431.10 mid=65432.20 spread=0.11%
[14:32:10] WS last=65433.00 mid=65433.55 spread=0.09%
[14:32:15] Average spread(1m)=0.10%
[14:33:15] REST mid=65434.20 spread=0.13%
[14:33:20] WS last=65432.80 mid=65433.50 spread=0.12%
[14:33:25] Average spread(1m)=0.11%
```

---

## 👤 Author
**Halyna Mecherzhak**  
Backend / Node.js Developer
