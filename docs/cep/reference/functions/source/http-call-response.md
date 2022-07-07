---
title: http-call-response (Source)
---

The http-call-response source receives the responses for the calls made
by its corresponding http-call sink, and maps them from formats such as
`text`, `XML` and `JSON`. To handle messages with different http status
codes having different formats, multiple http-call-response sources are
allowed to associate with a single http-call sink. It allows accessing
the attributes of the event that initiated the call, and the response
headers and properties via transport properties in the format
`trp:<attribute name>` and `trp:<header/property>` respectively.

Syntax

    CREATE SOURCE <NAME> WITH (type="http-call-response", map.type="<STRING>", sink.id="<STRING>", http.status.code="<STRING>", allow.streaming.responses="<BOOL>")


## Query Parameters

| Name                      | Description                                                                                                                                                                               | Default Value | Possible Data Types | Optional | Dynamic |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------|----------|---------|
| sink.id                   | Identifier to correlate the http-call-response source with its corresponding http-call sink that published the messages.                                                                  |               | STRING              | No       | No      |
| http.status.code          | The matching http responses status code regex, that is used to filter the the messages which will be processed by the source.Eg: `http.status.code = '200'`, `http.status.code = '4\\d+'` | 200           | STRING              | Yes      | No      |
| allow.streaming.responses | Enable consuming responses on a streaming manner.                                                                                                                                         | false         | BOOL                | Yes      | No      |

## Example 1

    CREATE SINK EmployeeRequestStream WITH (type='http-call', method='POST', publisher.url='http://localhost:8005/registry/employee', sink.id='employee-info', map.type='json') (name string, id int);

    CREATE SOURCE EmployeeResponseStream WITH (type='http-call-response', sink.id='employee-info', http.status.code='2\\d+', map.type='json', map.attributes="name='trp:name', id='trp:id', location='$.town', age='$.age'") (name string, id int, location string, age int);

    CREATE SOURCE EmployeeErrorStream WITH (type='http-call-response', sink.id='employee-info', http.status.code='4\\d+', map.type='text', map.regex.A='((.|\n)*)', map.attributes="error='A[1]'") (error string);

When events arrive in `EmployeeRequestStream`, http-call sink makes
calls to endpoint on url `http://localhost:8005/registry/employee` with
`POST` method and Content-Type `application/json`. If the arriving event
has attributes `name`:`John` and `id`:`1423` it will send a message with
default JSON mapping as follows:

    {
      "event": {
        "name": "John",
        "id": 1423
      }
    }

When the endpoint responds with status code in the range of 200 the
message will be received by the http-call-response source associated
with the `EmployeeResponseStream` stream, because it is correlated with
the sink by the same `sink.id` `employee-info` and as that expects
messages with `http.status.code` in regex format `2\\d+`. If the
response message is in the format

    {
      "town": "NY",
      "age": 24
    }

the source maps the `location` and `age` attributes by executing JSON
path on the message and maps the `name` and `id` attributes by
extracting them from the request event via as transport properties. If
the response status code is in the range of 400 then the message will be
received by the http-call-response source associated with the
`EmployeeErrorStream` stream, because it is correlated with the sink by
the same `sink.id` `employee-info` and it expects messages with
`http.status.code` in regex format `4\\d+`, and maps the error response
to the `error` attribute of the event.
