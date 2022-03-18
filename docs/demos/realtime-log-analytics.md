---
sidebar_position: 3
---

# Realtime Log Analytics

Realtime Log Analytics integrating logs from Fastly with Macrometa GDN to monitor the status and activity of Stream workers and Query workers. Fastly provides data about HTTP latency, response count, response size, and unique visitor traffic.


## Setup

| **Federation**                                        | **Email**                              | **Passsword** | **Dashboard**|
| ----------------------------------------------------- | -------------------------------------- | ------------- |--------------|
| [Global Data Network](https://gdn.paas.macrometa.io/) | demo-fastly-realtime-logs@macrometa.io | `xxxxxxxx`    | [Dashboard](https://macrometacorp.github.io/demo-fastly-jsc8-realtime-logs) |
| [Fastly Account](https://manage.fastly.com)           | demo@macrometa.com                     | --            | -- |



## Solution


1. Create and publish the following Stream Workers in your GDN account:

```
fastly-log-generator
fastly-http-request-worker
fastly-http-request-stats-1m-worker
```


2. Create the following Query workers in your GDN account:

```
fastlyGetTopUrl
fastlyGetStatusCodeRatio
fastlyGetStatsByCollection
fastlyGetTopErrorByUrlPath
fastlyGetUniqueVisitorsByCountry
```

**Query Workers**


3. Create the following collections in your GDN account:

```
fastly_users (global)
fastly_logs (global)
fastly_http_url_stats_1m (global)
fastly_http_response_code_stats_1m (global)
fastly_http_response_latency_stats_1m (global)
fastly_http_error_response_code_stats_1m (global)
fasty_unique_visitor_by_country_stats_1m (global)
```

4. On the development machine, run the following commands in a console:

```
1. git clone git@github.com:Macrometacorp/demo-fastly-jsc8-realtime-logs.git
2. cd fastly-edgeworker-log-analytics
3. git fetch
4. npm install
5. npm run start
```

**Sample Log Format:**

```
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

**GitHub** - https://github.com/Macrometacorp/demo-fastly-jsc8-realtime-logs
