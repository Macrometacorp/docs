---
sidebar_position: 6
title: Table and Window Example
---

This example is to help you understand source, sink, table, and wWindow.

In the application below, a Macrometa document-based collection plays role of `source` to our SW IntrusionDetectionSystem.
Consider InboundTrafficData as an audit collection where client IPs are added as they make requests to the server.
As a new record is added, an event is emitted by collection streams associated with this collection. This event is consumed by the `source` collection InboundTraffic.

It is quite possible that your stream worker, `IntrusionDetectionSystem`, might get burst of events having the same IP, and you need to gauge. Windows store events as and when they arrive and automatically expire/clean them based on the given window constraint.

In our IntrusionDetectionSystem stream worker, we have associated a `sliding window` of two seconds on incoming events. The window will hold all the events that appear within two seconds. The query groups all the events by IP and if the count on any of these groups is more than 50, meaning that more than 50 events occurred from the same IP within two seconds, then we can assume that this is suspicious traffic.

In addition to the window, we have a `Table` which serves reference data for our application. A table is a stored collection of events, and its schema is defined via the table definition. Unlike `stream`, `table` is stateful and supports interactive queries for the state of the stored events. In our case, `SuspiciousIPTable` stores pre-defined suspicious IPs which we are using to verify if it matches IPs in suspicious traffic.

If they match, then we raise an alarm by adding an event to a `sink`. Sink is an abstraction for an egress event, which serves as an output for the stream worker, convert them to various data formats, and publish them to a stream or external endpoints like database, log, JMS, or as in this case, a Macrometa stream.
  
```sql
@App:name("IntrusionDetectionSystem")
@App:description('The stream worker subscribes to collection InboundTraffic and check for suspicious inbound traffic.')
@App:qlVersion('2')

/**
The source stream InboundTraffic is proving ip hits in a server
if the same ip is hitting more than 50 times within 2 seconds, consider it as suspicious traffic
add raise an alarm if same IP matches in our SuspiciousIPTable.

Testing the stream worker:

    1. Create the collection `InboundTrafficData` of type document;
    
    2. Create a Table SuspiciousIPTable with entries for suspicious IPs 
    
    3. Run the stream app;

    4. Check the sink stream `Alarm` . The data should be available here.

*/

-- Event stores
CREATE SOURCE InboundTraffic WITH (type = 'database', collection = "InboundTrafficData", collection.type="doc" , replication.type="global", map.type='json') (ip string);

CREATE TABLE SuspiciousIPTable (blocked_ip string);

CREATE SINK STREAM Alarm (ip string, requestCount long , incidentTime long);

INSERT INTO Alarm
SELECT ip, count(ip) as requestCount, currentTimeMillis() as incidentTime
FROM InboundTraffic WINDOW SLIDING_TIME(2 sec) as IT
JOIN SuspiciousIPTable as SIP
ON  IT.ip == SIP.blocked_ip
WHERE requestCount > 50
GROUP BY ip;
```
