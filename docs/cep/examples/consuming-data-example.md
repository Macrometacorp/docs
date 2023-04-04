---
title: Consuming Data Example
sidebar_position: 60
---

This stream worker consumes all data from `ConsumerSalesTotalsStream` and then sends it to `PublishSalesTotalsStream`. The stream worker includes an optional sink and query, currently commented out, for testing.

```sql
@App:name("SalesTotalsApp")
@App:qlVersion("2")
@App:description("Description of the plan")

CREATE SOURCE ConsumerSalesTotalsStream WITH (type='stream', stream.list='SalesTotalsEP', map.type='json', stream.type='local') (transNo int, product string, price int, quantity int, salesValue long);

CREATE SOURCE PublishSalesTotalsStream WITH (type='stream', stream.list='SalesTotals', map.type='json', replication.type='local') (transNo int, product string, price int, quantity int, salesValue long);

-- Define stream to consume data (Optional, used for testing)
-- CREATE SINK STREAM ConsumerSales (transNo int, product string, price int, quantity int, salesValue long);

-- Transfers data between sources
INSERT INTO PublishSalesTotalsStream
SELECT *
FROM ConsumerSalesTotalsStream;

-- Sends data to stream (Optional, used for testing)
-- INSERT INTO ConsumerSales
-- SELECT *
-- FROM PublishSalesTotalsStream;
```
