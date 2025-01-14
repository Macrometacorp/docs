---
title: Consuming Messages in Different Formats
sidebar_position: 70
---

This page shows you examples of different ways to map stream worker messages to change how messages are consumed.

## Consuming Messages in Default Format

In this example, the stream worker consumes a message in the default format when it makes no changes to the names of the attributes of the message schema before it processes the message.

```sql
@App:name("SalesTotalsApp")
@App:qlVersion("2")
@App:description("Description of the plan")

-- The source definition mapping specifies the format in which the messages are received.
CREATE SOURCE ConsumerSalesTotalsStream WITH (
   type='http', 
   map.type='json', 
   map.attributes.transNo = '$.transaction', 
   map.attributes.product = 'product', 
   map.attributes.quantity = 'quantity', 
   map.attributes.salesValue = '$.salesValue', 
   map.attributes.price = 'price'
) ( 
   transNo int, 
   product string, 
   price int, 
   quantity int, 
   salesValue long
);

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

## Consuming Messages in Custom Formats

This example is the same as the previous example except for the mapping in the source definition.

```sql
@App:name("SalesTotalsApp")
@App:qlVersion("2")
@App:description("Description of the plan")

-- The source definition mapping specifies the format in which the messages are received.
CREATE SOURCE ConsumerSalesTotalsStream WITH (
    type='http', 
    receiver.url='http://localhost:5005/SalesTotalsEP', 
    map.type='json', 
    attributes.transNo = '$.transaction', 
    attributes.salesValue = '$.sales'
 ) (
     transNo int, 
     product string, 
     price int, 
     quantity int, 
     salesValue long
 );

-- Sink definition for output.
CREATE SINK STREAM SalesTotals (product string, totalSale long);

-- The query sums the sales values for the last minute, groups them by product, and sends them to the sink stream.
INSERT INTO SalesTotals
SELECT product, SUM(salesValue) AS totalSale
FROM ConsumerSalesTotalsStream WINDOW SLIDING_TIME(1 min)
GROUP BY product;
```

In the stream worker used as an example in the previous section, assume that when receiving events, the `transNo` attribute is received as `transaction` and the `salesValue` attribute is received as `sales`.  The mapping type is JSON. therefore, you can add the mappings as JSONPath expressions.

| Stream Attribute Name | JSON Event Attribute Name | JSONPath Expression |
|---------------------------|-------------------------------|-------------------------|
| `transNo`                 | `transaction`                 | `$.transaction`         |
| `salesValue`              | `sales`                       | `$.sales`               |
