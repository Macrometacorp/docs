---
title: Consuming Messages in Default Format
---

In this example, the stream worker consumes a message in the default format when it makes no changes to the names of the attributes of the message schema before it processes the message.

```sql
@App:name("SalesTotalsApp")
@App:qlVersion("2")
@App:description("Description of the plan")

-- The source definition mapping specifies the format in which the messages are received.
CREATE SOURCE ConsumerSalesTotalsStream WITH (type='http', map.type='json', map.attributes.transNo = '$.transaction', map.attributes.product = 'product', map.attributes.quantity = 'quantity', map.attributes.salesValue = '$.salesValue', map.attributes.price = 'price') (transNo int, product string, price int, quantity int, salesValue long);

-- Sink definition for output.
CREATE SINK STREAM SalesTotals (product string, totalSale long);

-- The query sums the sales values for the last minute, groups them by product, and sends them to the sink stream.
INSERT INTO SalesTotals
SELECT product, SUM(salesValue) AS totalSale
FROM ConsumerSalesTotalsStream WINDOW SLIDING_TIME(1 min)
GROUP BY product;
```

To check whether the above stream worker works as expected, publish some messages. For example, a stream using JSON can produce output such as:

```json
{
    "transNo": 1,
    "product": "DDT",
    "price": 100,
    "quantity": 100,
    "salesValue": 10000
}
```
