---
sidebar_position: 9
title: Realtime Log Analytics
---

This demo shows how to integrate real-time log analytics with Macrometa GDN to monitor the status and activity of stream workers and query workers.

## Setup

| **Federation**                                        | **Email**                              | **Passsword** | **GUI**|
| ----------------------------------------------------- | -------------------------------------- | ------------- |--------------|
| [GDN](https://play.paas.macrometa.io/) | demo-realtime-logs@macrometa.io | `xxxxxxxx`    | [Dashboard](https://macrometacorp.github.io/demo-jsc8-realtime-logs) |

## Solution

1. Create and publish the following stream workers in your GDN account:

```
log-generator
http-request-worker
http-request-stats-1m-worker
```

2. Create the following query workers in your GDN account:

```
GetTopUrl
GetStatusCodeRatio
GetStatsByCollection
GetTopErrorByUrlPath
GetUniqueVisitorsByCountry
```

**Query Workers**


3. Create the following collections in your GDN account:

```js
users (global)
logs (global)
http_url_stats_1m (global)
http_response_code_stats_1m (global)
http_response_latency_stats_1m (global)
http_error_response_code_stats_1m (global)
unique_visitor_by_country_stats_1m (global)
```

4. On the development machine, run the following commands in a console:

```
git clone git@github.com:Macrometacorp/demo-jsc8-realtime-logs.git
cd demo-jsc8-realtime-logs/react-app
npm install
npm run start
```

**Sample Log Format:**

```json
{
  "timestamp": "2021-09-02T14:44:31+0000",
  "request_method": "POST",
  "response_status": 400,
  "url": "/collections/query",
  "response_body_size": 134,
  "time_elapsed": 16,
  "geo_country": "india",
  "client_ip": "172.105.56.148"
}
```

**GitHub** - https://github.com/Macrometacorp/demo-jsc8-realtime-logs
