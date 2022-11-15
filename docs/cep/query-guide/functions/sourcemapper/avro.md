---
title: avro (Source Mapper)
---

This extension is an Avro to Event input mapper. Transports that accept
Avro messages can utilize this extension to convert the incoming Avro
messages to Stream App events.  The Avro schema to be used for creating Avro
messages can be specified as a parameter in the stream definition.  If
no Avro schema is specified, a flat avro schema of the `record` type
is generated with the stream attributes as schema fields. The
generated/specified Avro schema is used to convert Avro messages to
Stream App events.

Syntax

    CREATE SOURCE <NAME> WITH (map.type="avro", map.schema.def="<STRING>", map.schema.registry="<STRING>", map.schema.id="<STRING>", map.fail.on.missing.attribute="<BOOL>")

## Query Parameters

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| schema.def                | This specifies the schema of the Avro message. The full schema used to create the Avro message needs to be specified as a quoted JSON string.                                                                                                                                                                                                                                                              |               | STRING              | No       | No      |
| schema.registry           | This specifies the URL of the schema registry.                                                                                                                                                                                                                                                                                                                                                             |               | STRING              | No       | No      |
| schema.id                 | This specifies the ID of the Avro schema. This ID is the global ID that is returned from the schema registry when posting the schema to the registry. The schema is retrieved from the schema registry via the specified ID.                                                                                                                                                                               |               | STRING              | No       | No      |
| fail.on.missing.attribute | If this parameter is set to `true`, a JSON execution failing or returning a null value results in that message being dropped by the system. If this parameter is set to `false`, a JSON execution failing or returning a null value results in the system being prompted to send the event with a null value to Stream App so that the user can handle it as required (i.e., by assigning a default value. | true          | BOOL                | Yes      | No      |

## Example 1

    CREATE SOURCE UserStream WITH (type='inMemory', topic='user', map.type='avro', map.schema.def = """{"type":"record","name":"userInfo","namespace":"user.example","fields":[{"name":"name","type":"string"}, {"name":"age","type":"int"}]}""") (name string, age int );

The above Stream App query performs a default Avro input mapping. The input
Avro message that contains user information is converted to a Stream App
event. The expected input is a byte array or ByteBuffer.

## Example 2

    CREATE SOURCE userStream WITH (type='inMemory', topic='user', map.type='avro', map.schema.def = """{"type":"record","name":"userInfo","namespace":"avro.userInfo","fields":[{"name":"username","type":"string"}, {"name":"age","type":"int"}]}""", map.attributes="name="username",age="age"") (name string, age int );

The above Stream App query performs a custom Avro input mapping. The input
Avro message that contains user information is converted to a Stream App
event.  The expected input is a byte array or ByteBuffer.

## Example 3

    CREATE SOURCE UserStream WITH (type='inMemory', topic='user', map.type='avro',schema.registry='http://192.168.2.5:9090', schema.id='1', map.attributes="name='username', age='age'") (name string, age int );

The above Stream App query performs a custom Avro input mapping. The input
Avro message that contains user information is converted to a Stream App
event via the schema retrieved from the given schema
registry(localhost:8081). The expected input is a byte array or
ByteBuffer.
