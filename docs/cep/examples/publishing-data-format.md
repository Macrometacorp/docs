---
title: Publishing Data in Different Formats
---

In this example, the stream worker ingests JSON events, groups them by product, and publishes the data in text format.

```sql
@App:name("SalesTotalsApp")
@App:description("Description of the plan")
@App:qlVersion("2")

-- Define the input source, which is JSON data from a Macrometa collection.
CREATE SOURCE ConsumerSalesTotalsStream WITH (
   type='database', 
   collection.name='SalesTotalsEP', 
   map.type='json'
) (
   transNo int, 
   product string, 
   price int, 
   quantity int, 
   salesValue long);

-- Define the output, which is a stream of text format data.
CREATE SINK PublishSalesTotalsStream WITH (
   type='stream', 
   stream.list='Sales Totals', 
   map.type=text
) (
  transNo int, 
  product string, 
  price int, 
  quantity int, 
  salesValue long);

-- Query that takes input data, groups it by product, and inserts it into the output stream.
INSERT INTO PublishSalesTotalsStream
SELECT transNo, product, price, quantity, salesValue
FROM ConsumerSalesTotalsStream
GROUP BY product;
```
