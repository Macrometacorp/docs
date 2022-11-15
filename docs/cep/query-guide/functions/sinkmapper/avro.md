---
title: avro (Sink Mapper)
---

This extension is a Stream App Event to Avro Message output mapper.Transports that publish messages to Avro sink can utilize this extension to convert Stream App events to Avro messages.  You can either specify the Avro schema or provide the schema registry URL and the schema reference ID as parameters in the stream definition. If no Avro schema is specified, a flat Avro schema of the `record` type is generated with the stream attributes as schema fields.

Syntax

    CREATE SINK <NAME> WITH (map.type="avro", map.schema.def="<STRING>", map.schema.registry="<STRING>", map.schema.id="<STRING>")


## Query Parameters

| Name            | Description                                                                                                                                                                                                                     | Default Value | Possible Data Types | Optional | Dynamic |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| schema.def      | This specifies the required Avro schema to be used to convert Stream App events to Avro messages. The schema needs to be specified as a quoted JSON string.                                                                         |               | STRING              | No       | No      |
| schema.registry | This specifies the URL of the schema registry.                                                                                                                                                                                  |               | STRING              | No       | No      |
| schema.id       | This specifies the ID of the avro schema. This ID is the global ID that is returned from the schema registry when posting the schema to the registry. The specified ID is used to retrieve the schema from the schema registry. |               | STRING              | No       | No      |

## Example 1

    CREATE SINK StockStream WITH (type='inMemory', topic='stock', map.type='avro', map.schema.def = """{"type":"record","name":"stock","namespace":"stock.example","fields":[{"name":"symbol","type":"string"},{"name":"price","type":"float"},{"name":"volume","type":"long"}]}""") (symbol string, price float, volume long);

The above configuration performs a default Avro mapping that generates an Avro message as an output ByteBuffer.

## Example 2

    CREATE SINK StockStream WITH (type='inMemory', topic='stock', map.type='avro', map.schema.registry = 'http://localhost:8081', map.schema.id ='22', map.payload=""""{"Symbol":{{symbol}},"Price":{{price}},"Volume":{{volume}}}"""") (symbol string, price float, volume long);

The above configuration performs a custom Avro mapping that generates an Avro message as an output ByteBuffer. The Avro schema is retrieved from the given schema registry (localhost:8081) using the schema ID provided.
