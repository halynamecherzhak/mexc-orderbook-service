# BitMart Mid Price & Spread Service

## 📌 Description

A **Node.js** service that connects to the **BitMart** cryptocurrency exchange and:

* fetches the BTC/USDT order book via REST API every 60 seconds
* listens to real-time price updates via WebSocket
* calculates **mid price** and **spread**
* stores the last 10 spread values in memory
* prints the average spread for the last minute
* logs all output to both console and `logs/app.log`


The project is implemented in **TypeScript** with a modular architecture and includes unit tests.

**Node.js version:** v22.11.0  
**TypeScript version:** 5.7.3

---

## 🏦 Selected Exchange

**BitMart** — a global cryptocurrency exchange with high liquidity.

**API Documentation:**
* REST API: https://developer-pro.bitmart.com/en/spot/#get-depth
* WebSocket API: https://developer-pro.bitmart.com/en/spot/#public-websocket

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

### Order Book Depth
The REST request retrieves the top **5 bid and ask levels**.  
Only the **best bid and best ask** are used for mid price and spread calculations, but requesting multiple levels:

* Provides resilience in case the top level is temporarily empty  
* Reflects common practices in trading systems where multiple levels are usually available

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
[2025-12-20T19:49:34.433Z] REST mid=88230.79 spread=0.00%
[2025-12-20T19:49:35.319Z] Connected to BitMart WebSocket
[2025-12-20T19:49:35.616Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:35.930Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:37.323Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:38.801Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:41.048Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:42.619Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:43.917Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:44.540Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:46.086Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:49:47.607Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:49:48.239Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:49.123Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:51.310Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:52.160Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:49:52.900Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:49:54.671Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:49:56.319Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:57.045Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:57.777Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:49:59.530Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:01.169Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:02.757Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:03.384Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:04.619Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:06.446Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:07.991Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:09.520Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:11.156Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:11.668Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:12.627Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:14.083Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:16.073Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:17.160Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:17.837Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:19.142Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:20.887Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:22.419Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:23.674Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:24.263Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:25.390Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:26.822Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:28.272Z] WS last=88230.80 mid=88230.79 spread=0.00%
[2025-12-20T19:50:29.238Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:30.100Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:31.328Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:32.934Z] WS last=88230.79 mid=88230.79 spread=0.00%
[2025-12-20T19:50:34.384Z] REST mid=88230.79 spread=0.00%
[2025-12-20T19:50:34.385Z] Average spread(1m)=0.00%
[2025-12-20T19:50:34.414Z] WS last=88230.80 mid=88230.79 spread=0.00%
```

---

## 👤 Author
**Halyna Mecherzhak**  
Backend / Node.js Developer
